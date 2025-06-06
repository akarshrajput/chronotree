import connectMongoDB from "@/app/_lib/mongoDB";
import User from "@/app/_models/userModel";
import APIFeatures from "@/app/_utils/apiFeatures";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectMongoDB();
    const url = new URL(request.url);
    const query = Object.fromEntries(url.searchParams.entries());

    const features = new APIFeatures(User.find(), query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const users = await features.query;

    return NextResponse.json(
      {
        status: "success",
        message: "Users retrieved successfully",
        results: users.length,
        data: users,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch users",
        error: error?.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
