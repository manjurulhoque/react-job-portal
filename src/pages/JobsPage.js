/* eslint-disable */
import React, { useState, useEffect } from "react";
import AxiosConfig from "../AxiosConfig";
import Header from "components/Header";
import JobItem from "components/job/JobItem";

const JobsPage = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        AxiosConfig.get('jobs')
            .then(res => {
                setJobs(res.data);
            })
            .catch(err => console.log(err));
    }, []);


    return (
        <React.Fragment>
            <Header />
            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner-header">
                                <h3>Find Job</h3>
                            </div>
                            <div className="job-search-form bg-cyan job-featured-search">
                                <form>
                                    <div className="row justify-content-center">
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
                                        <div className="col-lg-1 col-md-1 col-xs-12">
                                            <button type="submit" className="button"><i className="lni-search"></i></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <section id="featured" className="section bg-cyan">
                <div className="container">
                    <div className="row">
                        {
                            jobs.map(job => {
                                return <JobItem job={job} key={job.id}/>;
                            })
                        }
                    </div>
                </div>
            </section>


            <section id="job-listings" className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-xs-12">
                            <a className="job-listings" href="job-details.html">
                                <div className="row">
                                    <div className="col-lg-4 col-md-4 col-xs-12">
                                        <div className="job-company-logo">
                                            <img src="assets/img/features/img1.png" alt="" />
                                        </div>
                                        <div className="job-details">
                                            <h3>App Developer</h3>
                                            <span className="company-neme">
                                                AmazeSoft
                                    </span>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-xs-12 text-center">
                                        <span className="btn-open">
                                            7 Open Jobs
                                </span>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-xs-12 text-right">
                                        <div className="location">
                                            <i className="lni-map-marker"></i> New Yourk, US
                                </div>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-xs-12 text-right">
                                        <span className="btn-full-time">Full Time</span>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-xs-12 text-right">
                                        <span className="btn-apply">Apply Now</span>
                                    </div>
                                </div>
                            </a>
                            <a className="job-listings" href="job-details.html">
                                <div className="row">
                                    <div className="col-lg-4 col-md-4 col-xs-12">
                                        <div className="job-company-logo">
                                            <img src="assets/img/features/img2.png" alt="" />
                                        </div>
                                        <div className="job-details">
                                            <h3>App Developer</h3>
                                            <span className="company-neme">
                                                AmazeSoft
                                    </span>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-xs-12 text-center">
                                        <span className="btn-open">
                                            7 Open Jobs
                                </span>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-xs-12 text-right">
                                        <div className="location">
                                            <i className="lni-map-marker"></i> New Yourk, US
                                </div>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-xs-12 text-right">
                                        <span className="btn-full-time">Full Time</span>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-xs-12 text-right">
                                        <span className="btn-apply">Apply Now</span>
                                    </div>
                                </div>
                            </a>
                            <a className="job-listings" href="job-details.html">
                                <div className="row">
                                    <div className="col-lg-4 col-md-4 col-xs-12">
                                        <div className="job-company-logo">
                                            <img src="assets/img/features/img3.png" alt="" />
                                        </div>
                                        <div className="job-details">
                                            <h3>App Developer</h3>
                                            <span className="company-neme">
                                                AmazeSoft
                                    </span>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-xs-12 text-center">
                                        <span className="btn-open">
                                            7 Open Jobs
                                </span>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-xs-12 text-right">
                                        <div className="location">
                                            <i className="lni-map-marker"></i> New Yourk, US
                                </div>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-xs-12 text-right">
                                        <span className="btn-full-time">Full Time</span>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-xs-12 text-right">
                                        <span className="btn-apply">Apply Now</span>
                                    </div>
                                </div>
                            </a>
                            <a className="job-listings" href="job-details.html">
                                <div className="row">
                                    <div className="col-lg-4 col-md-4 col-xs-12">
                                        <div className="job-company-logo">
                                            <img src="assets/img/features/img4.png" alt="" />
                                        </div>
                                        <div className="job-details">
                                            <h3>App Developer</h3>
                                            <span className="company-neme">
                                                AmazeSoft
                                    </span>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-xs-12 text-center">
                                        <span className="btn-open">
                                            7 Open Jobs
                                </span>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-xs-12 text-right">
                                        <div className="location">
                                            <i className="lni-map-marker"></i> New Yourk, US
                                </div>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-xs-12 text-right">
                                        <span className="btn-full-time">Full Time</span>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-xs-12 text-right">
                                        <span className="btn-apply">Apply Now</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default JobsPage;
