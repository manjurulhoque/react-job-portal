/* eslint-disable */
import { FormEvent, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import AxiosConfig from "../AxiosConfig";
import BaseLayout from "../components/BaseLayout";
import { ICompany, IPaginated } from "../interfaces";
import "../assets/css/companies.css";

const initials = (name: string) =>
	name
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part.charAt(0).toUpperCase())
		.join("");

const CompaniesPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [companies, setCompanies] = useState<ICompany[]>([]);
	const [count, setCount] = useState(0);
	const [next, setNext] = useState<string | null>(null);
	const [previous, setPrevious] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const page = Math.max(1, Number(searchParams.get("page") || 1) || 1);
	const qParam = searchParams.get("q") || "";
	const [q, setQ] = useState(qParam);

	useEffect(() => {
		const controller = new AbortController();
		setLoading(true);
		AxiosConfig.get<IPaginated<ICompany> | ICompany[]>("companies/", {
			params: {
				page,
				...(qParam.trim() ? { q: qParam.trim() } : {}),
			},
			signal: controller.signal,
		})
			.then((res) => {
				const data = res.data;
				if (Array.isArray(data)) {
					setCompanies(data);
					setCount(data.length);
					setNext(null);
					setPrevious(null);
				} else {
					setCompanies(data.results || []);
					setCount(data.count || 0);
					setNext(data.next);
					setPrevious(data.previous);
				}
				setError("");
			})
			.catch((err) => {
				if (err?.code === "ERR_CANCELED") return;
				setError("Failed to load companies.");
				setCompanies([]);
			})
			.finally(() => {
				if (!controller.signal.aborted) setLoading(false);
			});
		return () => controller.abort();
	}, [page, qParam]);

	const handleSearch = (e: FormEvent) => {
		e.preventDefault();
		const params = new URLSearchParams();
		if (q.trim()) params.set("q", q.trim());
		setSearchParams(params, { replace: true });
	};

	const goPage = (delta: number) => {
		const params = new URLSearchParams();
		if (qParam.trim()) params.set("q", qParam.trim());
		const nextPage = page + delta;
		if (nextPage > 1) params.set("page", String(nextPage));
		setSearchParams(params, { replace: true });
	};

	return (
		<BaseLayout title="Companies">
			<section className="companies-page">
				<div className="container">
					<div className="companies-page__head">
						<h1>Companies</h1>
						<p>
							Explore hiring companies and open roles across the
							portal.
						</p>
					</div>

					<form
						className="companies-page__search"
						onSubmit={handleSearch}
					>
						<input
							type="text"
							placeholder="Search companies"
							value={q}
							onChange={(e) => setQ(e.target.value)}
							aria-label="Search companies"
						/>
						<button type="submit">Search</button>
					</form>

					{!loading && !error && (
						<p className="jobs-page__count" style={{ marginBottom: 16 }}>
							{count} {count === 1 ? "company" : "companies"}
						</p>
					)}

					{error && (
						<div className="companies-error" role="alert">
							{error}
						</div>
					)}

					{loading && (
						<div className="companies-page__grid">
							{Array(6)
								.fill(0)
								.map((_, i) => (
									<div className="company-card" key={i}>
										<div className="employer-skel" />
										<div
											className="employer-skel"
											style={{ width: "60%" }}
										/>
									</div>
								))}
						</div>
					)}

					{!loading && !error && companies.length === 0 && (
						<div className="companies-empty">
							No companies found.
						</div>
					)}

					{!loading && !error && companies.length > 0 && (
						<>
							<div className="companies-page__grid">
								{companies.map((company) => (
									<Link
										className="company-card"
										key={company.id}
										to={`/companies/${company.id}`}
									>
										<div className="company-card__top">
											{company.logo ? (
												<img
													className="company-card__logo"
													src={company.logo}
													alt=""
												/>
											) : (
												<span
													className="company-card__mark"
													aria-hidden="true"
												>
													{initials(company.name) ||
														"C"}
												</span>
											)}
											<div>
												<h3 className="company-card__name">
													{company.name}
												</h3>
												{company.tagline && (
													<p className="company-card__tagline">
														{company.tagline}
													</p>
												)}
											</div>
										</div>
										<div className="company-card__meta">
											{company.featured && (
												<span className="company-chip company-chip--featured">
													Featured
												</span>
											)}
											{company.industry && (
												<span className="company-chip">
													{company.industry}
												</span>
											)}
											{(company.size_display ||
												company.headquarters) && (
												<span className="company-chip">
													{company.size_display ||
														company.headquarters}
												</span>
											)}
										</div>
									</Link>
								))}
							</div>

							{(previous || next) && (
								<nav
									className="jobs-page__pagination"
									aria-label="Companies pagination"
								>
									<button
										type="button"
										className="jobs-page__page-btn"
										disabled={!previous}
										onClick={() => goPage(-1)}
									>
										Previous
									</button>
									<span className="jobs-page__page-status">
										Page {page}
									</span>
									<button
										type="button"
										className="jobs-page__page-btn"
										disabled={!next}
										onClick={() => goPage(1)}
									>
										Next
									</button>
								</nav>
							)}
						</>
					)}
				</div>
			</section>
		</BaseLayout>
	);
};

export default CompaniesPage;
