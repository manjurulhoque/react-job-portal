/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import { IJob } from "../../interfaces";

const JobItem = ({job}: { job: IJob }) => {
    const randomIntFromInterval = () => {
        let n = Math.floor(Math.random() * 6 + 1);
        return `assets/img/features/img${n}.png`;
    }

    const get_type = (type: string) => {
        const types: any = {
            "1": "Full Time",
            "2": "Part Time",
            "3": "Internship",
        }
        return types[type];
    }

    const get_class = (type: string) => {
        const class_name: any = {
            "1": "Full Time",
            "2": "Part Time",
            "3": "Internship",
        }[type];

        return class_name.toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    }

    return (
        <div className="col-lg-4 col-md-6 col-xs-12">
            <div className="job-featured">
                <div className="icon">
                    <img src={randomIntFromInterval()} alt=""/>
                </div>
                <div className="content">
                    <h3>
                        <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                    </h3>
                    <p className="brand">{job.company_name}</p>
                    <div className="tags">
                        <span><i className="lni-map-marker"/> {job.location}</span>
                        <br/>
                        <span><i className="lni-user"/>{job.company_name}</span>
                    </div>
                    <span className={get_class(String(job.type))}>{get_type(String(job.type))}</span>
                    <br/>
                    <br/>
                    Tags:
                    {
                        job.job_tags?.map(tag => {
                            return (
                                <span key={tag.id} className="full-time" style={{color: '#fff', backgroundColor: '#000'}}>{tag.name}</span>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default JobItem;
