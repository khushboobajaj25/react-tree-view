import { Editor } from "@monaco-editor/react";
import React from "react";

const EditorView = ({ baseLineRules, setBaseLineRules }) => {
  const editorBaseLine = JSON.parse(JSON.stringify(baseLineRules));
  const handleEditorChange = (value) => {
    try {
      setBaseLineRules(JSON.parse(value));
    } catch (e) {
      console.error("Invalid JSON input", e);
    }
  };

  const editorBaseLineString = JSON.stringify(editorBaseLine, null, 4);
  return (
    <Editor
      height="90vh"
      defaultValue={editorBaseLineString || "// some comment"}
      defaultLanguage="json"
      value={editorBaseLineString}
      onChange={handleEditorChange}
    />
  );
};

export default EditorView;
