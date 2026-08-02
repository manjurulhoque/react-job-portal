import React, { FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const Jumbotron: FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [query, setQuery] = useState("");
	const [location, setLocation] = useState("");

	const handleSearch = (e: FormEvent) => {
		e.preventDefault();
		const params = new URLSearchParams();
		if (query.trim()) params.set("q", query.trim());
		if (location.trim()) params.set("location", location.trim());
		const search = params.toString();
		navigate(search ? `/jobs?${search}` : "/jobs");
	};

	return (
		<section className="jp-hero">
			<div className="container">
				<div className="jp-hero__grid">
					<div className="jp-hero__copy">
						<h1>
							{t("welcome.title1")}
							<span>{t("welcome.title2")}</span>
						</h1>
						<p>
							Search open roles, apply in a few steps, and keep
							your profile ready for employers.
						</p>

						<form className="jp-search" onSubmit={handleSearch}>
							<div className="jp-search__field">
								<label htmlFor="hero-query">Role</label>
								<input
									id="hero-query"
									type="text"
									placeholder="Job title or keyword"
									value={query}
									onChange={(e) => setQuery(e.target.value)}
								/>
							</div>
							<div className="jp-search__field">
								<label htmlFor="hero-location">Location</label>
								<input
									id="hero-location"
									type="text"
									placeholder="City or remote"
									value={location}
									onChange={(e) =>
										setLocation(e.target.value)
									}
								/>
							</div>
							<button type="submit" className="jp-search__submit">
								Search jobs
							</button>
						</form>

						<div className="jp-hero__actions">
							<Link className="jp-hero__ghost" to="/register">
								Create account
							</Link>
							<Link className="jp-hero__ghost" to="/post-job">
								Post a job
							</Link>
						</div>
					</div>

					<div className="jp-hero__visual">
						<img
							src="/assets/img/intro.png"
							alt="People exploring job opportunities"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Jumbotron;
