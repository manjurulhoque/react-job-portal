/* eslint-disable */
import React, { FC } from "react";
import { Link } from "react-router";

const Footer: FC = () => {
	return (
		<footer className="jp-footer">
			<div className="container">
				<div className="jp-footer__grid">
					<div>
						<Link className="jp-footer__brand" to="/">
							<span aria-hidden="true">J</span>
							Job Portal
						</Link>
						<p>
							Find roles that fit your life, or hire people who
							fit your team.
						</p>
					</div>
					<div>
						<h3>Explore</h3>
						<ul>
							<li>
								<Link to="/jobs">Browse jobs</Link>
							</li>
							<li>
								<Link to="/register">Create account</Link>
							</li>
							<li>
								<Link to="/post-job">Post a job</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3>Account</h3>
						<ul>
							<li>
								<Link to="/login">Sign in</Link>
							</li>
							<li>
								<Link to="/edit-profile">Edit profile</Link>
							</li>
							<li>
								<Link to="/applied-jobs">Applied jobs</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="jp-footer__copy">
					© {new Date().getFullYear()} Job Portal
				</div>
			</div>
		</footer>
	);
};

export default Footer;
