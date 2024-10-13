import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SaltProvider } from "@salt-ds/core";
import "@salt-ds/theme/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SaltProvider>
    <App />
  </SaltProvider>
);
