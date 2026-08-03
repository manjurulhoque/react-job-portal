/* eslint-disable */
import React, { FC, useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import "../assets/css/site-chrome.css";

const Header: FC = () => {
	const { i18n } = useTranslation();
	const navigate = useNavigate();
	const location = useLocation();
	const authContext = useContext(AuthContext);
	const { isAuthenticated, user } = authContext.state;
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		setMenuOpen(false);
		setOpenDropdown(null);
	}, [location.pathname]);

	const handleLogout = () => {
		authContext.authDispatch({
			type: authContext.ActionTypes.LOGOUT,
			payload: {},
		});
		setMenuOpen(false);
		navigate("/", { replace: true });
	};

	const getFullName = () => {
		if (!user) return "Account";
		const name = `${user.first_name || ""} ${user.last_name || ""}`.trim();
		return name || user.email || "Account";
	};

	const closeMenu = () => {
		setMenuOpen(false);
		setOpenDropdown(null);
	};

	const toggleDropdown = (key: string) => {
		setOpenDropdown((prev) => (prev === key ? null : key));
	};

	return (
		<header className="jp-header">
			<nav
				className={`jp-nav${scrolled ? " is-scrolled" : ""}`}
				aria-label="Main"
			>
				<div className="container jp-nav__inner">
					<NavLink className="jp-brand" to="/" onClick={closeMenu}>
						<span className="jp-brand__mark" aria-hidden="true">
							J
						</span>
						<span className="jp-brand__text">Job Portal</span>
					</NavLink>

					<button
						type="button"
						className="jp-nav__toggle"
						aria-expanded={menuOpen}
						aria-controls="jp-main-menu"
						aria-label="Toggle navigation"
						onClick={() => setMenuOpen((open) => !open)}
					>
						<span className="jp-nav__toggle-bars" aria-hidden="true">
							<span />
							<span />
							<span />
						</span>
					</button>

					<ul
						id="jp-main-menu"
						className={`jp-nav__menu${menuOpen ? " is-open" : ""}`}
					>
						<li>
							<NavLink
								className="jp-nav__link"
								to="/"
								end
								onClick={closeMenu}
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								className="jp-nav__link"
								to="/jobs"
								onClick={closeMenu}
							>
								Jobs
							</NavLink>
						</li>
						<li>
							<NavLink
								className="jp-nav__link"
								to="/companies"
								onClick={closeMenu}
							>
								Companies
							</NavLink>
						</li>

						{!isAuthenticated && (
							<>
								<li>
									<NavLink
										className="jp-nav__link"
										to="/login"
										onClick={closeMenu}
									>
										Sign in
									</NavLink>
								</li>
								<li>
									<NavLink
										className="jp-nav__cta"
										to="/register"
										onClick={closeMenu}
									>
										Create account
									</NavLink>
								</li>
							</>
						)}

						{isAuthenticated && user?.role === "employee" && (
							<>
								<li
									className={
										openDropdown === "jobs" ? "is-open" : ""
									}
								>
									<button
										type="button"
										className="jp-nav__link"
										aria-expanded={openDropdown === "jobs"}
										onClick={() => toggleDropdown("jobs")}
									>
										My jobs
									</button>
									<ul className="jp-nav__dropdown">
										<li>
											<NavLink
												to="/applied-jobs"
												onClick={closeMenu}
											>
												Applied jobs
											</NavLink>
										</li>
									</ul>
								</li>
								<li
									className={
										openDropdown === "account"
											? "is-open"
											: ""
									}
								>
									<button
										type="button"
										className="jp-nav__link"
										aria-expanded={
											openDropdown === "account"
										}
										onClick={() =>
											toggleDropdown("account")
										}
									>
										{getFullName()}
									</button>
									<ul className="jp-nav__dropdown">
										<li>
											<NavLink
												to="/edit-profile"
												onClick={closeMenu}
											>
												Edit profile
											</NavLink>
										</li>
										<li>
											<button
												type="button"
												onClick={handleLogout}
											>
												Log out
											</button>
										</li>
									</ul>
								</li>
							</>
						)}

						{isAuthenticated && user?.role === "employer" && (
							<>
								<li
									className={
										openDropdown === "employer"
											? "is-open"
											: ""
									}
								>
									<button
										type="button"
										className="jp-nav__link"
										aria-expanded={
											openDropdown === "employer"
										}
										onClick={() =>
											toggleDropdown("employer")
										}
									>
										Employer
									</button>
									<ul className="jp-nav__dropdown">
										<li>
											<NavLink
												to="/employer/dashboard/"
												onClick={closeMenu}
											>
												Dashboard
											</NavLink>
										</li>
										<li>
											<NavLink
												to="/employer/applicants/"
												onClick={closeMenu}
											>
												Applicants
											</NavLink>
										</li>
										<li>
											<button
												type="button"
												onClick={handleLogout}
											>
												Log out
											</button>
										</li>
									</ul>
								</li>
								<li>
									<NavLink
										className="jp-nav__cta"
										to="/post-job/"
										onClick={closeMenu}
									>
										Post a job
									</NavLink>
								</li>
							</>
						)}

						<li
							className={
								openDropdown === "lang" ? "is-open" : ""
							}
						>
							<button
								type="button"
								className="jp-nav__link"
								aria-expanded={openDropdown === "lang"}
								onClick={() => toggleDropdown("lang")}
							>
								Language
							</button>
							<ul className="jp-nav__dropdown">
								<li>
									<button
										type="button"
										onClick={() => {
											i18n.changeLanguage("en");
											closeMenu();
										}}
									>
										English
									</button>
								</li>
								<li>
									<button
										type="button"
										onClick={() => {
											i18n.changeLanguage("bn");
											closeMenu();
										}}
									>
										Bengali
									</button>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default Header;
