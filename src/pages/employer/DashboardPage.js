/* eslint-disable */
import React from "react";
import EmployerSidebarLayout from "../../components/employer-dashboard/EmployerSidebarLayout";
import BaseLayout from "../../components/BaseLayout";

const DashboardPage = () => {
    return (
        <BaseLayout title={'Dashboard'}>
            <EmployerSidebarLayout>
                <div className="col-lg-8 col-md-8 col-xs-12">
                    <div className="job-alerts-item candidates">
                        <h3 className="alerts-title">Manage Jobs</h3>
                        <div className="alerts-list">
                            <div className="row">
                                <div className="col-lg-3 col-md-3 col-xs-12">
                                    <p>Name</p>
                                </div>
                                <div className="col-lg-3 col-md-3 col-xs-12">
                                    <p>Keywords</p>
                                </div>
                                <div className="col-lg-3 col-md-3 col-xs-12">
                                    <p>Candidates</p>
                                </div>
                                <div className="col-lg-3 col-md-3 col-xs-12">
                                    <p>Featured</p>
                                </div>
                            </div>
                        </div>
                        <div className="alerts-content">
                            <div className="row">
                                <div className="col-lg-3 col-md-5 col-xs-12">
                                    <h3>Web Designer</h3>
                                    <span className="location"><i className="lni-map-marker"/> Manhattan, NYC</span>
                                </div>
                                <div className="col-lg-3 col-md-3 col-xs-12">
                                    <p><span className="full-time">Full-Time</span></p>
                                </div>
                                <div className="col-lg-3 col-md-2 col-xs-12">
                                    <div className="can-img"><a href="#"><img src="assets/img/jobs/candidates.png" alt=""/></a></div>
                                </div>
                                <div className="col-lg-3 col-md-2 col-xs-12">
                                    <p><i className="lni-star"/></p>
                                </div>
                            </div>
                        </div>
                        <br/>

                        <ul className="pagination">
                            <li className="active"><a href="#" className="btn-prev"><i className="lni-angle-left"/> prev</a></li>
                            <li><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">5</a></li>
                            <li className="active"><a href="#" className="btn-next">Next <i className="lni-angle-right"/></a></li>
                        </ul>

                    </div>
                </div>
            </EmployerSidebarLayout>
        </BaseLayout>
    )
}

export default DashboardPage;