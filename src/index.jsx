import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

const root = document.getElementById("root");
const rootRender = createRoot(root);

rootRender.render(<App />);