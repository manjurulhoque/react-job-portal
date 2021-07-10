/* eslint-disable */
import React, { useContext, useEffect, useState, FC } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import moment from "moment";
import BaseRouter from "./routes";
import { AuthContext } from "./contexts/AuthContext";
import history from "./history.js";

const App: FC = () => {
    const authContext = useContext(AuthContext);
    const [token, setToken] = useState('');

    useEffect(() => {
        // let decoded = {};
        // let exceptRoutes = ["/jobs", "/applied-jobs"];
        // if (token) {
        //     decoded = jwtDecode(token);
        //     console.log(moment.unix(decoded.exp).format());
        //     console.log(moment().format());
        //     if (moment.unix(decoded.exp).format() < moment().format()) {
        //         localStorage.clear();
        //         history.push('/');
        //     }
        // } else {
        //     if (!exceptRoutes.includes(history.location.pathname)) {
        //         history.push('/');
        //     }
        // }
        // if (decoded.user && jwtToken) {
        //     setToken(jwtToken);
        //     let user = decoded.user;
        //     authContext.authDispatch({
        //         type: authContext.ActionTypes.LOGIN,
        //         payload: {
        //             user,
        //             token,
        //         },
        //     });
        // }

    }, []);

    return (
        <React.Fragment>
            <Router>
                <div
                    id="page-container"
                    className="enable-page-overlay side-scroll page-header-fixed page-header-dark main-content-narrow side-trans-enabled"
                >
                    <BaseRouter/>
                </div>
            </Router>
            {/* <Spinner isLoading={isLoading}/> */}
        </React.Fragment>
    );
}

export default App;
