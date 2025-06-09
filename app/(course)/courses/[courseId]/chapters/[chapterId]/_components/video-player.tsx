"use client"

import React, { useEffect, useRef, useState } from "react"
import videojs from "video.js"
import "video.js/dist/video-js.css"
import { Loader2, Lock } from "lucide-react"

interface VideoPlayerProps {
  courseId: string
  chapterId: string
  nextChapterId?: string
  isLocked: boolean
  completeOnEnd: boolean
  title: string
  videoUrl: string
}

export const VideoPlayer = ({
  isLocked,
  completeOnEnd,
  title,
  videoUrl,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const playerRef = useRef<ReturnType<typeof videojs> | null>(null);
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!videoRef.current) return

    // Dispose previous player if any
    if (playerRef.current) {
      playerRef.current.dispose()
      playerRef.current = null
    }

    // Initialize video.js player
    playerRef.current = videojs(videoRef.current, {
      controls: true,
      autoplay: false,
      responsive: true,
      fluid: true,
      preload: "auto",
      sources: [{ src: videoUrl, type: "video/mp4" }],
    })

    // When player is ready, set isReady to true
    playerRef.current.ready(() => {
      setIsReady(true)
    })

    // Handle video end event if needed
    if (completeOnEnd) {
      playerRef.current.on("ended", () => {
        console.log("Video ended")
        // Add your completion logic here
      })
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose()
        playerRef.current = null
      }
    }
  }, [videoUrl, completeOnEnd])

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}

      {isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-2 bg-slate-800 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This Chapter is Locked</p>
        </div>
      )}

      {!isLocked && (
        <video
          ref={videoRef}
          className="video-js vjs-default-skin w-full h-full object-cover rounded-md"
          title={title}
        />
      )}
    </div>
  )
}
