/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    // Await the params object before destructuring
    const { courseId } = await Promise.resolve(params); // Safely resolve params
    
    const values = await req.json();

    const course = await db.course.update({
      where: {
        id: courseId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("[COURSE_ID_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

/**----------------------------------------------------------------------- */

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
){
  try{
    const course = await db.course.findUnique({
      where:{
        id:params.courseId,
      }
    })

    if(!course){
      return new NextResponse("Not found", {status:404})
    }

    const deletedCourse = await db.course.delete({
      where:{
        id:params.courseId
      }
    })

    return NextResponse.json(deletedCourse)
  }catch(error){
    console.error("[COURSE_ID_DELETION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
