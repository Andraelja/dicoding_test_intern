"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { 
  Bold, 
  Italic, 
  UnderlineIcon, 
  Link2, 
  Image as ImageIcon, 
  Code 
} from "lucide-react";

interface JobDescriptionEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function JobDescriptionEditor({ 
  value, 
  onChange 
}: JobDescriptionEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded",
        },
      }),
    ],
    content: value || `
      <h2>Deskripsi Pekerjaan</h2>
      <p>
        Sebagai [Posisi Lowongan], Anda akan berpartisipasi dalam proses pembangunan
        aplikasi yang sedang dibangun dalam perusahaan [Nama Perusahaan]. Anda juga
        diharapkan mampu bekerja dalam tim.
      </p>

      <h2>Tanggung Jawab</h2>
      <ul>
        <li>Membuat atau memodifikasi program yang sudah ada.</li>
        <li>Bertanggung jawab dalam mengelola program.</li>
      </ul>
    `,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  if (!editor) return null;

  // Fungsi untuk insert link
  const addLink = () => {
    const url = prompt("Masukkan URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  // Fungsi untuk insert image
  const addImage = () => {
    const url = prompt("Masukkan URL gambar:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        Deskripsi <span className="text-red-500">*</span>
      </label>

      {/* Toolbar */}
      <div className="flex items-center gap-1 rounded border bg-gray-50 p-2">
        {/* Bold */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("bold") ? "bg-gray-300" : ""
          }`}
          title="Bold (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("italic") ? "bg-gray-300" : ""
          }`}
          title="Italic (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </button>

        {/* Underline */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("underline") ? "bg-gray-300" : ""
          }`}
          title="Underline (Ctrl+U)"
        >
          <UnderlineIcon className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Link */}
        <button
          type="button"
          onClick={addLink}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("link") ? "bg-gray-300" : ""
          }`}
          title="Insert Link"
        >
          <Link2 className="w-4 h-4" />
        </button>

        {/* Image */}
        <button
          type="button"
          onClick={addImage}
          className="p-2 rounded hover:bg-gray-200"
          title="Insert Image"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        {/* Code Block */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("codeBlock") ? "bg-gray-300" : ""
          }`}
          title="Code Block"
        >
          <Code className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Heading 2 */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 rounded hover:bg-gray-200 text-sm font-semibold ${
            editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : ""
          }`}
          title="Heading 2"
        >
          H2
        </button>

        {/* Bullet List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded hover:bg-gray-200 text-sm ${
            editor.isActive("bulletList") ? "bg-gray-300" : ""
          }`}
          title="Bullet List"
        >
          • List
        </button>
      </div>

      {/* Editor Content */}
      <div className="min-h-[300px] rounded border bg-white p-4 text-sm prose prose-sm max-w-none">
        <EditorContent editor={editor} />
      </div>

      <p className="text-xs text-gray-500">
        Anda bisa mengubah template yang telah disediakan di atas.
      </p>
    </div>
  );
}