import { NextResponse } from "next/server";
import connectMongoDB from "@/app/_lib/mongoDB";
import APIFeatures from "@/app/_utils/apiFeatures";
import Vault from "@/app/_models/vaultModel";

export async function GET(request) {
  try {
    await connectMongoDB();

    const url = new URL(request.url);
    const query = Object.fromEntries(url.searchParams.entries());

    const features = new APIFeatures(
      Vault.find()
        .populate("photos")
        .populate("audios")
        .populate("videos")
        .populate("notes")
        .populate("author", "name email photo userName verified")
        .select(
          "title description theme vaultType category photos audios videos notes author"
        ),
      query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const rawVaults = await features.query;

    const vaults = rawVaults.map((vault) => ({
      id: vault._id.toString(),
      title: vault.title,
      description: vault.description,
      theme: vault.theme,
      vaultType: vault.vaultType,
      category: vault.category,
      author: vault.author,
      numberOfPhotos: vault.photos?.length || 0,
      numberOfAudios: vault.audios?.length || 0,
      numberOfVideos: vault.videos?.length || 0,
      numberOfNotes: vault.notes?.length || 0,
    }));

    return NextResponse.json(
      {
        status: "success",
        message: "Vaults fetched successfully",
        results: vaults.length,
        data: vaults,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching vaults:", err);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch vaults",
        error: err.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectMongoDB();
    const body = await request.json();
    const { title, description, theme, password, category, author } = body;

    if (!author) {
      return NextResponse.json(
        {
          status: "error",
          message: "Author ID is required",
        },
        { status: 400 }
      );
    }

    const existingVaultCount = await Vault.countDocuments({ author });
    if (existingVaultCount >= 2) {
      return NextResponse.json(
        {
          status: "error",
          message: "Vault limit reached. Only 2 vaults allowed per user.",
        },
        { status: 400 }
      );
    }

    const newVault = await Vault.create({
      title,
      description,
      theme,
      password,
      category,
      author,
    });

    return NextResponse.json(
      {
        status: "success",
        message: "Vault created successfully",
        data: newVault,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating vault:", err);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to create vault",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
