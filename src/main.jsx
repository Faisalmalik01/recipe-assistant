import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
import { ThemeProvider } from "./context/ThemeContext";

import App from "./App";
import "./index.css";

createRoot(document.getElementById('root')).render(
 <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
    <ThemeProvider>            
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </ThemeProvider>   
  </BrowserRouter>
);
