import React from "react";

import "./rules-view.css";
import DragAndDropDiv from "./AddMoreRules/DragAndDropDiv";
import RulesTreeView from "./ColumnLevelRules/RulesTreeView";
import EditorView from "./BaselineRules/EditorView";
export default function RulesView() {
  return (
    <div className="grid-container">
      <div className="grid-item">
        <DragAndDropDiv />
      </div>
      <div className="grid-item">
        <RulesTreeView />
      </div>
      <div className="grid-item">
        <EditorView />
      </div>
    </div>
  );
}
