/* eslint-disable */
import React, { useState, useContext } from "react";
import Header from "components/Header";
import { Helmet } from "react-helmet";
import AxiosConfig from "../AxiosConfig";
import { AuthContext } from "contexts/AuthContext";
import { Redirect } from "react-router-dom";

const RegisterPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [gender, setGender] = useState('');
    const [role, setRole] = useState('');
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
            "password": password,
            "password2": password2,
            "gender": gender,
            "role": role
        }

        AxiosConfig.post('register/', postData)
            .then(res => {
                authContext.dispatch({
                    type: authContext.ActionTypes.LOGIN,
                    payload: {
                        user: null,
                        token: res.data.access,
                    },
                });
                if(res.status == 200) setRedirect(true);
            })
            .catch(err => console.log(err));
    }

    if (redirect) {
        return <Redirect to="/login" />;
    }

    return (
        <React.Fragment>
            <Header />
            <Helmet>
                <title>Register</title>
            </Helmet>

            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner-header">
                                <h3>Register</h3>
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
                                    <div className="form-group">
                                        <div className="input-icon">
                                            <i className="lni-lock"></i>
                                            <input type="password"
                                                className="form-control"
                                                placeholder="Confirm Password"
                                                value={password2}
                                                onChange={e => setPassword2(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-icon">
                                            <select className="form-control" onChange={e => setGender(e.target.value)}>
                                                <option value="" defaultValue>Select gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-icon">
                                            <select className="form-control" onChange={e => setRole(e.target.value)}>
                                                <option value="" defaultValue>Select role</option>
                                                <option value="emplyoer">Emplyoee</option>
                                                <option value="emplyoer">Emplyoer</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button className="btn btn-common log-btn">Register</button>
                                </form>
                                <ul className="form-links">
                                    <li className="text-center"><a href="register.html">Don't have an account?</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default RegisterPage;