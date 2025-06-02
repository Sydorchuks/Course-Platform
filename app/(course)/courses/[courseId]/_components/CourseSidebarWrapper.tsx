// app/course/[courseId]/sidebar.tsx
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/getServerUser';
import { redirect } from 'next/navigation';
import { CourseSidebar } from './CourseSidebar';

export default async function CourseSidebarWrapper({
    params
}: {
    params: { courseId: string }
}) {
    const user = await getCurrentUser();
    const userId = user?.id;
  
    if(!userId) {
      redirect("/")
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId
        },
        include: {
            chapters: {
                include: {
                    userProgress: {
                        where: {
                            userId
                        }
                    }
                }
            }
        }
    });

    if (!course) {
        return redirect("/");
    }

    const purchase = await db.purchase.findUnique({
        where: {
            userId_courseId: {
                userId, 
                courseId: course.id
            }
        }
    });

    return (
        <CourseSidebar 
            course={course}
            progressCount={0} // Calculate this if needed
        />
    )
}