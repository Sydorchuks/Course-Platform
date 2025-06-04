/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import axios from "axios"
import { useState } from "react"
import {toast} from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Loader2, Lock } from "lucide-react"

import { cn } from "@/lib/utils"
import { useConfettiStore } from "@/hooks/use-confetti-store"


interface VideoPlayerProps {
    courseId: string;
    chapterId: string;
    nextChapterId?: string;
    isLocked: boolean;
    completeOnEnd: boolean;
    title: string;
}

export const VideoPlayer = ({
    courseId,
    chapterId,
    nextChapterId,
    isLocked,
    completeOnEnd,
    title
}: VideoPlayerProps) => {


    return (
        <div>
            Video Player
        </div>
    )
}