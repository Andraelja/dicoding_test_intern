"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

export default function JobDescriptionEditor() {
  const editor = useEditor({
    immediatelyRender: false, // ⬅️ INI NIH TEMPATNYA
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
      Underline,
    ],
    content: `
      <h2>Deskripsi Pekerjaan</h2>
      <p>
        Sebagai [Posisi Lowongan], Anda akan berpartisipasi dalam proses pembangunan
        aplikasi yang sedang dibangun dalam perusahaan [Nama Perusahaan].
      </p>
    `,
  });

  if (!editor) return null;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        Deskripsi <span className="text-red-500">*</span>
      </label>

      <div className="flex gap-1 rounded border bg-gray-50 p-2">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}>
          B
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}>
          I
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()}>
          U
        </button>
      </div>

      <div className="min-h-[220px] rounded border bg-white p-3 text-sm">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
