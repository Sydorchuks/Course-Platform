import { Category, Course } from "@prisma/client";
import { CourseCard } from "./course-card";

type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: {id: string}[];
    progress: number | null
}

interface CoursesListProps{
    items: CourseWithProgressWithCategory[];
}

export const CoursesList = ({items}: CoursesListProps) =>{
    return (
        <div>
            <div>
            {items.map((item) => (
                <CourseCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    imageUrl={item.imageUrl!}
                    chaptersLength={item.chapters.length}
                    price={item.price!}
                    progress={item.progress}
                    category={item?.category!.name}
                />
            ))}
            </div>
            {items.length === 0 && (
                <div className="text-center text-sm text-muted-foreground mt-10">No courses Found</div>
            )}
        </div>
    )
}