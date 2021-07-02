/* eslint-disable */
import React, { useContext, useEffect, useState } from "react";
import EmployerSidebarLayout from "../../components/employer-dashboard/EmployerSidebarLayout";
import BaseLayout from "../../components/BaseLayout";
import AxiosConfig from "../../AxiosConfig";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { IJob } from "../../interfaces";
import Loader from "react-loader-spinner";

const DashboardPage = () => {
    const [jobs, setJobs] = useState<IJob[]>([]);
    const authContext = useContext(AuthContext);
    const {token, isAuthenticated} = authContext.state;
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };

        const fetchJobs = async () => {
            try {
                const res = await AxiosConfig.get('employer/dashboard/', config);
                setJobs(res.data);
                setLoading(false);
            } catch (e) {
                setLoading(false);
                console.log(e);
            }
        };

        fetchJobs().then();
    }, []);

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
        <BaseLayout title={'Dashboard'}>
            <EmployerSidebarLayout>
                {
                    loading && (
                        <div className="col-lg-9 col-md-9 col-xs-12">
                            <div className="row">
                                <div className="col-md-6 mx-auto">
                                    <Loader
                                        type="Grid"
                                        color="#00BFFF"
                                        // style={{textAlign: 'center'}}
                                        height={100}
                                        width={100}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    !loading && (
                        <div className="col-lg-9 col-md-9 col-xs-12">
                            <div className="job-alerts-item candidates">
                                <h3 className="alerts-title">Manage Jobs</h3>
                                <div className="alerts-list">
                                    <div className="row">
                                        <div className="col-lg-3 col-md-3 col-xs-12">
                                            <p>Name</p>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-xs-12">
                                            <p>Type</p>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-xs-12">
                                            <p>Tags</p>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-xs-12">
                                            <p>Total candidates</p>
                                        </div>
                                    </div>
                                </div>
                                {
                                    jobs.map(job => {
                                        return (
                                            <React.Fragment key={job.id}>
                                                <div className="alerts-content">
                                                    <div className="row">
                                                        <div className="col-lg-3 col-md-5 col-xs-12">
                                                            <h3>
                                                                <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                                                            </h3>
                                                            <span className="location"><i className="lni-map-marker"/> {job.location}</span>
                                                        </div>
                                                        <div className="col-lg-3 col-md-3 col-xs-12">
                                                            <p><span
                                                                className={get_class(String(job.type))}>{get_type(String(job.type))}</span>
                                                            </p>
                                                        </div>
                                                        <div className="col-lg-3 col-md-2 col-xs-12">
                                                            <div className="can-img">
                                                                {
                                                                    job.job_tags?.map(tag => {
                                                                        return (
                                                                            <span key={tag.id}
                                                                                  style={{color: '#fff', backgroundColor: '#000'}}
                                                                                  className="full-time">{tag.name}</span>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-3 col-md-2 col-xs-12">
                                                            <p>
                                                                <Link to={`/employer/applicants/${job.id}`}>
                                                                    {job.total_candidates} candidates
                                                                </Link>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        )
                                    })
                                }
                                <br/>

                                {/*<ul className="pagination">*/}
                                {/*    <li className="active"><a href="#" className="btn-prev"><i className="lni-angle-left"/> prev</a></li>*/}
                                {/*    <li><a href="#">1</a></li>*/}
                                {/*    <li><a href="#">2</a></li>*/}
                                {/*    <li><a href="#">3</a></li>*/}
                                {/*    <li><a href="#">4</a></li>*/}
                                {/*    <li><a href="#">5</a></li>*/}
                                {/*    <li className="active"><a href="#" className="btn-next">Next <i className="lni-angle-right"/></a></li>*/}
                                {/*</ul>*/}

                            </div>
                        </div>
                    )
                }
            </EmployerSidebarLayout>
        </BaseLayout>
    )
}

export default DashboardPage;