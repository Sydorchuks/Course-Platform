import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Chapter, Course, UserProgress } from '@prisma/client';
import { Menu } from 'lucide-react';
import React from 'react'
import { CourseSidebar } from './CourseSidebar';

interface CourseMobileSidebarProps{
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[];
    }
    progressCount: number
}

export const CourseMobileSidebar = ({course, progressCount}: CourseMobileSidebarProps) => {
  return (
    <Sheet>
        <SheetTrigger className='md:hidden pr-4 hover:opacity-75 transition'>
            <Menu />
        </SheetTrigger>
        <SheetContent className='p-0 bg-white w-72' side="left">
            <CourseSidebar course={course} progressCount={progressCount}/>
        </SheetContent>
    </Sheet>
  )
}
