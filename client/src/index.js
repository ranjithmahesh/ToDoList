import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { IsAdminProvider } from "./isAdminContext";
import { NavBarProvider } from "./reduser";

ReactDOM.render(
  <React.StrictMode>
    <NavBarProvider>
      <IsAdminProvider>
        <App />
      </IsAdminProvider>
    </NavBarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
