/* eslint-disable */
import React, { FC, useContext, useState } from "react";
import {NavLink, Redirect, useHistory} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";

interface Props {
    children: React.ReactNode
    title?: string
}

const EmployerSidebarLayout: FC<Props> = ({children, title = 'Dashboard'}) => {

    const history = useHistory();

    const authContext = useContext(AuthContext);
    const {isAuthenticated, user} = authContext.state;
    const [redirect, setRedirect] = useState(false);

    const handleLogout = () => {
        authContext.authDispatch({
            type: authContext.ActionTypes.LOGOUT,
            payload: {},
        });

        setRedirect(true);
    }

    const getActiveClass = (url: string) => {
        return url === history.location.pathname ? 'active' : '';
    }

    if (redirect) {
        return <Redirect to="/"/>;
    }

    return (
        <React.Fragment>
            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner-header">
                                <h3>{title}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div id="content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-xs-12">
                            <div className="right-sideabr">
                                <h4>Manage Account</h4>
                                <ul className="list-item">
                                    <li>
                                        <NavLink exact className={getActiveClass('/employer/dashboard/')} activeClassName='active'
                                                 to='/employer/dashboard/'>Dashboard</NavLink>
                                    </li>
                                    <li>
                                        <NavLink exact className={getActiveClass('/employer/applicants/')}
                                                 to='/employer/applicants/'>Applicants</NavLink>
                                    </li>
                                    <li><a href="#!">Change Password</a></li>
                                    <li onClick={handleLogout} style={{cursor: 'pointer'}}>
                                        <a>Sing Out</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default EmployerSidebarLayout;