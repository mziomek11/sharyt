import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import checkEnvVars from "./checkEnvVars";

checkEnvVars();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
