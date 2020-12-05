/* eslint-disable */
import React, { useState, useContext } from "react";
import Header from "components/Header";
import { Helmet } from "react-helmet";
import AxiosConfig from "../AxiosConfig";
import { AuthContext } from "contexts/AuthContext";
import { Redirect, NavLink } from "react-router-dom";
import jwtDecode from 'jwt-decode';

const LoginPage = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const authContext = useContext(AuthContext);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (!email && !password) {
            alert('All fields are required');
            return true;
        }

        const postData = {
            "email": email,
            "password": password
        }

        AxiosConfig.post('login/', postData)
            .then(res => {
                let decoded = jwtDecode(res.data.access);
                authContext.authDispatch({
                    type: authContext.ActionTypes.LOGIN,
                    payload: {
                        user: decoded.user || {},
                        token: res.data.access,
                        refreshToken: res.data.refresh,
                    },
                });
                setRedirect(true);
            })
            .catch(err => console.log(err));
    }

    if (redirect || authContext.state.isAuthenticated) {
        return <Redirect to="/" />;
    }

    return (
        <React.Fragment>
            <Header />
            <Helmet>
                <title>Login</title>
            </Helmet>

            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner-header">
                                <h3>Login</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section id="content" className="section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-6 col-xs-12">
                            <div className="page-login-form box">
                                <form className="login-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <div className="input-icon">
                                            <i className="lni-user"></i>
                                            <input type="email"
                                                id="sender-email"
                                                className="form-control"
                                                name="email"
                                                placeholder="Email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-icon">
                                            <i className="lni-lock"></i>
                                            <input type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" htmlFor="exampleCheck1">Keep Me Signed In</label>
                                    </div>
                                    <button className="btn btn-common log-btn">Submit</button>
                                </form>
                                <ul className="form-links">
                                    <li className="text-center"><NavLink to='/register'>Don't have an account?</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default LoginPage;