/* eslint-disable */
import React from "react";

const EmployerSidebarLayout = ({children, title = 'Dashboard'}) => {
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
                                    <li><a className="active" href="job-alerts.html">Dashboard</a></li>
                                    <li><a href="manage-applications.html">Manage Applications</a></li>
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