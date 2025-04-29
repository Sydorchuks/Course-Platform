import { getCurrentUser } from "@/lib/getServerUser";
import {db} from "@/lib/db"
import { redirect } from "next/navigation";

const CourseLayout = async ({children, params}: {children:React.ReactNode; params: {courseId: string}}) => {
    const { courseId } = await params;

    const user = await getCurrentUser();
    const userId = user?.id;

    if(!userId){
        return redirect("/")
    }


    const course = await db.course.findUnique({
        where:{
            id: courseId
        },
        include:{
            chapters:{
                where:{
                    isPublished: true
                },
                include:{
                    userProgress:{
                        where:{
                            userId
                        }
                    }
                },
                orderBy:{
                    position: "asc"
                }
            }
        }
    })
    
    return (
        <div>
            {children}
        </div>
    )
}

export default CourseLayout