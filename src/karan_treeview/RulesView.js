import React, { useContext } from "react";

import { AppContext } from "../App";
import "../rules-view.css";
import EditorView from "./BaselineRules/EditorView";
import RulesTreeView from "./ColumnLevelRules/RulesTreeView";

export default function RulesView() {
  const { dataQualityStates } = useContext(AppContext);
  const [baseLineRules, setBaseLineRules] = React.useState(dataQualityStates.baselineRules);

  const handleSave = () => {
    setBaseLineRules({ ...dataQualityStates.baselineRules });
    console.log("Save button clicked");
  };

  return (
    <div className="grid-container">
      <div className="grid-item">{/* <DragAndDropDiv /> */}</div>
      <div className="grid-item">
        <RulesTreeView />
      </div>
      <div className="grid-item">
        {/* <EditorView /> */}
        <EditorView baseLineRules={baseLineRules} setBaseLineRules={setBaseLineRules} />
      </div>
      <button onClick={handleSave}>Submit</button>
    </div>
  );
}
