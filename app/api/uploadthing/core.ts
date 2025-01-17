/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const useHandleAuth = () => {
  const {userId} = useAuth();
  if(!userId) throw new Error("Unauthorized")
    return {userId}
}


export const ourFileRouter = {
  courseImage: f({image: {maxFileSize: "4MB", maxFileCount:1}}).onUploadComplete(() => {}),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"]).onUploadComplete(()=>{}),
  chapterVideo: f({video: {maxFileCount: 1, maxFileSize: "512GB"}}).onUploadComplete(()=>{})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
