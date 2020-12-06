import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import {ToastProvider} from 'react-toast-notifications';
import App from "./App";
import './App.css';
import * as serviceWorker from "./serviceWorker";
import {AuthContextProvider} from "contexts/AuthContext";
import {JobContextProvider} from "contexts/JobContext";
import "./i18next"

ReactDOM.render(
    <ToastProvider autoDismiss={true} autoDismissTimeout={2000}>
        <AuthContextProvider>
            <JobContextProvider>
                <Suspense fallback={<div>Loading...</div>}>
                    <App/>
                </Suspense>
            </JobContextProvider>
        </AuthContextProvider>
    </ToastProvider>
    , document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
