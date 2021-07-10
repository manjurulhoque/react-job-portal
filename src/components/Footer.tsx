/* eslint-disable */
import React, { FC } from 'react';

const Footer: FC = () => {
    return (
        <footer>
            <section className="footer-Content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-xs-12">
                            <div className="widget">
                                <div className="footer-logo">React job portal</div>
                                <div className="textwidget">
                                    <p>React job portal with django backend</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-4 col-xs-12">
                            <div className="widget">
                                <h3 className="block-title">Quick Links</h3>
                                <ul className="menu">
                                    <li><a href="#">About Us</a></li>
                                    <li><a href="#">Support</a></li>
                                    <li><a href="#">Contact</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-xs-12">
                            <div className="widget">
                                <ul className="mt-3 footer-social">
                                    <li><a className="facebook" href="#"><i className="lni-facebook-filled"/></a></li>
                                    <li><a className="twitter" href="#"><i className="lni-twitter-filled"/></a></li>
                                    <li><a className="linkedin" href="#"><i className="lni-linkedin-fill"/></a></li>
                                    <li><a className="google-plus" href="#"><i className="lni-google-plus"/></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    );
}

export default Footer;