/* eslint-disable */
import React from "react";
import {NavLink, useHistory} from "react-router-dom";

const EmployerSidebarLayout = ({children, title = 'Dashboard'}) => {

    const history = useHistory();

    const getActiveClass = (url) => {
        return url === history.location.pathname ? 'active' : '';
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
                                        <NavLink exact className={getActiveClass('/employer/dashboard/')} activeClassName='active' to='/employer/dashboard/'>Dashboard</NavLink>
                                    </li>
                                    <li>
                                        <NavLink exact className={getActiveClass('/employer/applicants/')} to='/employer/applicants/'>Applicants</NavLink>
                                    </li>
                                    <li><a href="change-password.html">Change Password</a></li>
                                    <li><a href="index-2.html">Sing Out</a></li>
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