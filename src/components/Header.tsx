/* eslint-disable */
import React, { FC, useContext, useState } from "react";
import { NavLink, Redirect } from 'react-router-dom';
import Jumbotron from "./Jumbotron";
import { AuthContext } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";

const Header: FC = () => {

    const {t, i18n} = useTranslation();

    const [redirect, setRedirect] = useState(false);
    const authContext = useContext(AuthContext);
    const {isAuthenticated, user} = authContext.state;

    const handleLogout = () => {
        authContext.authDispatch({
            type: authContext.ActionTypes.LOGOUT,
            payload: {},
        });

        setRedirect(true);
    }

    const getFullName = () => {
        return `${user.first_name} ${user.last_name}`;
    }

    if (redirect) {
        return <Redirect to="/"/>;
    }

    return (
        <header id="home" className="hero-area">

            <nav className="navbar navbar-expand-lg fixed-top scrolling-navbar">
                <div className="container">
                    <div className="theme-header clearfix">
                        <div className="navbar-header">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-navbar"
                                    aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"/>
                                <span className="lni-menu"/>
                                <span className="lni-menu"/>
                                <span className="lni-menu"/>
                            </button>
                            <NavLink exact className='navbar-brand' style={{fontWeight: 'bold'}} to='/'>Job portal</NavLink>
                        </div>
                        <div className="collapse navbar-collapse" id="main-navbar">
                            <ul className="navbar-nav mr-auto w-100 justify-content-end">
                                <li className="nav-item">
                                    <NavLink exact className='nav-link' activeClassName='' to='/'>Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact className='nav-link' activeClassName='' to='/jobs'>Jobs</NavLink>
                                </li>
                                {
                                    !isAuthenticated && (
                                        <React.Fragment>
                                            <li className="nav-item">
                                                <NavLink exact className='nav-link' activeClassName='' to='/login'>Login</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink exact className='nav-link' activeClassName='' to='/register'>Register</NavLink>
                                            </li>
                                        </React.Fragment>
                                    )
                                }
                                {
                                    isAuthenticated && user.role === 'employee' && (
                                        <>
                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true"
                                                   aria-expanded="false">
                                                    Candidates
                                                </a>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <NavLink exact className="dropdown-item" activeClassName='' to='/applied-jobs'>Applied
                                                            jobs</NavLink>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true"
                                                   aria-expanded="false">
                                                    {getFullName()}
                                                </a>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <NavLink exact className="dropdown-item" activeClassName='' to='/edit-profile'>Edit
                                                            Profile</NavLink>
                                                    </li>
                                                    <li onClick={handleLogout} style={{cursor: 'pointer'}}>
                                                        <a className='dropdown-item'>Logout</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </>
                                    )
                                }
                                {
                                    isAuthenticated && user.role === "employer" && (
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">
                                                Employers
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <NavLink exact className="dropdown-item" activeClassName=''
                                                             to='/employer/dashboard/'>Dashboard</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink exact className="dropdown-item" activeClassName=''
                                                             to='/employer/applicants/'>Applicants</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink exact className="dropdown-item" activeClassName='' to='/post-job'>Post a
                                                        Job</NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                    )
                                }
                                {
                                    isAuthenticated && user.role === "employer" && (
                                        <li className="nav-item" onClick={handleLogout} style={{cursor: 'pointer'}}>
                                            <a className='nav-link'>Logout</a>
                                        </li>
                                    )
                                }
                                <li className="button-group">
                                    <NavLink className="button btn btn-common" activeClassName='' to='/post-job/'>Post a Job</NavLink>
                                </li>

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true"
                                       aria-expanded="false">
                                        Language
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li style={{cursor: 'pointer'}}>
                                            <a className="dropdown-item" onClick={() => i18n.changeLanguage("en")}>English</a>
                                        </li>
                                        <li style={{cursor: 'pointer'}}>
                                            <a className="dropdown-item" onClick={() => i18n.changeLanguage("bn")}>Bengali</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mobile-menu" data-logo="assets/img/logo-mobile.png"/>
            </nav>
            {
                ['/'].includes(window.location.pathname) ? (
                    <Jumbotron/>
                ) : ''
            }
        </header>
    );
}


export default Header;