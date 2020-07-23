/* eslint-disable */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";

function App() {
    return (
        <Router>
            <div
                id="page-container"
                className="enable-page-overlay side-scroll page-header-fixed page-header-dark main-content-narrow side-trans-enabled"
            >
                <BaseRouter />
            </div>
        </Router>
    );
}

export default App;
