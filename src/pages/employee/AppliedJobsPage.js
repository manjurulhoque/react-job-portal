/* eslint-disable */
import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from 'contexts/AuthContext';
import AxiosConfig from 'AxiosConfig';
import Header from 'components/Header';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';


const AppliedJobsPage = () => {

    const [jobs, setJobs] = useState([]);
    const authContext = useContext(AuthContext);
    const {token, isAuthenticated} = authContext.state;
    const {status, setStatus} = useState(0);

    useEffect(() => {
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };

        AxiosConfig.get(`applied-jobs/`, config)
            .then(res => {
                setJobs(res.data);
            })
    }, []);

    const onFilter = (e) => {
        console.log(status);
    }

    return (
        <React.Fragment>
            <Header/>
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
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <select className="form-control" onChange={event => setStatus(event.target.value)}>
                                            <option defaultValue>Select status</option>
                                            <option value="1">Pending</option>
                                            <option value="2">Accepted</option>
                                            <option value="3">Rejected</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <button className="btn btn-success" onClick={onFilter}>Filter</button>
                                    </div>
                                </div>
                            </div>

                            {
                                jobs.map(job => {
                                    return (
                                        <Link className="job-listings" to={`/jobs/${job.id}`} key={job.id}>
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 col-xs-12">
                                                    <div className="job-company-logo">
                                                        <img src="assets/img/features/img1.png" alt=""/>
                                                    </div>
                                                    <div className="job-details">
                                                        <h3>{job.title}</h3>
                                                        <span className="company-neme">
                                                            {job.company_name}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-2 col-md-2 col-xs-12 text-center">
                                                    {
                                                        job.filled && (
                                                            <span className="btn-open">
                                                                Position filled
                                                            </span>
                                                        )
                                                    }
                                                    {
                                                        !job.filled && (
                                                            <span className="btn-open">
                                                                Position open
                                                            </span>
                                                        )
                                                    }
                                                </div>
                                                <div className="col-lg-2 col-md-2 col-xs-12 text-right">
                                                    <div className="location">
                                                        <i className="lni-map-marker"></i> {job.location}
                                                    </div>
                                                </div>
                                                <div className="col-lg-2 col-md-2 col-xs-12 text-right">
                                                    {
                                                        job.type == "1" && (
                                                            <span className="btn-full-time">
                                                                Full Time
                                                            </span>
                                                        )
                                                    }
                                                    {
                                                        job.type == "2" && (
                                                            <span className="btn-full-time">
                                                                Part Time
                                                            </span>
                                                        )
                                                    }
                                                    {
                                                        job.type == "3" && (
                                                            <span className="btn-full-time">
                                                                Internship
                                                            </span>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </Link>
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