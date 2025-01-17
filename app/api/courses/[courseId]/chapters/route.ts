import { db } from "@/lib/db";
import { NextResponse } from "next/server"

export async function POST(
    req: Request, context: { params: { courseId: string } }
){
    try{
        const { params } = context;
        const {title} = await req.json()

        const lastChapter = await db.chapter.findFirst({
            where:{
                courseId: params.courseId,
            },
            orderBy:{
                position:"desc"
            }
        })

        const newPosition = lastChapter ? lastChapter.position + 1 : 1;

        const chapter = await db.chapter.create({
            data:{
                title, 
                courseId: params.courseId,
                position: newPosition,
            }
        })
        return NextResponse.json(chapter)
    }catch(error){
        console.log("[CHAPTERS]", error)
        return new NextResponse("Internal Error", {status:500})
    }
}