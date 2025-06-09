/* eslint-disable @typescript-eslint/no-unused-vars */
import { getChapter } from '@/actions/get-chapter';
import { Banner } from '@/components/banner';
import { getCurrentUser } from '@/lib/getServerUser';
import { redirect } from 'next/navigation';
import React from 'react'
import { VideoPlayer } from './_components/video-player';
import CourseEnrollButton from './_components/course-enroll-button';
import { Separator } from '@/components/ui/separator';
import { Preview } from '@/components/preview';
import { File } from 'lucide-react';

const ChapterIdPage = async({params}: {params:{courseId: string; chapterId: string}}) => {
  
  const user = await getCurrentUser();
  const userId = user?.id;

  if(!userId){
    redirect("/")
  }

  const {chapter, course, attachments, nextChapter, userProgress, purchase} =  await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId
  })

  if(!chapter || !course){
    return redirect("/")
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted


  
  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner label='You already completed this chapter!' variant="success" />
      )}

      {isLocked && (
        <Banner label='You need to purchase this course to watch this chapter' variant="warning" />
      )}

      <div className='p-4'>
        <VideoPlayer chapterId={params.chapterId}
        title={chapter.title}
        courseId={params.courseId}
        nextChapterId={nextChapter?.id}
        isLocked = {isLocked}
        videoUrl={chapter.videoUrl ?? ""}
        completeOnEnd = {completeOnEnd}
         />
      </div>

      <div>
        <div className='p-4 flex flex-col md:flex-row items-center justify-between'>
          <h2 className='text-2xl font-semibold mb-2'>
            {chapter.title}
          </h2>
          {purchase ? (
            <div>

            </div>
          ) : (
            <CourseEnrollButton
              courseId={params.courseId}
              price={course.price!}
            />
          )}
        </div>
        <Separator />
        <div>
          <Preview value={chapter.description!} />
        </div>

        {!!attachments.length && (
          <>
            <Separator />
            <div className='p-4'>
              {attachments.map((attachment) => (
                <a href={attachment.url} target='_blank' key={attachment.id} className='flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline'>
                  <File />
                  <p>
                    {attachment.name}
                  </p>
                </a>
              ))}
            </div>
          </>
        )}
      </div>

    </div>
  )
}

export default ChapterIdPage