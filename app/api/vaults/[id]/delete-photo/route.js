import connectMongoDB from "@/app/_lib/mongoDB";
import supabase from "@/app/_lib/supabase";
import Vault from "@/app/_models/vaultModel";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/");
    const vaultId = pathParts[3];

    const { photoName } = await request.json();

    if (!photoName) {
      return NextResponse.json(
        { status: "error", message: "photoName is required" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Delete photo from Supabase
    const { error: supabaseError } = await supabase.storage
      .from("vault-photos") // 👈 use your actual bucket name here
      .remove([photoName]);

    if (supabaseError) {
      return NextResponse.json(
        {
          status: "error",
          message: "Failed to delete photo from Supabase",
          error: supabaseError.message,
        },
        { status: 500 }
      );
    }

    // Remove photo object from the vault's photos array
    const updatedVault = await Vault.findByIdAndUpdate(
      vaultId,
      { $pull: { photos: { photoLink: { $regex: photoName } } } },
      { new: true }
    );

    if (!updatedVault) {
      return NextResponse.json(
        { status: "error", message: "Vault not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { status: "success", message: "Photo deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        status: "error",
        message: "Internal Server Error",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
