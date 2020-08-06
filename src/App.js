/* eslint-disable */
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import moment from "moment";
import BaseRouter from "./routes";
import { AuthContext } from "contexts/AuthContext";
import history from "./history.js";



const App = () => {
    const authContext = useContext(AuthContext);
    const { isLoading } = authContext;
    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        let decoded = {};
        if(token) {
            decoded = jwtDecode(token);
            if(moment(decoded.exp).format() < moment().format()) {
                localStorage.clear();
                history.push('/');
            }
        }
        else {
            history.push('/');
        }
        if (decoded.user && token) {
            let user = decoded.user;
            authContext.authDispatch({
                type: authContext.ActionTypes.LOGIN,
                payload: {
                    user,
                    token,
                },
            });
        }

    }, [token]);

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
            {/* <Spinner isLoading={isLoading}/> */}
        </React.Fragment>
    );
}

export default App;
