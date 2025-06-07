import { NextResponse } from "next/server";
import connectMongoDB from "../../../../_lib/mongoDB";
import Vault from "../../../../_models/vaultModel";

export async function POST(request) {
  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/");
    const vaultId = pathParts[3];
    const { title, photoLink } = await request.json();

    if (!vaultId) {
      return NextResponse.json(
        { status: "error", message: "Vault ID is required in URL" },
        { status: 400 }
      );
    }

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { status: "error", message: "Photo must have a valid 'title'" },
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

    if (vault.photos.length >= 10) {
      return NextResponse.json(
        { status: "error", message: "Photo limit reached (Max 10 allowed)" },
        { status: 400 }
      );
    }

    vault.photos.push({ title, photoLink });
    await vault.save();

    return NextResponse.json(
      {
        status: "success",
        message: "Photo added successfully",
        photos: vault.photos,
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
