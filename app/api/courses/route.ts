import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json();

    const course = await db.course.create({
      data: {
        title,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || '';
  const categoryId = searchParams.get('categoryId');

  const courses = await db.course.findMany({
    where: {
      title: { contains: title, mode: 'insensitive' },
      categoryId: categoryId || undefined,
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(courses);
}