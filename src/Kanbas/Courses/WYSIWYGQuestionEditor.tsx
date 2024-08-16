import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const toolbarOptions = [
  [{ header: [1, 2, 3, 4, false] }],
  ["bold", "italic", "underline"],
  ["link", "image"],
  [{ list: "ordered" }, { list: "bullet" }],
];

function WYSIWYGQuestionEditor({
  form,
  setForm,
}: {
  form: any;
  setForm: (form: any) => void;
}) {
  const [editorContent, setEditorContent] = useState(form.description || "");
  useEffect(() => {
    setEditorContent(form.description || "");
  }, [form.description]);

  const handleChange = (content: string) => {
    const strippedContent = content.replace(/^<p>(.*?)<\/p>$/, "$1");
    const updatedForm = {
      ...form,
      description: strippedContent,
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

export default WYSIWYGQuestionEditor;
