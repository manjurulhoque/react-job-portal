/* eslint-disable */
import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const JobItem = ({ job }) => {
    return (
        <tr>
            <td>
                <div className="d-sm-flex">
                    <div className="ml-sm-2 mr-sm-4 py-3">
                        <a
                            className="item item-rounded bg-body-dark text-dark font-size-h2 mb-2 mx-auto"
                            href="#!"
                        >
                            <i className="fab fa-fw fa-facebook"></i>
                        </a>
                        {moment() > moment(job.last_date) ? (
                            "Expired"
                        ) : (
                            <a
                                className="btn btn-sm btn-success btn-block"
                                href="#"
                            >
                                Apply
                            </a>
                        )}
                    </div>
                    <div className="py-3">
                        <Link
                            className="link-fx h4 mb-1 d-inline-block text-dark"
                            to={`/jobs/${job.id}`}
                        >
                            {job.title}
                        </Link>
                        <div className="font-size-sm font-w600 text-muted mb-2">
                            {job.category} - {moment(job.created_at).fromNow()}{" "}
                            <p className="badge badge-info font-w600 mr-1">
                                Full Time
                            </p>
                            <p className="badge badge-danger font-w600">
                                {moment() > moment(job.last_date)
                                    ? "Expired"
                                    : ""}
                            </p>
                        </div>
                        <p className="text-muted mb-2">{job.description}</p>
                        <div>
                            <a
                                className="badge badge-primary font-w600"
                                href="#!"
                            >
                                Web
                            </a>
                            <a
                                className="badge badge-primary font-w600"
                                href="#!"
                            >
                                React
                            </a>
                            <a
                                className="badge badge-primary font-w600"
                                href="#!"
                            >
                                Social
                            </a>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default JobItem;
