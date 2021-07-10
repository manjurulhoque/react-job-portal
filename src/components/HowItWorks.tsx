import React, { FC } from "react";

const HowItWorks: FC = () => {
    return (
        <section className="how-it-works section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">How It Works?</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ellentesque dignissim quam et <br/> metus
                        effici turac fringilla lorem facilisis.</p>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div className="work-process">
                        <span className="process-icon">
                            <i className="lni-user"/>
                        </span>
                            <h4>Create an Account</h4>
                            <p>Post a job to tell us about your project. We'll quickly match you with the right freelancers
                                find place best.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div className="work-process step-2">
                        <span className="process-icon">
                            <i className="lni-search"/>
                        </span>
                            <h4>Search Jobs</h4>
                            <p>Post a job to tell us about your project. We'll quickly match you with the right freelancers
                                find place best.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div className="work-process step-3">
                        <span className="process-icon">
                            <i className="lni-cup"/>
                        </span>
                            <h4>Apply</h4>
                            <p>Post a job to tell us about your project. We'll quickly match you with the right freelancers
                                find place best.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;