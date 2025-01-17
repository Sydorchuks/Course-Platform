import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
    {params}:{params:{courseId:string; chapterId:string}}
){
    try{

        const chapter = await db.chapter.findUnique({
            where:{
                id:params.chapterId,
                courseId: params.courseId
            }
        });

        if(!chapter || !chapter.title || !chapter.description || !chapter.videoUrl){
            return new NextResponse("Missing required fields", {status:400})
        }

        const unpublishedChapter = await db.chapter.update({
            where:{
                id:params.chapterId,
                courseId: params.courseId,
            },
            data:{
                isPublished:false,
            }
        })

        const publishedChaptersInCourse = await db.chapter.findMany({
            where: {
                courseId: params.courseId,
                isPublished: true
            }
        });

        if(!publishedChaptersInCourse.length){
            await db.course.update({
                where:{
                   id:params.courseId, 
                },
                data:{
                    isPublished:false
                }
            })
        }

        return NextResponse.json(unpublishedChapter)
    }catch(error){
        console.log("[CHAPTER_UNPUBLISH]", error);
        return new NextResponse("Internal Error", {status:500})
    }
}