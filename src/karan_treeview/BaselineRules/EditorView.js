import { Editor } from "@monaco-editor/react";
import React, { useContext } from "react";
import { AppContext } from "../../App";

const EditorView = ({ setBaseLineRules }) => {
  const { dataQualityStates } = useContext(AppContext);
  const editorBaseLine = JSON.parse(JSON.stringify(dataQualityStates.baseLineRules));
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
