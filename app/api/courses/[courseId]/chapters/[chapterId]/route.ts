/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    context: { params: { courseId: string; chapterId: string } }
) {
    try {
        const { courseId, chapterId } = context.params;

        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId,
                courseId: courseId,
            },
        });
        if (!chapter) {
            return new NextResponse("Not Found", { status: 404 });
        }

        const deletedChapter = await db.chapter.delete({
            where: {
                id: chapterId,
            },
        });

        const publishedChaptersInCourse = await db.chapter.findMany({
            where: {
                courseId: courseId,
                isPublished: true,
            },
        });

        if (!publishedChaptersInCourse.length) {
            await db.course.update({
                where: {
                    id: courseId,
                },
                data: {
                    isPublished: false,
                },
            });
        }

        return NextResponse.json(deletedChapter);
    } catch (error) {
        console.error("[CHAPTER_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    context: { params: { courseId: string; chapterId: string } }
  ) {
    try {
      const { description, videoUrl, title, isFree } = await req.json(); // Extract fields from request body
      const { courseId, chapterId } = context.params;
  
      // Validate input
      if (
        typeof description !== "string" &&
        typeof videoUrl !== "string" &&
        typeof title !== "string" &&
        typeof isFree !== "boolean"
      ) {
        return new NextResponse("Missing or invalid data to update", {
          status: 400,
        });
      }
  
      // Update chapter
      const chapter = await db.chapter.update({
        where: {
          id: chapterId,
          courseId, // Ensure the chapter belongs to the correct course
        },
        data: {
          ...(description && { description }),
          ...(videoUrl && { videoUrl }),
          ...(title && { title: title.trim() }),
          ...(typeof isFree === "boolean" && { isFree }), // Update `isFree` only if a valid boolean
        },
      });
  
      return NextResponse.json(chapter);
    } catch (error) {
      console.error("[CHAPTER_PATCH_ERROR]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }