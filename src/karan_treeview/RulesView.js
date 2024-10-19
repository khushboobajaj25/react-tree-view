import React, { useContext } from "react";

import { AppContext } from "../App";
import "../rules-view.css";
import EditorView from "./BaselineRules/EditorView";
import RulesTreeView from "./ColumnLevelRules/RulesTreeView";
import { useNavigate } from "react-router-dom";

export default function RulesView() {
  const { dataQualityStates, setDataQualityStates } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSave = () => {
    setDataQualityStates({ ...dataQualityStates });
    console.log("Save button clicked");
  };

  const handleSubmit = () => {
    console.log("Submit button clicked");
    navigate("/after-submit");
  };

  return (
    <div className="grid-container">
      <div className="grid-item">{/* <DragAndDropDiv /> */}</div>
      <div className="grid-item">
        <RulesTreeView />
      </div>
      <div className="grid-item">
        {/* <EditorView /> */}
        <EditorView />
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleSubmit}>Execute</button>
    </div>
  );
}
