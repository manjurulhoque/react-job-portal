/* eslint-disable */
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../contexts/AuthContext";
import AxiosConfig from "../../AxiosConfig";
import EmployerSidebarLayout from "../../components/employer-dashboard/EmployerSidebarLayout";
import BaseLayout from "../../components/BaseLayout";
import Loader from "react-loader-spinner";
import {Link} from "react-router-dom";
import * as moment from "moment";
import {useParams} from "react-router";

const ApplicantsPerJobPage = ({ match }) => {
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const authContext = useContext(AuthContext);
    const {token, isAuthenticated} = authContext.state;
    // const params = useParams();

    useEffect(() => {
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };

        let job_id = match.params.job_id;

        const fetchApplicants = async () => {
            try {
                const res = await AxiosConfig.get(`/employer/applicants/${job_id}/`, config);
                setApplicants(res.data);
                setLoading(false);
            } catch (e) {
                setLoading(false);
                console.log(e);
            }
        };

        fetchApplicants();
    }, []);

    const getFullname = user => `${user.first_name} ${user.last_name}`

    const onUpdateApplicant = (applicant) => {

    }

    return (
        <BaseLayout title={'Applicants Per Job'}>
            <EmployerSidebarLayout title={'Applicants Per Job'}>
                {
                    loading && (
                        <div className="col-lg-9 col-md-9 col-xs-12">
                            <div className="row">
                                <div className="col-md-6 mx-auto">
                                    <Loader
                                        type="Grid"
                                        color="#00BFFF"
                                        style={{textAlign: 'center'}}
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
                                <h3 className="alerts-title">Manage Applicants for the job</h3>
                                <div className="alerts-list">
                                    <div className="row">
                                        <div className="col-lg-3 col-md-3 col-xs-12">
                                            <p>Name</p>
                                        </div>
                                        <div className="col-lg-3 col-md-5 col-xs-12">
                                            <p>Job title</p>
                                        </div>
                                        <div className="col-lg-2 col-md-2 col-xs-12">
                                            <p>Status</p>
                                        </div>
                                        <div className="col-lg-2 col-md-2 col-xs-12">
                                            <p>Applied at</p>
                                        </div>
                                        <div className="col-lg-2 col-md-2 col-xs-12">
                                            <p>Actions</p>
                                        </div>
                                    </div>
                                </div>
                                {
                                    applicants.map(applicant => {
                                        return (
                                            <React.Fragment key={applicant.id}>
                                                <div className="alerts-content">
                                                    <div className="row">
                                                        <div className="col-lg-3 col-md-3 col-xs-12">
                                                            <h3>
                                                                <Link to={`/jobs/${applicant.job.id}`}>{getFullname(applicant.applied_user)}</Link>
                                                            </h3>
                                                        </div>
                                                        <div className="col-lg-3 col-md-3 col-xs-12">
                                                            <h3>
                                                                <Link to={`/jobs/${applicant.job.id}`}>{applicant.job.title}</Link>
                                                            </h3>
                                                            <span className="location"><i className="lni-map-marker"/> {applicant.job.location}</span>
                                                        </div>
                                                        <div className="col-lg-2 col-md-2 col-xs-12">
                                                            <p>{applicant.status}</p>
                                                        </div>
                                                        <div className="col-lg-2 col-md-2 col-xs-12">
                                                            <p>{moment(applicant.created_at).format('DD-MM-YYYY hh:mm:ss A')}</p>
                                                        </div>
                                                        <div className="col-lg-2 col-md-2 col-xs-12">
                                                            {
                                                                applicant.status === 'Pending' && (
                                                                    <>
                                                                        <button onClick={onUpdateApplicant(applicant, "accept")} className="btn btn-primary btn-xs mr-2">
                                                                            <i className="fa fa-check" aria-hidden="true"/>
                                                                        </button>
                                                                        <button onClick={onUpdateApplicant(applicant, "reject")} className="btn btn-danger btn-xs">
                                                                            <i className="fa fa-window-close" aria-hidden="true"/>
                                                                        </button>
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                }
            </EmployerSidebarLayout>
        </BaseLayout>
    )
};

export default ApplicantsPerJobPage;


