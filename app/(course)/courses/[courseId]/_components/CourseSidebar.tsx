"use client"
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/getServerUser';
import { Chapter, Course, UserProgress } from '@prisma/client'
import { redirect } from 'next/navigation';
import React from 'react'
import CourseSidebarItem from './CourseSidebarItem';

interface CourseSidebarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null
        })[]
    };
    progressCount: number
}

export const CourseSidebar = async ({course, progressCount}: CourseSidebarProps) => {

    const user = await getCurrentUser();
    const userId = user?.id;
  
    if(!userId){
      redirect("/")
    }


    const purchase = await db.purchase.findUnique({
        where:{
            userId_courseId:{
                userId, 
                courseId: course.id
            }
        }
    })
 
    return (
    <div className='h-full border-r flex flex-col overflow-y-auto shadow-sm'>
        <div className='p-8 flex flex-col border-b'>
            <h1 className='font-semibold'>
                {course.title}
            </h1>
            {/** Check purchase and add progress */}
        </div>
        <div className='flex flex-col w-full'>
            {course.chapters.map((chapter)=> (
                <CourseSidebarItem
                    key={chapter.id}
                    id={chapter.id}
                    label={chapter.title}
                    isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                    courseId={course.id}
                    isLocked={!chapter.isFree && !purchase}
                 />
            ))}
        </div>
    </div>
  )
}

