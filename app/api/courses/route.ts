import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Retrieve the authenticated user's data
    const { userId } = getAuth(req);

    // Parse the request body
    const { title } = await req.json();

    // Ensure the user is authenticated
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized User" }, { status: 401 });
    }

    // Create a new course record in the database
    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });

    // Respond with the created course data
    return NextResponse.json(course);
  } catch (error) {
    console.error("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}