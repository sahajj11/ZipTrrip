import React from "react";
import { createRoot } from "react-dom/client";
import Todos from "../pages/Todos";
import "../index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Todos />
  </React.StrictMode>
);