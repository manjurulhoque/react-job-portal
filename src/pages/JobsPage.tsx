/* eslint-disable */
import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import AxiosConfig from "../AxiosConfig";
import JobItem from "../components/job/JobItem";
import JobItemSkeleton from "../components/skeletons/JobItemSkeleton";
import BaseLayout from "../components/BaseLayout";
import { IJob } from "../interfaces";
import "../assets/css/jobs.css";

const JobsPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [jobs, setJobs] = useState<IJob[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [position, setPosition] = useState(searchParams.get("q") || "");
	const [location, setLocation] = useState(
		searchParams.get("location") || "",
	);
	const [appliedQuery, setAppliedQuery] = useState({
		q: searchParams.get("q") || "",
		location: searchParams.get("location") || "",
	});

	useEffect(() => {
		setLoading(true);
		AxiosConfig.get("jobs/")
			.then((res) => {
				setJobs(res.data || []);
				setError("");
			})
			.catch(() => setError("Failed to load jobs. Please try again."))
			.finally(() => setLoading(false));
	}, []);

	const filteredJobs = useMemo(() => {
		const q = appliedQuery.q.trim().toLowerCase();
		const loc = appliedQuery.location.trim().toLowerCase();

		return jobs.filter((job) => {
			const haystack = [
				job.title,
				job.company_name,
				job.category,
				job.description,
			]
				.filter(Boolean)
				.join(" ")
				.toLowerCase();

			const matchesQuery = !q || haystack.includes(q);
			const matchesLocation =
				!loc || (job.location || "").toLowerCase().includes(loc);

			return matchesQuery && matchesLocation;
		});
	}, [jobs, appliedQuery]);

	const applySearch = (q: string, loc: string) => {
		const next = { q: q.trim(), location: loc.trim() };
		setAppliedQuery(next);

		const params = new URLSearchParams();
		if (next.q) params.set("q", next.q);
		if (next.location) params.set("location", next.location);
		setSearchParams(params, { replace: true });
	};

	const handleSearch = (e: FormEvent) => {
		e.preventDefault();
		applySearch(position, location);
	};

	const handleClear = () => {
		setPosition("");
		setLocation("");
		applySearch("", "");
	};

	const hasFilters = Boolean(
		appliedQuery.q.trim() || appliedQuery.location.trim(),
	);

	return (
		<BaseLayout title={"All jobs"}>
			<section className="jobs-page">
				<div className="container">
					<div className="jobs-page__head">
						<h1>Find your next role</h1>
						<p>
							Browse open positions and filter by title or
							location.
						</p>
					</div>

					<form className="jobs-page__search" onSubmit={handleSearch}>
						<div className="jobs-page__field">
							<label htmlFor="jobs-position">Role</label>
							<input
								id="jobs-position"
								type="text"
								placeholder="Job title or keyword"
								value={position}
								onChange={(e) => setPosition(e.target.value)}
							/>
						</div>
						<div className="jobs-page__field">
							<label htmlFor="jobs-location">Location</label>
							<input
								id="jobs-location"
								type="text"
								placeholder="City or remote"
								value={location}
								onChange={(e) => setLocation(e.target.value)}
							/>
						</div>
						<button type="submit" className="jobs-page__submit">
							Search
						</button>
					</form>

					{!loading && !error && (
						<div className="jobs-page__meta">
							<p className="jobs-page__count">
								{filteredJobs.length}{" "}
								{filteredJobs.length === 1
									? "job found"
									: "jobs found"}
							</p>
							{hasFilters && (
								<button
									type="button"
									className="jobs-page__clear"
									onClick={handleClear}
								>
									Clear filters
								</button>
							)}
						</div>
					)}

					{error && (
						<div className="jobs-page__error" role="alert">
							<h2>Something went wrong</h2>
							<p>{error}</p>
						</div>
					)}

					{loading && (
						<div className="jobs-page__grid">
							{Array(6)
								.fill(0)
								.map((_, index) => (
									<JobItemSkeleton key={index} />
								))}
						</div>
					)}

					{!loading && !error && filteredJobs.length === 0 && (
						<div className="jobs-page__empty">
							<h2>No jobs match your search</h2>
							<p>
								Try a different title or location, or clear the
								filters to see all openings.
							</p>
						</div>
					)}

					{!loading && !error && filteredJobs.length > 0 && (
						<div className="jobs-page__grid">
							{filteredJobs.map((job) => (
								<JobItem job={job} key={job.id} />
							))}
						</div>
					)}
				</div>
			</section>
		</BaseLayout>
	);
};

export default JobsPage;
