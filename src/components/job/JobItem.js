/* eslint-disable */
import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const JobItem = ({ job }) => {
    return (
        <div className="col-lg-4 col-md-6 col-xs-12">
            <div className="job-featured">
                <div className="icon">
                    <img src="assets/img/features/img1.png" alt="" />
                </div>
                <div className="content">
                    <h3>
                        <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                    </h3>
                    <p className="brand">{job.company}</p>
                    <div className="tags">
                        <span><i className="lni-map-marker"/> {job.location}</span>
                        <span><i className="lni-user"/>{job.user.first_name} {job.user.last_name}</span>
                    </div>
                    <span className="full-time">Full Time</span>
                </div>
            </div>
        </div>
    );
};

export default JobItem;
