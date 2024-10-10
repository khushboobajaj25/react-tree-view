import React, { useState } from "react";
import Modal from "react-modal";
import Editor from "@monaco-editor/react";
export default function RulesModal({ isOpen, treeElement, setModalOpen }) {
    const customStyles = {
        content: {
            width: 450,
            height: 450,
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };
    const defaultValue = treeElement.metadata[treeElement.modalKey];
    const [editorValue, setEditorValue] = useState(defaultValue);
    console.log(treeElement);

    return (
        <Modal
            isOpen={isOpen}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            Enter {treeElement.modalKey}
            <Editor
                height="50vh"
                defaultLanguage="json"
                value={JSON.stringify(defaultValue, null, 4)}
                defaultValue={JSON.stringify(defaultValue, null, 4)}
            />
            <button>Save</button>
            <button
                onClick={() => {
                    setModalOpen(false);
                }}
            >
                Close
            </button>
        </Modal>
    );
}
