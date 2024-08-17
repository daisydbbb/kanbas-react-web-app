import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const toolbarOptions = [
  [{ header: [1, 2, 3, 4, false] }],
  ["bold", "italic", "underline"],
  ["link", "image"],
  [{ list: "ordered" }, { list: "bullet" }],
];

function WYSIWYGEditor({
  form,
  setForm,
}: {
  form: any;
  setForm: (form: any) => void;
}) {
  const [editorContent, setEditorContent] = useState(form.instructions || "");
  useEffect(() => {
    setEditorContent(form.instructions || "");
  }, [form.instructions]);

  const handleChange = (content: string) => {
    const updatedForm = {
      ...form,
      instructions: content,
    };
    setEditorContent(content);
    setForm(updatedForm);
  };

  return (
    <div>
      <ReactQuill
        value={editorContent}
        onChange={handleChange}
        modules={{ toolbar: toolbarOptions }}
        style={{ height: 100, marginTop: 10, marginBottom: 50 }}
      />
    </div>
  );
}

export default WYSIWYGEditor;
