"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface PreviewProps {
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editable: false, // Read-only mode
  });

  return (
    <div className="bg-slate-100 p-4 border rounded-md">
      <EditorContent editor={editor} />
    </div>
  );
};