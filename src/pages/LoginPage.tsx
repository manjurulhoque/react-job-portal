/* eslint-disable */
import React, { useState, useContext, useRef, useEffect, FC } from "react";
import Header from "../components/Header";
import { Helmet } from "react-helmet";
import AxiosConfig from "../AxiosConfig";
import { AuthContext } from "../contexts/AuthContext";
import { Redirect, NavLink, RouteComponentProps } from "react-router-dom";
import jwtDecode, { JwtPayload } from 'jwt-decode';

import GoogleSocialAuth from "../components/social/GoogleSocialAuth";
import FacebookSocialAuth from "../components/social/FacebookSocialAuth";

const {useToasts} = require('react-toast-notifications');

interface IJwtPayload extends JwtPayload {
    user: any
}

const LoginPage: FC<RouteComponentProps> = ({history, location}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const authContext = useContext(AuthContext);
    const {addToast} = useToasts();
    const _isMounted = useRef(true);

    useEffect(() => {
        return () => { // ComponentWillUnmount in Class Component
            _isMounted.current = false;
        }
    }, []);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
        evt.preventDefault();
        setSubmitted(true);

        if (!email && !password) {
            setSubmitted(false);
            alert('All fields are required');
            return true;
        }

        const postData = {
            "email": email,
            "password": password
        }

        const loginUser = async () => {
            try {
                const res = await AxiosConfig.post('login/', postData);
                let decoded = jwtDecode<IJwtPayload>(res.data.access);
                authContext.authDispatch({
                    type: authContext.ActionTypes.LOGIN,
                    payload: {
                        user: decoded.user || {},
                        token: res.data.access,
                        refreshToken: res.data.refresh,
                    },
                });
                addToast('Logged in successfully', {appearance: 'success', autoDismiss: true,});
                setSubmitted(false);
                if (_isMounted.current) {
                    history.push('/');
                } else {
                    _isMounted.current = false
                }
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    console.log(err.response);
                    addToast('Login failed', {appearance: 'error', autoDismiss: true,});
                }
                setSubmitted(false);
            }
        }

        loginUser().then();
    }

    if (redirect || authContext.state.isAuthenticated) {
        return <Redirect to="/"/>;
    }
    return (
        <React.Fragment>
            <Header/>
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
                                            <i className="lni-user"/>
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
                                            <i className="lni-lock"/>
                                            <input type="password"
                                                   className="form-control"
                                                   placeholder="Password"
                                                   value={password}
                                                   onChange={e => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                        <label className="form-check-label" htmlFor="exampleCheck1">Keep Me Signed In</label>
                                    </div>
                                    <button type="submit" hidden={submitted} className="btn btn-primary log-btn">
                                        Login
                                    </button>
                                    <button type="submit" hidden={!submitted} className="btn btn-primary log-btn">
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                                        Loading...
                                    </button>
                                </form>
                                <ul className="form-links">
                                    <li className="text-center"><NavLink to='/register'>Don't have an account?</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center my-2">
                        <div className="col-md-4">
                            <FacebookSocialAuth/>
                        </div>
                        <div className="col-md-4">
                            <GoogleSocialAuth/>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default LoginPage;