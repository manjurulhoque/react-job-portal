/* eslint-disable */
import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import AxiosConfig from "../AxiosConfig";
import JobItem from "../components/job/JobItem";
import JobItemSkeleton from "../components/skeletons/JobItemSkeleton";
import BaseLayout from "../components/BaseLayout";
import { ICategory, IJob } from "../interfaces";
import "../assets/css/jobs.css";

interface PaginatedJobs {
	count: number;
	next: string | null;
	previous: string | null;
	results: IJob[];
}

const getPageFromUrl = (url: string | null): number | null => {
	if (!url) return null;
	try {
		const parsed = new URL(url, window.location.origin);
		const page = Number(parsed.searchParams.get("page") || "1");
		return Number.isFinite(page) && page > 0 ? page : null;
	} catch {
		return null;
	}
};

const JobsPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [jobs, setJobs] = useState<IJob[]>([]);
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [count, setCount] = useState(0);
	const [next, setNext] = useState<string | null>(null);
	const [previous, setPrevious] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const page = Math.max(1, Number(searchParams.get("page") || 1) || 1);
	const [position, setPosition] = useState(searchParams.get("q") || "");
	const [location, setLocation] = useState(
		searchParams.get("location") || "",
	);
	const [category, setCategory] = useState(
		searchParams.get("category") || "",
	);
	const appliedQuery = {
		q: searchParams.get("q") || "",
		location: searchParams.get("location") || "",
		category: searchParams.get("category") || "",
	};

	useEffect(() => {
		AxiosConfig.get<ICategory[]>("categories/")
			.then((res) => {
				const list = Array.isArray(res.data)
					? res.data
					: (res.data as any).results || [];
				setCategories(list);
			})
			.catch(() => setCategories([]));
	}, []);

	useEffect(() => {
		setPosition(appliedQuery.q);
		setLocation(appliedQuery.location);
		setCategory(appliedQuery.category);
	}, [appliedQuery.q, appliedQuery.location, appliedQuery.category]);

	useEffect(() => {
		const controller = new AbortController();
		setLoading(true);

		const params: Record<string, string | number> = { page };
		if (appliedQuery.q.trim()) params.q = appliedQuery.q.trim();
		if (appliedQuery.location.trim()) {
			params.location = appliedQuery.location.trim();
		}
		if (appliedQuery.category.trim()) {
			params.category = appliedQuery.category.trim();
		}

		AxiosConfig.get<PaginatedJobs>("jobs/", {
			params,
			signal: controller.signal,
		})
			.then((res) => {
				const data = res.data;
				setJobs(data.results || []);
				setCount(data.count || 0);
				setNext(data.next ?? null);
				setPrevious(data.previous ?? null);
				setError("");
			})
			.catch((err) => {
				if (err?.code === "ERR_CANCELED") return;
				setError("Failed to load jobs. Please try again.");
				setJobs([]);
				setCount(0);
				setNext(null);
				setPrevious(null);
			})
			.finally(() => {
				if (!controller.signal.aborted) setLoading(false);
			});

		return () => controller.abort();
	}, [page, appliedQuery.q, appliedQuery.location, appliedQuery.category]);

	const updateParams = (updates: {
		q?: string;
		location?: string;
		category?: string;
		page?: number;
	}) => {
		const params = new URLSearchParams();
		const q = updates.q ?? appliedQuery.q;
		const loc = updates.location ?? appliedQuery.location;
		const cat = updates.category ?? appliedQuery.category;
		const nextPage = updates.page ?? page;

		if (q.trim()) params.set("q", q.trim());
		if (loc.trim()) params.set("location", loc.trim());
		if (cat.trim()) params.set("category", cat.trim());
		if (nextPage > 1) params.set("page", String(nextPage));

		setSearchParams(params, { replace: true });
	};

	const handleSearch = (e: FormEvent) => {
		e.preventDefault();
		updateParams({
			q: position,
			location,
			category,
			page: 1,
		});
	};

	const handleClear = () => {
		setPosition("");
		setLocation("");
		setCategory("");
		updateParams({ q: "", location: "", category: "", page: 1 });
	};

	const goToPage = (target: number | null) => {
		if (!target || target < 1) return;
		updateParams({ page: target });
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const selectedCategory = categories.find(
		(item) =>
			String(item.id) === appliedQuery.category ||
			item.slug === appliedQuery.category,
	);
	const hasFilters = Boolean(
		appliedQuery.q.trim() ||
			appliedQuery.location.trim() ||
			appliedQuery.category.trim(),
	);
	const hasPagination = Boolean(previous || next);
	const prevPage = getPageFromUrl(previous) ?? (previous ? page - 1 : null);
	const nextPage = getPageFromUrl(next) ?? (next ? page + 1 : null);

	return (
		<BaseLayout title={"All jobs"}>
			<section className="jobs-page">
				<div className="container">
					<div className="jobs-page__head">
						<h1>Find your next role</h1>
						<p>
							Browse open positions and filter by title, location,
							or category.
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
						<div className="jobs-page__field">
							<label htmlFor="jobs-category">Category</label>
							<select
								id="jobs-category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							>
								<option value="">All categories</option>
								{categories.map((item) => (
									<option key={item.id} value={item.id}>
										{item.name}
									</option>
								))}
							</select>
						</div>
						<button type="submit" className="jobs-page__submit">
							Search
						</button>
					</form>

					{!loading && !error && (
						<div className="jobs-page__meta">
							<p className="jobs-page__count">
								{count}{" "}
								{count === 1 ? "job found" : "jobs found"}
								{selectedCategory
									? ` in ${selectedCategory.name}`
									: ""}
								{hasPagination ? ` · Page ${page}` : ""}
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

					{!loading && !error && jobs.length === 0 && (
						<div className="jobs-page__empty">
							<h2>No jobs match your search</h2>
							<p>
								Try a different title, location, or category, or
								clear the filters to see all openings.
							</p>
						</div>
					)}

					{!loading && !error && jobs.length > 0 && (
						<>
							<div className="jobs-page__grid">
								{jobs.map((job) => (
									<JobItem job={job} key={job.id} />
								))}
							</div>

							{hasPagination && (
								<nav
									className="jobs-page__pagination"
									aria-label="Jobs pagination"
								>
									<button
										type="button"
										className="jobs-page__page-btn"
										disabled={!previous}
										onClick={() => goToPage(prevPage)}
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
										onClick={() => goToPage(nextPage)}
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

export default JobsPage;
