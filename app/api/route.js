import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      status: "success",
      message: "Welcome to the ChronoTree REST API",
    },
    { status: 200 }
  );
}

export async function POST(request) {
  return NextResponse.json(
    {
      status: "error",
      message:
        "POST method is not allowed on this endpoint. Please use the appropriate route.",
    },
    { status: 405 }
  );
}
