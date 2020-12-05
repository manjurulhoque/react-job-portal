/* eslint-disable */
import React, {useContext, useEffect, useState} from "react";
import Header from "../../components/Header";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {AuthContext} from "../../contexts/AuthContext";
import AxiosConfig from "../../AxiosConfig";
import jwtDecode from 'jwt-decode';

const EditProfilePage = () => {
    const {t} = useTranslation();
    const [gender, setGender] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const authContext = useContext(AuthContext);
    const {isAuthenticated, user, token, refreshToken} = authContext.state;

    useEffect(() => {
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setGender(user.gender);
    }, [user.first_name, user.last_name, user.gender]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!first_name && !last_name && !gender) {
            alert('All fields are required');
            return true;
        }

        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };

        const data = {
            first_name,
            last_name,
            gender
        };

        AxiosConfig.put(`employee/profile/`, data, config)
            .then(res => {
                console.log(res);
                const refresh_data = {
                    "refresh": refreshToken
                };
                AxiosConfig.post(`token/refresh/`, refresh_data)
                    .then(response => {
                        let decoded = jwtDecode(response.data.access);
                        console.log(decoded);
                        authContext.authDispatch({
                            type: authContext.ActionTypes.LOGIN,
                            payload: {
                                user: {
                                    first_name,
                                    last_name,
                                    gender
                                },
                                token: response.data.access,
                                refreshToken: response.data.refresh
                            },
                        });
                    });
            })
            .catch(err => console.log(err))
    }

    return (
        <React.Fragment>
            <Header/>
            <Helmet>
                <title>{t('employee:edit-profile')}</title>
            </Helmet>

            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner-header">
                                <h3>{t('employee:edit-profile')}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section id="job-listings" className="section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-6 col-xs-12">
                            <div className="page-login-form box">
                                <form className="login-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <div className="input-icon">
                                            <input type="text"
                                                   className="form-control"
                                                   name="first_name"
                                                   placeholder="First name"
                                                   value={first_name}
                                                   onChange={e => setFirstName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-icon">
                                            <input type="text"
                                                   className="form-control"
                                                   name="last_name"
                                                   placeholder="Last name"
                                                   value={last_name}
                                                   onChange={e => setLastName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-icon">
                                            <select className="form-control" onChange={e => setGender(e.target.value)} value={gender}>
                                                <option value="">Select gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary log-btn">Update profile</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default EditProfilePage;