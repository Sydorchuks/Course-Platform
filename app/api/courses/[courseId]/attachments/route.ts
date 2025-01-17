import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, context: { params: { courseId: string } }) {
    try {
        // Await the `params` destructure
        const { params } = context;

        const { url } = await req.json();

        // Perform any authorization checks here

        const attachment = await db.attachment.create({
            data: {
                url,
                name: url.split("/").pop()!,
                courseId: params.courseId,
            },
        });

        return NextResponse.json(attachment);
    } catch (error) {
        console.error("COURSE_ID_ATTACHMENTS", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
