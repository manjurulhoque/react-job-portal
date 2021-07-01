/* eslint-disable */
import React, { useState, useEffect, useContext, FC } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AxiosConfig from '../../AxiosConfig';
import Header from '../../components/Header';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const {ClapSpinner} = require("react-spinners-kit");
import styled from "styled-components";
import { IJob } from "../../interfaces";

const LoadingStyle = styled.div`
      h2 {
        display: flex;
        justify-content: center;
        align-items: center;
        vertical-align: center;
        margin-top: 25%;
      }
`;

const AppliedJobsPage: FC = () => {

    const [loading, setLoading] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [filtered_jobs, setFilteredJobs] = useState([]);
    const authContext = useContext(AuthContext);
    const {token, isAuthenticated} = authContext.state;
    const [status, setStatus] = useState("");
    const {t} = useTranslation();

    useEffect(() => {
        (async () => {
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            };

            setLoading(true);
            try {
                const res = await AxiosConfig.get(`applied-jobs/`, config);
                setJobs(res.data);
                setFilteredJobs(res.data);

            } catch (e) {
                console.log(e);
            }

            setLoading(false);
        })();
    }, []);

    const onFilter = (e: React.ChangeEvent<HTMLSelectElement | any>) => {
        setLoading(true);
        if (["1", "2", "3"].includes(status.toString())) {
            let filtered_jobs2 = filtered_jobs.filter((job: any) => job.applicant.status === status);
            setFilteredJobs(filtered_jobs2);
        } else {
            setFilteredJobs(jobs);
        }
        setTimeout(() => setLoading(false), 1000);
    }

    const onClearFilter: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = () => {
        console.log(status);
        setStatus("");
        setFilteredJobs(jobs);
    }

    return (
        <React.Fragment>
            <Header/>
            <Helmet>
                <title>{t('employee:applied-jobs')}</title>
            </Helmet>

            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner-header">
                                <h3>{t('employee:applied-jobs')}</h3>
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
                                            <option defaultValue="">Select status</option>
                                            <option value="1">Pending</option>
                                            <option value="2">Accepted</option>
                                            <option value="3">Rejected</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <button className="btn btn-success" onClick={onFilter}>Filter</button>
                                        <button className="btn btn-primary" onClick={onClearFilter}>Clear Filter</button>
                                    </div>
                                </div>
                            </div>

                            {
                                loading && (
                                    <div className="row">
                                        <div className="col-md-12">
                                            <LoadingStyle>
                                                <h2>
                                                    <ClapSpinner
                                                        size={160}
                                                        color="#686769"
                                                        loading={loading}
                                                    />
                                                </h2>
                                            </LoadingStyle>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                !loading && filtered_jobs.length === 0 && (
                                    <h2>No jobs found</h2>
                                )
                            }
                            {
                                !loading && filtered_jobs.length > 0 && (
                                    filtered_jobs.map((job: IJob) => {
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
                                                            <i className="lni-map-marker"/> {job.location}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 col-md-2 col-xs-12 text-right">
                                                        {
                                                            job.type === "1" && (
                                                                <span className="btn-full-time">
                                                                Full Time
                                                            </span>
                                                            )
                                                        }
                                                        {
                                                            job.type === "2" && (
                                                                <span className="btn-full-time">
                                                                Part Time
                                                            </span>
                                                            )
                                                        }
                                                        {
                                                            job.type === "3" && (
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
                                )
                            }
                        </div>
                    </div>
                </div>
            </section>

        </React.Fragment>
    )
}

export default AppliedJobsPage;