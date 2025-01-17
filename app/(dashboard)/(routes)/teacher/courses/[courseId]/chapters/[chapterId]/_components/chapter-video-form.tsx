/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import { Button } from "@/components/ui/button"
import { ImageIcon, Pencil, PlusCircle, Video } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Chapter, Course, MuxData } from "@prisma/client"
import Image from "next/image"
import "video.js/dist/video-js.css";
import videojs from "video.js";
import { FileUpload } from "@/components/file-upload"
import VideoPlayer from "@/components/video-player"

interface ChapterVideoFormProps{
    initialData:Chapter
    courseId: string
    chapterId: string
    file?:any
}

const formSchema = z.object({
    videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({initialData, courseId, chapterId}:ChapterVideoFormProps) => {

    const [isEditing, setIsEditing] = useState(false)
    const [isUploading, setIsUploading] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current);
    const router = useRouter();

    const onSubmit = async(values:z.infer<typeof formSchema>) =>{
        try{
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
            toast.success("Image updated");
            toggleEdit();
            router.refresh();
        }catch{
            toast.error("Something wrong with image change")
        }
    }


    return(
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter Video
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && !initialData.videoUrl && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add a video
                        </>
                    )}
                    {!isEditing && initialData.videoUrl && (
                        <>
                        <Pencil className="h-4 w-4 mr-2" />
                           Edit Video
                       </>
                    )}
                </Button>
            </div>
            {isEditing ? (
                // Show FileUpload when editing
                <div className="relative aspect-video mt-2">
                    <FileUpload
                        endpoint="chapterVideo"
                        onChange={(url) => {
                            console.log("Uploaded Video URL:", url); // Debug log
                            if (url) {
                                onSubmit({ videoUrl: url });
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        Recommended formats: MP4, WebM. Maximum file size: 500MB.
                    </div>
                </div>
            ) : (
                // Show the current video or placeholder when not editing
                !initialData.videoUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <Video className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <VideoPlayer videoUrl={initialData.videoUrl} />
                    </div>
    )
)}
            
        </div>
    );
}