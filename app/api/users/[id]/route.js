import connectMongoDB from "@/app/_lib/mongoDB";
import User from "@/app/_models/userModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const userId = request.url.split("users/")[1];

    await connectMongoDB();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        {
          status: "error",
          message: `User not found with ID: ${userId}`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "User fetched successfully",
        data: user,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error while fetching user",
        error: err.message,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const userId = request.url.split("users/")[1];
    const updateData = await request.json();

    await connectMongoDB();
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return NextResponse.json(
        {
          status: "error",
          message: `User not found with ID: ${userId}`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "User updated successfully",
        data: updatedUser,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating user:", err);
    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error while updating user",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
