import { NextResponse } from "next/server";
import connectMongoDB from "../../../../_lib/mongoDB";
import Vault from "../../../../_models/vaultModel";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/");
    const id = pathParts[3]; // /api/vault/{id}/unlock

    if (!id) {
      return NextResponse.json(
        {
          status: "error",
          message: "Vault ID not provided in the URL",
        },
        { status: 400 }
      );
    }

    const { password } = await request.json();
    await connectMongoDB();

    const vault = await Vault.findById(id).select("+password");

    if (!vault) {
      return NextResponse.json(
        {
          status: "error",
          message: `Vault not found with ID ${id}`,
        },
        { status: 404 }
      );
    }

    const now = new Date();

    // Check lock status
    if (vault.lockUntil && vault.lockUntil > now) {
      return NextResponse.json(
        {
          status: "error",
          message: `Too many failed attempts. Try again after ${vault.lockUntil.toLocaleTimeString()}`,
        },
        { status: 403 }
      );
    }

    const isMatch = await bcrypt.compare(password, vault.password);

    if (!isMatch) {
      vault.failedAttempts = (vault.failedAttempts || 0) + 1;

      if (vault.failedAttempts >= 3) {
        vault.lockUntil = new Date(now.getTime() + 60 * 60 * 1000); // lock for 1 hour
      }

      await vault.save();

      return NextResponse.json(
        {
          status: "error",
          message: "Invalid password",
        },
        { status: 401 }
      );
    }

    // Password correct: reset attempts
    vault.failedAttempts = 0;
    vault.lockUntil = null;
    vault.lastAccessedAt = now;
    vault.accessCount = (vault.accessCount || 0) + 1;

    await vault.save();

    const vaultData = vault.toObject();
    delete vaultData.password;
    delete vaultData.__v;

    return NextResponse.json(
      {
        status: "success",
        message: "Vault unlocked successfully",
        data: vaultData,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        status: "error",
        message: err.message || "Server Error",
      },
      { status: 500 }
    );
  }
}
