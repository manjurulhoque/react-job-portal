/* eslint-disable */
import React from "react";
import { Link } from "react-router";
import { IJob } from "../../interfaces";

const TYPE_LABELS: Record<string, string> = {
	"1": "Full time",
	"2": "Part time",
	"3": "Internship",
};

const TYPE_CLASS: Record<string, string> = {
	"1": "",
	"2": "is-part",
	"3": "is-intern",
};

const JobItem = ({ job }: { job: IJob }) => {
	const typeKey = String(job.type);
	const typeLabel = job.type_display || TYPE_LABELS[typeKey] || "Job";
	const typeClass = TYPE_CLASS[typeKey] || "";
	const company = job.company?.name || job.company_name || "Company";
	const initials = company
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part.charAt(0).toUpperCase())
		.join("");

	return (
		<Link className="job-card" to={`/jobs/${job.id}`}>
			<div className="job-card__top">
				{job.company?.logo ? (
					<img
						className="job-card__mark"
						src={job.company.logo}
						alt=""
						style={{ objectFit: "cover", padding: 0 }}
					/>
				) : (
					<span className="job-card__mark" aria-hidden="true">
						{initials || "JP"}
					</span>
				)}
				<span className={`job-card__type ${typeClass}`.trim()}>
					{typeLabel}
				</span>
			</div>

			<div>
				<h3 className="job-card__title">{job.title}</h3>
				<p className="job-card__company">
					{job.company?.id ? (
						<span>{company}</span>
					) : (
						company
					)}
				</p>
			</div>

			{job.job_tags && job.job_tags.length > 0 && (
				<div className="job-card__tags">
					{job.job_tags.slice(0, 3).map((tag) => (
						<span className="job-card__tag" key={tag.id}>
							{tag.name}
						</span>
					))}
				</div>
			)}

			<div className="job-card__meta">
				{job.location && (
					<span>
						<i className="lni-map-marker" aria-hidden="true" />
						{job.location}
					</span>
				)}
				{job.workplace_type_display && (
					<span>{job.workplace_type_display}</span>
				)}
				{job.salary != null && Number(job.salary) > 0 && (
					<span>
						<i className="lni-briefcase" aria-hidden="true" />
						{Number(job.salary).toLocaleString()}{" "}
						{job.salary_currency || ""}
					</span>
				)}
			</div>
		</Link>
	);
};

export default JobItem;
