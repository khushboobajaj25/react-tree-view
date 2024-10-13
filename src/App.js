import { createContext, useEffect, useState } from "react";
import RulesView from "./karan_treeview/RulesView";
import { apiEditorData } from "./karan_treeview/mockData";
import { getTreeViewData, removeField } from "./karan_treeview/utils";

export const AppContext = createContext();
function App() {
  const [dataQualityStates, setDataQualityStates] = useState(null);

  useEffect(() => {
    const baseLinesRules = JSON.parse(JSON.stringify(apiEditorData));
    removeField(baseLinesRules, "optional");
    setDataQualityStates({
      ...dataQualityStates,
      addMoreColumnRules: apiEditorData,
      baselineRules: baseLinesRules,
      columnLevelRules: getTreeViewData(apiEditorData),
    });
  }, []); // eslint-disable-line

  return (
    <>
      {dataQualityStates && (
        <AppContext.Provider value={{ dataQualityStates, setDataQualityStates }}>
          <RulesView />
        </AppContext.Provider>
      )}
    </>
  );
}

export default App;
