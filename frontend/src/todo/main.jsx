import React from "react";
import { createRoot } from "react-dom/client";
import TodoDetails from "../pages/TodoDetails";
import "../index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TodoDetails />
  </React.StrictMode>
);