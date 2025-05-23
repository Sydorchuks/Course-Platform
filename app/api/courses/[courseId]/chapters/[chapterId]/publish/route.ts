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

        const publishedChapter = await db.chapter.update({
            where:{
                id:params.chapterId,
                courseId: params.courseId,
            },
            data:{
                isPublished:true,
            }
        })

        return NextResponse.json(publishedChapter)
    }catch(error){
        console.log("[CHAPTER_PUBLISH]", error);
        return new NextResponse("Internal Error", {status:500})
    }
}