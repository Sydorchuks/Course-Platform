/* eslint-disable @typescript-eslint/no-unused-vars */
import { getChapter } from '@/actions/get-chapter';
import { Banner } from '@/components/banner';
import { getCurrentUser } from '@/lib/getServerUser';
import { redirect } from 'next/navigation';
import React from 'react'
import { VideoPlayer } from './_components/video-player';

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
        completeOnEnd = {completeOnEnd}
         />
      </div>
    </div>
  )
}

export default ChapterIdPage