import React, { useContext, useEffect } from "react";

import "../rules-view.css";
import EditorView from "./BaselineRules/EditorView";
import { AppContext } from "../App";
import RulesTreeView from "./ColumnLevelRules/RulesTreeView";
import { removeField } from "./utils";

export default function RulesView() {
  const { dataQualityStates } = useContext(AppContext);
  const [baseLineRules, setBaseLineRules] = React.useState(
    dataQualityStates.baselineRules
  );

  return (
    <div className="grid-container">
      <div className="grid-item">{/* <DragAndDropDiv /> */}</div>
      <div className="grid-item">
        <RulesTreeView />
      </div>
      <div className="grid-item">
        {/* <EditorView /> */}
        <EditorView
          baseLineRules={baseLineRules}
          setBaseLineRules={setBaseLineRules}
        />
      </div>
    </div>
  );
}
