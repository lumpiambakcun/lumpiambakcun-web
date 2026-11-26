"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Autoformat, BlockQuote, Bold, ClassicEditor, Essentials, Heading, Italic, Link, List, Paragraph, Undo, type EditorConfig } from "ckeditor5";
import translations from "ckeditor5/translations/id.js";
import { useState } from "react";
import "ckeditor5/ckeditor5.css";

type ArticleEditorProps = {
  name: string;
  defaultValue?: string;
  error?: string;
  onChange?: () => void;
};

const config: EditorConfig = {
  licenseKey: process.env.NEXT_PUBLIC_CKEDITOR_LICENSE_KEY || "GPL",
  language: "id",
  translations: [translations],
  label: "Isi artikel",
  placeholder: "Mulai menulis...",
  plugins: [Essentials, Paragraph, Heading, Bold, Italic, Link, List, BlockQuote, Undo, Autoformat],
  toolbar: ["undo", "redo", "|", "heading", "|", "bold", "italic", "link", "|", "bulletedList", "numberedList", "blockQuote"],
  heading: {
    options: [
      { model: "paragraph", title: "Paragraf", class: "ck-heading_paragraph" },
      { model: "heading2", view: "h2", title: "Subjudul", class: "ck-heading_heading2" },
      { model: "heading3", view: "h3", title: "Subjudul kecil", class: "ck-heading_heading3" },
    ],
  },
  link: { defaultProtocol: "https://" },
};

export function ArticleEditor({ name, defaultValue = "", error, onChange }: ArticleEditorProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="flex flex-col">
      <div className="article-editor" aria-invalid={error ? true : undefined}>
        <CKEditor
          editor={ClassicEditor}
          config={config}
          data={defaultValue}
          onChange={(_, editor) => {
            setValue(editor.getData());
            onChange?.();
          }}
        />
      </div>
      <input type="hidden" name={name} value={value} />
      {error && (
        <p id="body-error" role="alert" className="px-5 pb-4 text-xs leading-[1.28] text-brand md:px-6">
          {error}
        </p>
      )}
    </div>
  );
}
