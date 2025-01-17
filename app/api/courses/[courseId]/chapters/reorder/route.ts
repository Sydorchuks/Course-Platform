/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const { list } = await req.json();

        if (!Array.isArray(list)) {
            console.error("Invalid list format:", list);
            return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
        }

        const updates = list.map((item) => {
            if (!item.id || item.position == null) {
                console.error("Invalid item in list:", item);
                throw new Error("Invalid item format");
            }

            return db.chapter.update({
                where: { id: item.id },
                data: { position: item.position },
            });
        });

        await Promise.all(updates);

        return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (error) {
        console.error("[REORDER ERROR]", { error, params });
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
