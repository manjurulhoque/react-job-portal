/* eslint-disable */
import React, { useState, useEffect } from "react";
import photo12 from "../assets/photos/photo23@2x.jpg";
import AxiosConfig from "./../AxiosConfig";
import moment from "moment";

const JobDetailsPage = ({ match }) => {
    const [job, setJob] = useState({});

    useEffect(() => {
        AxiosConfig.get(`jobs/${match.params.id}`)
            .then(res => {
                setJob(res.data);
            })
            .catch(err => console.log(err));
    }, [job]);

    return (
        <main id="main-container">
            <div
                className="bg-image"
                style={{ backgroundImage: `url(${photo12})` }}
            >
                <div className="bg-gd-white-op-l">
                    <div className="content content-boxed content-full py-5">
                        <div className="row">
                            <div className="col-md-8 d-flex align-items-center py-3">
                                <div className="w-100 text-center text-md-left">
                                    <h1 className="h2 mb-2">{job.title}</h1>
                                    <h2 className="h4 font-size-sm text-uppercase font-w600 text-muted">
                                        {job.category} -{" "}
                                        {moment(job.created_at).fromNow()}
                                    </h2>
                                    <a className="font-w600" href="#!">
                                        <i className="fab fa-fw fa-leanpub text-dark"></i>{" "}
                                        Company Inc.
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-4 d-flex align-items-center">
                                <a
                                    className="block block-rounded block-link-shadow block-transparent bg-white-75 text-center mb-0 mx-auto"
                                    href="#!"
                                >
                                    <div className="block-content block-content-full px-5 py-4">
                                        <div className="font-size-h2 font-w600 text-black">
                                            {job.salary > 0
                                                ? job.salary + " Tk"
                                                : "Negotiable"}
                                        </div>
                                        <div className="font-size-sm font-w600 text-uppercase text-muted mt-1 push">
                                            Monthly Salary
                                        </div>
                                        <span className="btn btn-hero-success">
                                            <i className="fa fa-arrow-right mr-1"></i>
                                            {moment() > moment(job.last_date)
                                                ? " Expired"
                                                : " Apply Now"}
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content content-boxed">
                <div className="row">
                    <div className="col-md-4 order-md-1">
                        <div className="block block-rounded">
                            <div className="block-header block-header-default">
                                <h3 className="block-title">Job Summary</h3>
                            </div>
                            <div className="block-content">
                                <ul className="fa-ul list-icons">
                                    <li>
                                        <span className="fa-li text-primary">
                                            <i className="fa fa-map-marker-alt"></i>
                                        </span>
                                        <div className="font-w600">
                                            Location
                                        </div>
                                        <div className="text-muted">
                                            {job.location}
                                        </div>
                                    </li>
                                    <li>
                                        <span className="fa-li text-primary">
                                            <i className="fa fa-briefcase"></i>
                                        </span>
                                        <div className="font-w600">
                                            Job Type
                                        </div>
                                        <div className="text-muted">
                                            {job.type == 1 ? "Full Time" : ""}
                                            {job.type == 2 ? "Part Time" : ""}
                                            {job.type == 3 ? "Internship" : ""}
                                        </div>
                                    </li>
                                    <li>
                                        <span className="fa-li text-primary">
                                            <i className="fa fa-money-check-alt"></i>
                                        </span>
                                        <div className="font-w600">Salary</div>
                                        <div className="text-muted">
                                            {job.salary > 0
                                                ? job.salary + " Tk"
                                                : "Negotiable"}
                                        </div>
                                    </li>
                                    <li>
                                        <span className="fa-li text-primary">
                                            <i className="fa fa-clock"></i>
                                        </span>
                                        <div className="font-w600">
                                            Date Posted
                                        </div>
                                        <div className="text-muted">
                                            {moment(job.created_at).fromNow()}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 order-md-0">
                        <div className="block block-rounded">
                            <div className="block-header block-header-default">
                                <h3 className="block-title">Job Description</h3>
                            </div>
                            <div className="block-content">
                                <p>{job.description}</p>
                            </div>
                        </div>
                        <div className="block block-rounded">
                            <div className="block-header block-header-default">
                                <h3 className="block-title">Similar Jobs</h3>
                            </div>
                            <div className="block-content">
                                <div className="row">
                                    <div className="col-md-6">
                                        <a
                                            className="block block-rounded block-bordered block-link-shadow"
                                            href="#!"
                                        >
                                            <div className="block-content block-content-full d-flex align-items-center justify-content-between">
                                                <div className="mr-3">
                                                    <p className="font-size-lg font-w600 mb-0">
                                                        Dribbble
                                                    </p>
                                                    <p className="text-muted mb-0">
                                                        Designer
                                                    </p>
                                                </div>
                                                <div className="item item-rounded bg-body-light">
                                                    <i className="fab fa-dribbble fa-2x text-xsmooth text-primary"></i>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-md-6">
                                        <a
                                            className="block block-rounded block-bordered block-link-shadow"
                                            href="#!"
                                        >
                                            <div className="block-content block-content-full d-flex align-items-center justify-content-between">
                                                <div className="mr-3">
                                                    <p className="font-size-lg font-w600 mb-0">
                                                        Facebook
                                                    </p>
                                                    <p className="text-muted mb-0">
                                                        Developer
                                                    </p>
                                                </div>
                                                <div className="item item-rounded bg-body-light">
                                                    <i className="fab fa-facebook-f fa-2x text-xmodern text-primary"></i>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default JobDetailsPage;
