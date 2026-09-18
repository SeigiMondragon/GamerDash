import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <MantineProvider>
          <App />
        </MantineProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
