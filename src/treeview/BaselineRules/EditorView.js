import { Editor } from "@monaco-editor/react";
import React from "react";
import { editorData } from "./editorData";

export default function EditorView() {
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };
    return (
        <Editor
            height="90vh"
            defaultLanguage="json"
            value={JSON.stringify(editorData, null, 4)}
            defaultValue="// some comment"
        />
    );
}
