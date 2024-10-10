import logo from "./logo.svg";
import "./App.css";

import RulesView from "./treeview/RulesView";
import { createContext, useState } from "react";
export const AppContext = createContext();
function App() {
    const [dataQualityStates, setDataQualityStates] = useState({
        addMoreColumnRules: {},
        baselineRules: {},
        columnLevelRules: {},
        
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
