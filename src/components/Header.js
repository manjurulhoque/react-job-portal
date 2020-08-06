/* eslint-disable */
import React, { useContext, useState } from "react";
import { NavLink, Redirect } from 'react-router-dom';
import Jumbotron from "./Jumbotron";
import { AuthContext } from "contexts/AuthContext";


const Header = () => {

    const [redirect, setRedirect] = useState(false);
    const authContext = useContext(AuthContext);
    const { isAuthenticated, user } = authContext.state;

    const handleLogout = () => {
        authContext.dispatch({
            type: authContext.ActionTypes.LOGOUT,
            payload: {},
        });

        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <header id="home" className="hero-area">

            <nav className="navbar navbar-expand-lg fixed-top scrolling-navbar">
                <div className="container">
                    <div className="theme-header clearfix">
                        <div className="navbar-header">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-navbar" aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                                <span className="lni-menu"></span>
                                <span className="lni-menu"></span>
                                <span className="lni-menu"></span>
                            </button>
                            <a href="" className="navbar-brand" style={{ fontWeight: 'bold' }}>Job portal</a>
                        </div>
                        <div className="collapse navbar-collapse" id="main-navbar">
                            <ul className="navbar-nav mr-auto w-100 justify-content-end">
                                <li className="nav-item">
                                    <NavLink exact={true} activeClassName='active' className='nav-link' to='/'>Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName='active' className='nav-link' to='/jobs'>Jobs</NavLink>
                                </li>
                                {
                                    !isAuthenticated && (
                                        <React.Fragment>
                                            <li className="nav-item">
                                                <NavLink activeClassName='active' className='nav-link' to='/login'>Login</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink activeClassName='active' className='nav-link' to='/register'>Register</NavLink>
                                            </li>
                                        </React.Fragment>
                                    )
                                }
                                {
                                    isAuthenticated && user.role == 'employee' && (
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                Candidates
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <NavLink className="dropdown-item" to='/'>Browse Jobs</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink className="dropdown-item" to='/'>Applied jobs</NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                    )
                                }
                                {
                                    isAuthenticated && user.role == 'employer' && (
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                Employers
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <NavLink className="dropdown-item" to='/post-job'>Post a Job</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink className="dropdown-item" to='/'>Manage Jobs</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink className="dropdown-item" to='/'>Manage Applications</NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                    )
                                }
                                {
                                    isAuthenticated && (
                                        <li className="nav-item" onClick={handleLogout}>
                                            <a className='nav-link'>Logout</a>
                                        </li>
                                    )
                                }
                                <li className="button-group">
                                    <NavLink className="button btn btn-common" to='/post-job'>Post a Job</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mobile-menu" data-logo="assets/img/logo-mobile.png"></div>
            </nav>
            {
                ['/'].includes(window.location.pathname) ? (
                    <Jumbotron />
                ) : ''
            }
        </header>
    );
}


export default Header;