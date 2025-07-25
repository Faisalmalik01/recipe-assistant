import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
import { ThemeProvider } from "./context/ThemeContext";

import App from "./App";
import "./index.css";

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/recipe-assistant">
    <ThemeProvider>            
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </ThemeProvider>   
  </BrowserRouter>
);
