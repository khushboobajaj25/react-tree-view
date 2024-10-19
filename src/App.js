import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RulesView from "./karan_treeview/RulesView"; // Adjust the import according to your file structure
import { apiEditorData } from "./karan_treeview/mockData";
import { getTreeViewData, removeField } from "./karan_treeview/utils";
import AfterSubmit from "./AfterSubmit"; // Import AfterSubmit component
import Home from "./Home"; // Import Home component

export const AppContext = createContext();
function App() {
  const [dataQualityStates, setDataQualityStates] = useState(null);

  useEffect(() => {
    const baseLineRules = JSON.parse(JSON.stringify(apiEditorData));
    removeField(baseLineRules, "optional");
    setDataQualityStates({
      ...dataQualityStates,
      addMoreColumnRules: apiEditorData,
      baseLineRules: baseLineRules,
      columnLevelRules: getTreeViewData(apiEditorData),
    });
  }, []); // eslint-disable-line

  return (
    <Router>
      {dataQualityStates && (
        <AppContext.Provider value={{ dataQualityStates, setDataQualityStates }}>
          <Routes>
            <Route path="/rules" element={<RulesView />} />
            <Route path="/after-submit" element={<AfterSubmit />} /> {/* Add AfterSubmit route */}
            <Route path="/" element={<Home />} /> {/* Add Home route */}
            {/* <Route path="/another" element={<AnotherComponent />} /> */}
          </Routes>
        </AppContext.Provider>
      )}
    </Router>
  );
}

export default App;