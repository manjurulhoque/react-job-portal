/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import AxiosConfig from "../AxiosConfig";
import Header from "../components/Header";
import JobItem from "../components/job/JobItem";
import { Helmet } from "react-helmet";
import { JobContext } from "../contexts/JobContext";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import JobItemSkeleton from "../components/skeletons/JobItemSkeleton";
import BaseLayout from "../components/BaseLayout";
import { IJob } from "../interfaces";

const JobsPage = () => {
    const [jobs, setJobs] = useState<IJob[]>([]);
    const jobContext = useContext(JobContext);
    const [position, setPosition] = useState("");
    const [location, setLocation] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        // const fetchData = async () => {
        //     await jobContext.jobDispatch({type: jobContext.ActionTypes.ALL_JOBS});
        //     console.log(jobContext.jobState)
        //     setJobs(jobContext.jobState.jobs);
        // };
        //
        // fetchData();
        AxiosConfig.get('jobs/')
            .then(res => {
                setJobs(res.data);
            })
            .catch(err => setError(err));
    }, []);

    const onSearch: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
    }


    return (
        <BaseLayout title={'All jobs'}>
            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner-header">
                                <h3>Find your desired job</h3>
                            </div>
                            <div className="job-search-form bg-cyan job-featured-search">
                                <form>
                                    <div className="row justify-content-center">
                                        <div className="col-lg-5 col-md-5 col-xs-12">
                                            <div className="form-group">
                                                <input className="form-control" type="text" placeholder="Position"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-5 col-xs-12">
                                            <div className="form-group">
                                                <input className="form-control" type="text" placeholder="Location"/>
                                                <i className="lni-map-marker"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-1 col-md-1 col-xs-12">
                                            <button type="button" onClick={onSearch} className="button"><i className="lni-search"/></button>
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
                            jobs.length === 0 &&
                            <>
                                {Array(6)
                                    .fill(0)
                                    .map((_, index) => (
                                        <JobItemSkeleton key={index}/>
                                    ))}
                            </>
                        }
                        {
                            jobs.length && jobs.map(job => {
                                return <JobItem job={job} key={job.id}/>;
                            })
                        }
                    </div>
                </div>
            </section>
        </BaseLayout>
    );
};

export default JobsPage;
