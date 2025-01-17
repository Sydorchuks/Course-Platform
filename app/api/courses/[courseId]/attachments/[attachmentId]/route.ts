import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function DELETE(
    req:Request,
    {params} : {params:{courseId:string, attachmentId: string}}
) {
    try{
        const attachment = await db.attachment.delete({
            where:{
                courseId: params.courseId,
                id: params.attachmentId,
            }
        })

        return NextResponse.json(attachment)

    }catch(error){
        console.log("ATTACHMENT_ID", error)
        return new NextResponse("Internal Error", {status:500})
    }
}