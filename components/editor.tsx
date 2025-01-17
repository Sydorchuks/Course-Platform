/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";
import ClickableButton from "./editor-button";

interface EditorProps {
  onChange: (value: string) => void; // Updates the parent form state
  value: string; // Controlled value
  placeholder?: string;
  className?: string;
  disabled?: boolean; // Disable editor interactions
}

export const Editor = ({ onChange, value, placeholder, className, disabled }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: true,
      }),
    ],
    content: value,
    editable: !disabled, // Editor is disabled when `disabled` is true
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html); // Synchronize with form state
    },
  });

  // Cleanup editor on unmount
  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  if (!editor) return <div>Loading editor...</div>;

  return (
    <div className="editor-container">
      {/* Toolbar */}
      <div className="toolbar">
        <ClickableButton
          type="button"
          className="toolbar-btn"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          B
        </ClickableButton>
        <ClickableButton
          type="button"
          className="toolbar-btn"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        >
          I
        </ClickableButton>
        <ClickableButton
          type="button"
          className="toolbar-btn"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
        >
          U
        </ClickableButton>

      </div>

      {/* Editor Content */}
      <div className="editor-content">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
