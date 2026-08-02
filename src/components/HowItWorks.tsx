import React, { FC } from "react";

const steps = [
	{
		title: "Create an account",
		body: "Sign up as a job seeker or employer and set your basic profile details.",
	},
	{
		title: "Search open roles",
		body: "Browse categories and listings to find roles that match your skills.",
	},
	{
		title: "Apply with confidence",
		body: "Submit applications, track status, and keep your profile up to date.",
	},
];

const HowItWorks: FC = () => {
	return (
		<section className="jp-section jp-section--soft">
			<div className="container">
				<div className="jp-section__head">
					<h2>How it works</h2>
					<p>
						Three clear steps from signing up to landing your next
						opportunity.
					</p>
				</div>
				<div className="jp-steps">
					{steps.map((step) => (
						<article className="jp-step" key={step.title}>
							<h3>{step.title}</h3>
							<p>{step.body}</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
};

export default HowItWorks;
