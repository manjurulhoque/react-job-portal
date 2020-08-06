/* eslint-disable */
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import moment from "moment";
import BaseRouter from "./routes";
import { AuthContext } from "contexts/AuthContext";
import history from "./history.js";



const App = () => {
    const authContext = useContext(AuthContext);
    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        let user = localStorage.getItem("user");
        let decoded = {};
        console.log(moment().format());
        console.log(moment(decoded.exp).format());
        if(token) {
            decoded = jwtDecode(token);
            // if(moment(decoded.exp).format() < moment().format()) {
            //     localStorage.clear();
            //     history.push('/');
            // }
        }
        else {
            history.push('/');
        }

        if (!user) {
            user = decoded.user; 
        }
        // if (user && token) {
        //     authContext.dispatch({
        //         type: authContext.ActionTypes.LOGIN,
        //         payload: {
        //             user,
        //             token,
        //         },
        //     });
        // }

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
        </React.Fragment>
    );
}

export default App;
