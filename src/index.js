import React, {Suspense} from "react";
import ReactDOM from "react-dom";
// import "./assets/css/bootstrap.min.css";
// import "./assets/css/line-icons.css";
// import "./assets/css/owl.carousel.min.css";
// import "./assets/css/owl.theme.default.css";
// import "./assets/css/slicknav.min.css";
// import "./assets/css/animate.css";
// import "./assets/css/main.css";
// import "./assets/css/responsive.css";
import App from "./App";
import './App.css';
import * as serviceWorker from "./serviceWorker";
import {AuthContextProvider} from "contexts/AuthContext";
import {JobContextProvider} from "contexts/JobContext";
import "./i18next"

ReactDOM.render(
    <AuthContextProvider>
        <JobContextProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <App/>
            </Suspense>
        </JobContextProvider>
    </AuthContextProvider>
    , document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
