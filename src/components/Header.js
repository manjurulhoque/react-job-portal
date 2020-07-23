import React from "react";

export default function Header() {
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
                                <li className="nav-item active">
                                    <a className="nav-link" href="contact.html">
                                        Home
                                    </a>
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

            <div className="container">
                <div className="row space-100">
                    <div className="col-lg-7 col-md-12 col-xs-12">
                        <div className="contents">
                            <h2 className="head-title">Find the <br /> job that fits your life</h2>
                            <p>Aliquam vestibulum cursus felis. In iaculis iaculis sapien ac condimentum. Vestibulum congue posuere lacus, id tincidunt nisi porta sit amet. Suspendisse et sapien varius, pellentesque dui non.</p>
                            <div className="job-search-form">
                                <form>
                                    <div className="row">
                                        <div className="col-lg-5 col-md-5 col-xs-12">
                                            <div className="form-group">
                                                <input className="form-control" type="text" placeholder="Job Title or Company Name" />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-5 col-xs-12">
                                            <div className="form-group">
                                                <div className="search-category-container">
                                                    <label className="styled-select">
                                                        <select>
                                                            <option value="none">Locations</option>
                                                            <option value="none">New York</option>
                                                            <option value="none">California</option>
                                                            <option value="none">Washington</option>
                                                            <option value="none">Birmingham</option>
                                                            <option value="none">Chicago</option>
                                                            <option value="none">Phoenix</option>
                                                        </select>
                                                    </label>
                                                </div>
                                                <i className="lni-map-marker"></i>
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-md-2 col-xs-12">
                                            <button type="submit" className="button"><i className="lni-search"></i></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12 col-xs-12">
                        <div className="intro-img">
                            <img src="assets/img/intro.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
