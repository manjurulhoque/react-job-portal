import React from "react";
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
import * as serviceWorker from "./serviceWorker";
import { AuthContextProvider } from "contexts/AuthContext";

ReactDOM.render(
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
    , document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
