import { Editor } from "@monaco-editor/react";
import { Button } from "@salt-ds/core";
import React from "react";
import Modal from "react-modal";

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

const RulesModal = ({ setIsOpen, modalIsOpen, modalData, modalKey }) => {
  function closeModal() {
    setIsOpen(false);
  }

  const handleEditorChange = (value) => {};
  const editorData = JSON.stringify(modalData.metadata[modalData.metadata.modalKey], null, 4);

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
      <Editor
        height="35vh"
        width="30vw"
        defaultValue={editorData || "// some comment"}
        defaultLanguage="json"
        value={editorData}
        onChange={handleEditorChange}
      />
      <div style={{ marginTop: "20px", textAlign: "right" }}>
        <Button onClick={closeModal} style={{ marginRight: "10px" }}>
          Close
        </Button>
        <Button onClick={() => console.log("Save button clicked")}>Save</Button>
      </div>
    </Modal>
  );
};

export default RulesModal;
