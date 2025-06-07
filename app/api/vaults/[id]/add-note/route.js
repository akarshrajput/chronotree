import { NextResponse } from "next/server";
import connectMongoDB from "../../../../_lib/mongoDB";
import Vault from "../../../../_models/vaultModel";

export async function POST(request) {
  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/");
    const vaultId = pathParts[3];
    const { title, content } = await request.json();

    if (!vaultId) {
      return NextResponse.json(
        { status: "error", message: "Vault ID is required in URL" },
        { status: 400 }
      );
    }

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { status: "error", message: "Note must have a valid 'title'" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const vault = await Vault.findById(vaultId);

    if (!vault) {
      return NextResponse.json(
        { status: "error", message: "Vault not found" },
        { status: 404 }
      );
    }

    if (vault.notes.length >= 100) {
      return NextResponse.json(
        { status: "error", message: "Note limit reached (Max 100 allowed)" },
        { status: 400 }
      );
    }

    vault.notes.push({ title, content });
    await vault.save();

    return NextResponse.json(
      {
        status: "success",
        message: "Note added successfully",
        notes: vault.notes,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: err.message || "Server Error" },
      { status: 500 }
    );
  }
}
