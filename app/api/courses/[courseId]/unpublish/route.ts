import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string } }
  ) {
    try {
        const course = await db.course.findUnique({
            where:{
              id:params.courseId,
            },
          })
      
          if(!course){
            return new NextResponse("Not found", {status:404})
          }
          
        if(!course || !course.title || !course.description || !course.imageUrl || !course.categoryId){
            return new NextResponse("Missing required fields", {status:400})
        }

        const unpublishedCourse = await db.course.update({
            where:{
                id:params.courseId,
            },
            data:{
                isPublished:false,
            }
        })

        return NextResponse.json(unpublishedCourse)
    } catch (error) {
      console.error("[UNPUBLISH_ERROR]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }