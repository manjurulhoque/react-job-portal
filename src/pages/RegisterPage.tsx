/* eslint-disable */
import React, { useState, useContext } from "react";
import Header from "../components/Header";
import { Helmet } from "react-helmet";
import AxiosConfig from "../AxiosConfig";
import { AuthContext } from "../contexts/AuthContext";
import { NavLink, Redirect } from "react-router-dom";
import swal from 'sweetalert';

const {useToasts} = require("react-toast-notifications");


const RegisterPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [gender, setGender] = useState('');
    const [role, setRole] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const authContext = useContext(AuthContext);
    const {addToast} = useToasts();

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
        evt.preventDefault();
        setSubmitted(true);

        if (!email && !password) {
            alert('All fields are required');
            setSubmitted(false);
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
                // swal("Good job!", "Successfully registered!", "success");
                setSubmitted(false);
                addToast('Registered successfully', {appearance: 'success'});
                if (res.status == 201) setRedirect(true);
            })
            .catch(err => {
                setSubmitted(false);
                addToast('Register failed', {appearance: 'error'});
            });
    }

    if (redirect) {
        return <Redirect to="/login"/>;
    }

    return (
        <React.Fragment>
            <Header/>
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
                                    <div className="form-group">
                                        <div className="input-icon">
                                            <i className="lni-lock"/>
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
                                                <option value="" defaultValue={""}>Select gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-icon">
                                            <select className="form-control" onChange={e => setRole(e.target.value)}>
                                                <option value="" defaultValue={""}>Select role</option>
                                                <option value="employee">Employee</option>
                                                <option value="employer">Employer</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" hidden={submitted} className="btn btn-primary log-btn">
                                        Register
                                    </button>
                                    <button type="submit" hidden={!submitted} className="btn btn-primary log-btn">
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                                        Loading...
                                    </button>
                                </form>
                                <ul className="form-links">
                                    <li className="text-center"><NavLink to='/login'>Already have an account?</NavLink></li>
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