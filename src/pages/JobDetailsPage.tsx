/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import AxiosConfig from "../AxiosConfig";
import moment from "moment";
import { Helmet } from "react-helmet";
import { useParams, Redirect, useHistory } from 'react-router-dom';
import Header from "../components/Header";
import { AuthContext } from "../contexts/AuthContext";

import { IJob } from "../interfaces";

const swal = require('sweetalert');

interface Props {

}

const JobDetailsPage = (props: Props) => {
    const [job, setJob] = useState<IJob>(Object);
    const [isApplied, setIsApplied] = useState(false);
    let {id} = useParams<{ id: string | undefined }>();
    const authContext = useContext(AuthContext);
    const {token, isAuthenticated} = authContext.state;
    let history = useHistory();

    useEffect(() => {
        getJobDetails().then();
    }, []);

    const getJobDetails = async () => {
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };

        const {data} = await AxiosConfig.get(`jobs/${id}/`).then(res => res);

        setJob(data);

        if (isAuthenticated) {
            const {data} = await AxiosConfig.get(`applied-for-job/${id}/`, config).then(res => res);

            setIsApplied(data.is_applied);
        }
    }

    const applyJobHandle: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };
        if (isAuthenticated) {
            swal({
                title: "Are you sure?",
                text: "Once applied, you will not be able to remove it!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((apply: boolean) => {
                    if (apply) {

                        AxiosConfig.post(`apply-job/${id}/`, {'job': id}, config)
                            .then(res => {
                                setIsApplied(true);
                                swal("Successfully applied for this position", {
                                    icon: "success",
                                });
                            })
                            .then(err => {
                                swal(err, {
                                    icon: "error",
                                });
                            })
                    }
                });
        } else {
            history.push('/login');
        }
    }

    return (
        <React.Fragment>
            <Header/>
            <Helmet>
                <title>Job details</title>
            </Helmet>

            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-6 col-xs-12">
                            <div className="breadcrumb-wrapper">
                                <div className="img-wrapper">
                                    <img src="/assets/img/about/company-logo.png" alt=""/>
                                </div>
                                <div className="content">
                                    <h3 className="product-title">{job.title}</h3>
                                    <p className="brand">{job.company_name}</p>
                                    <div className="tags">
                                        <span><i className="lni-map-marker"/> {job.location}</span>
                                        <span><i className="lni-calendar"/> Posted {moment(job.created_at).format('MM-DD-YY')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div className="month-price">
                                <span className="year">Monthly</span>
                                <div className="price">{job.salary} Tk</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <section className="job-detail section">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-8 col-md-12 col-xs-12">
                            <div className="content-area">
                                <h4>Job Description</h4>
                                <p>{job.description}</p>
                                {/* <h5>What You Need for this Position</h5>
                                <ul>
                                    <li>- Objective-C</li>
                                    <li>- iOS SDK</li>
                                    <li>- XCode</li>
                                    <li>- Cocoa</li>
                                    <li>- ClojureScript</li>
                                </ul> */}
                                {
                                    !isApplied &&
                                    (
                                        <>
                                            <h5>How To Apply</h5>
                                            <p>Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor,
                                                nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh
                                                vulputate cursus a sit amet mauris.</p>
                                            <button onClick={applyJobHandle} className="btn btn-common">Apply job</button>
                                        </>
                                    )
                                }
                                {
                                    isApplied &&
                                    (
                                        <a href="#!" className="btn btn-primary">Already applied</a>
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-xs-12">
                            <div className="sideber">
                                <div className="widghet">
                                    <h3>Job Location</h3>
                                    <div className="maps">
                                        <div id="map" className="map-full">
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d405691.57240383344!2d-122.3212843181106!3d37.40247298383319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb68ad0cfc739%3A0x7eb356b66bd4b50e!2sSilicon+Valley%2C+CA%2C+USA!5e0!3m2!1sen!2sbd!4v1538319316724"
                                                allowFullScreen={true}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="widghet">
                                    <h3>Share This Job</h3>
                                    <div className="share-job">
                                        <form method="post" className="subscribe-form">
                                            <div className="form-group">
                                                <input type="email" name="Email" className="form-control"
                                                       placeholder={window.location.href} required={true}/>
                                                <button type="submit" name="subscribe" className="btn btn-common sub-btn">
                                                    <i className="lni-files"/>
                                                </button>
                                                <div className="clearfix"/>
                                            </div>
                                        </form>
                                        <ul className="mt-4 footer-social">
                                            <li><a className="facebook" href="#"><i className="lni-facebook-filled"/></a></li>
                                            <li><a className="twitter" href="#"><i className="lni-twitter-filled"/></a></li>
                                            <li><a className="linkedin" href="#"><i className="lni-linkedin-fill"/></a></li>
                                            <li><a className="google-plus" href="#"><i className="lni-google-plus"/></a></li>
                                        </ul>
                                        <div className="meta-tag">
                                            <span className="meta-part"><a href="#"><i className="lni-star"/> Write a
                                            Review</a></span>
                                            <span className="meta-part"><a href="#"><i className="lni-warning"/> Reports</a></span>
                                            <span className="meta-part"><a href="#"><i className="lni-share"/> Share</a></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section id="featured" className="section bg-gray pb-45">
                <div className="container">
                    <h4 className="small-title text-left">Similar Jobs</h4>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div className="job-featured">
                                <div className="icon">
                                    <img src="assets/img/features/img1.png" alt=""/>
                                </div>
                                <div className="content">
                                    <h3><a href="job-page.html">Software Engineer</a></h3>
                                    <p className="brand">MizTech</p>
                                    <div className="tags">
                                        <span><i className="lni-map-marker"/> New York</span>
                                        <span><i className="lni-user"/>John Smith</span>
                                    </div>
                                    <span className="full-time">Full Time</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div className="job-featured">
                                <div className="icon">
                                    <img src="assets/img/features/img2.png" alt=""/>
                                </div>
                                <div className="content">
                                    <h3><a href="job-page.html">Graphic Designer</a></h3>
                                    <p className="brand">Hunter Inc.</p>
                                    <div className="tags">
                                        <span><i className="lni-map-marker"/> New York</span>
                                        <span><i className="lni-user"/>John Smith</span>
                                    </div>
                                    <span className="part-time">Part Time</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div className="job-featured">
                                <div className="icon">
                                    <img src="assets/img/features/img3.png" alt=""/>
                                </div>
                                <div className="content">
                                    <h3><a href="job-page.html">Managing Director</a></h3>
                                    <p className="brand">MagNews</p>
                                    <div className="tags">
                                        <span><i className="lni-map-marker"/> New York</span>
                                        <span><i className="lni-user"/>John Smith</span>
                                    </div>
                                    <span className="full-time">Full Time</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default JobDetailsPage;
