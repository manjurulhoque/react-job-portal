/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import AxiosConfig from 'AxiosConfig';
import Header from 'components/Header';
import { Helmet } from 'react-helmet';


const AppliedJobsPage = () => {

    const [jobs, setJobs] = useState([]);
    const authContext = useContext(AuthContext);
    const { token, isAuthenticated } = authContext.state;

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        AxiosConfig.get(`applied-jobs`, config)
            .then(res => {
                setJobs(res.data);
            })
    }, []);

    return (
        <React.Fragment>
            <Header />
            <Helmet>
                <title>Applied jobs</title>
            </Helmet>

            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner-header">
                                <h3>Applied Jobs</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section id="job-listings" className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-xs-12">
                            {
                                jobs.map(job => {
                                    return (
                                        <a className="job-listings" href="">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 col-xs-12">
                                                    <div className="job-company-logo">
                                                        <img src="assets/img/features/img1.png" alt="" />
                                                    </div>
                                                    <div className="job-details">
                                                        <h3>{job.title}</h3>
                                                        <span className="company-neme">
                                                            {job.company_name}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-2 col-md-2 col-xs-12 text-center">
                                                    <span className="btn-open">
                                                        0 Open Jobs
                                                    </span>
                                                </div>
                                                <div className="col-lg-2 col-md-2 col-xs-12 text-right">
                                                    <div className="location">
                                                        <i className="lni-map-marker"></i> {job.location}
                                                    </div>
                                                </div>
                                                <div className="col-lg-2 col-md-2 col-xs-12 text-right">
                                                    <span className="btn-full-time">Full Time</span>
                                                </div>
                                            </div>
                                        </a>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>

        </React.Fragment>
    )
}

export default AppliedJobsPage;