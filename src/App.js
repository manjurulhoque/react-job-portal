/* eslint-disable */
import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import BaseRouter from "./routes";
import { AuthContext } from "contexts/AuthContext";


function App() {
    const authContext = useContext(AuthContext);

    useEffect(() => {

        let user = JSON.parse(localStorage.getItem("user"));
        let token = JSON.parse(localStorage.getItem("token"));

        if (!user && token) {
            let decoded = jwtDecode(token);
            user = decoded.user; localStorage.setItem('user', user);
        }
        if (user && token) {
            authContext.dispatch({
                type: authContext.ActionTypes.LOGIN,
                payload: {
                    user,
                    token,
                },
            });
        }

    }, []);

    return (
        <React.Fragment>
            <Router>
                <div
                    id="page-container"
                    className="enable-page-overlay side-scroll page-header-fixed page-header-dark main-content-narrow side-trans-enabled"
                >
                    <BaseRouter />
                </div>
            </Router>
        </React.Fragment>
    );
}

export default App;
