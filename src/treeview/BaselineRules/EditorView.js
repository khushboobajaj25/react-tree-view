import { Editor } from "@monaco-editor/react";
import React, { useContext } from "react";
import { apiEditorData } from "./apiEditorData";
import { AppContext } from "../../App";

export default function EditorView() {
    const{dataQualityStates,setDataQualityStates} = useContext(AppContext)
    const{baselineRules} =  dataQualityStates
    return (
        <Editor
            height="90vh"
            defaultLanguage="json"
            value={JSON.stringify(baselineRules, null, 4)}
            defaultValue="// some comment"
        />
    );
}
