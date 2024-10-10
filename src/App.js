import logo from "./logo.svg";
import "./App.css";

import RulesView from "./treeview/RulesView";
import { createContext, useState } from "react";
import { editorData } from "./treeview/BaselineRules/editorData";
import { sampleTreeData } from "./treeview/ColumnLevelRules/treeData";
export const AppContext = createContext();
function App() {
    const [dataQualityStates, setDataQualityStates] = useState({
        addMoreColumnRules: {},
        baselineRules: editorData,
        columnLevelRules: sampleTreeData,
        
    });
    return (
        <AppContext.Provider
            value={{ dataQualityStates, setDataQualityStates }}
        >
            <RulesView />
        </AppContext.Provider>
    );
}

export default App;
