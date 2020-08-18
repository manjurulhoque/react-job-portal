/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import AxiosConfig from "../AxiosConfig";
import Header from "components/Header";
import JobItem from "components/job/JobItem";
import { Helmet } from "react-helmet";
import { JobContext } from "contexts/JobContext";

const JobsPage = () => {
    const [jobs, setJobs] = useState([]);
    // const jobContext = useContext(JobContext);

    useEffect(() => {
        // jobContext.jobDispatch({type: jobContext.ActionTypes.ALL_JOBS});
        // console.log(jobContext);
        // setJobs(jobContext.jobState.jobs);
        AxiosConfig.get('jobs')
            .then(res => {
                setJobs(res.data);
            })
            .catch(err => console.log(err));
    }, []);


    return (
        <React.Fragment>
            <Header />
            <Helmet>
                <title>All jobs</title>
            </Helmet>

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
        </React.Fragment>
    );
};

export default JobsPage;
