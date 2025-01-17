import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    // Find the course
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
      },
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    // Validate required fields
    if (
      !course.title ||
      !course.description ||
      !course.imageUrl ||
      !course.categoryId
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Update the chapter associated with the course
    const publishedCourse = await db.course.update({
      where: {
       id: params.courseId, // Assuming chapters are linked to courses by `courseId`
      },
      data: {
        isPublished: true,
      },
    });

    if (!publishedCourse) {
      return new NextResponse("Chapter not found", { status: 404 });
    }

    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.error("[PUBLISH_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}