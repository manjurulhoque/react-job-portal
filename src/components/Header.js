/* eslint-disable */
import React from "react";
import { NavLink } from 'react-router-dom';
import Jumbotron from "./Jumbotron";


const Header = (props) => {

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
                            <a href="" className="navbar-brand" style={{fontWeight: 'bold'}}>Job portal</a>
                        </div>
                        <div className="collapse navbar-collapse" id="main-navbar">
                            <ul className="navbar-nav mr-auto w-100 justify-content-end">
                                <li className="nav-item">
                                    <NavLink exact={true} activeClassName='active' className='nav-link' to='/'>Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName='active' className='nav-link' to='/jobs'>Jobs</NavLink>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="login.html">Sign In</a>
                                </li>
                                <li className="button-group">
                                    <a href="" className="button btn btn-common">Post a Job</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mobile-menu" data-logo="assets/img/logo-mobile.png"></div>
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