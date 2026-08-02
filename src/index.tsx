import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import "./App.css";
import * as serviceWorker from "./serviceWorker";
import { AuthContextProvider } from "./contexts/AuthContext";
import { JobContextProvider } from "./contexts/JobContext";
import "./i18next";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthContextProvider>
        <JobContextProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <App />
          </Suspense>
        </JobContextProvider>
      </AuthContextProvider>
    </HelmetProvider>
    <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
