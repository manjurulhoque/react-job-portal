/* eslint-disable */
import React, { useState, useContext, useRef, useEffect, FC } from "react";
import Header from "../components/Header";
import { Helmet } from "react-helmet-async";
import AxiosConfig from "../AxiosConfig";
import { AuthContext } from "../contexts/AuthContext";
import { NavLink, Navigate, useNavigate } from "react-router";
import { jwtDecode, JwtPayload } from "jwt-decode";
import toast from "react-hot-toast";

import "../assets/css/auth.css";

interface IJwtPayload extends JwtPayload {
	user: any;
}

const LoginPage: FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();
	const _isMounted = useRef(true);

	useEffect(() => {
		return () => {
			// ComponentWillUnmount in Class Component
			_isMounted.current = false;
		};
	}, []);

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
		evt.preventDefault();
		setSubmitted(true);

		if (!email && !password) {
			setSubmitted(false);
			alert("All fields are required");
			return true;
		}

		const postData = {
			email: email,
			password: password,
		};

		const loginUser = async () => {
			try {
				const res = await AxiosConfig.post("login/", postData);
				let decoded = jwtDecode<IJwtPayload>(res.data.access);
				authContext.authDispatch({
					type: authContext.ActionTypes.LOGIN,
					payload: {
						user: decoded.user || {},
						token: res.data.access,
						refreshToken: res.data.refresh,
					},
				});
				toast.success("Logged in successfully");
				setSubmitted(false);
				if (_isMounted.current) {
					navigate("/");
				}
			} catch (err: any) {
				if (err.response && err.response.status === 401) {
					console.log(err.response);
					toast.error("Login failed");
				}
				setSubmitted(false);
			}
		};

		loginUser().then();
	};

	if (authContext.state.isAuthenticated) {
		return <Navigate to="/" replace />;
	}
	return (
		<React.Fragment>
			<Header />
			<Helmet>
				<title>Login</title>
			</Helmet>

			<div className="auth-page">
				<div className="auth-card">
					<div className="auth-brand">
						<span className="auth-logo">J</span>
						<span className="auth-logo-text">Job Portal</span>
					</div>
					<h2 className="auth-title">Welcome back</h2>
					<p className="auth-subtitle">
						Sign in to continue to your account
					</p>

					<div className="auth-social">
						{/* <FacebookSocialAuth />
						<GoogleSocialAuth /> */}
					</div>

					<div className="auth-divider">Sign in with email</div>

					<form className="auth-form" onSubmit={handleSubmit}>
						<div className="form-group">
							<div className="input-icon">
								<i className="lni-user" />
								<input
									type="email"
									id="sender-email"
									className="form-control"
									name="email"
									placeholder="Email address"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
						</div>
						<div className="form-group">
							<div className="input-icon">
								<i className="lni-lock" />
								<input
									type="password"
									className="form-control"
									placeholder="Password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</div>
						</div>
						<div className="auth-options">
							<div className="form-check">
								<input
									type="checkbox"
									className="form-check-input"
									id="exampleCheck1"
								/>
								<label
									className="form-check-label"
									htmlFor="exampleCheck1"
								>
									Keep Me Signed In
								</label>
							</div>
							<a href="#">Forgot password?</a>
						</div>
						<button
							type="submit"
							disabled={submitted}
							className="auth-submit"
						>
							{submitted ? (
								<>
									<span
										className="spinner-border spinner-border-sm me-2"
										role="status"
										aria-hidden="true"
									/>
									Signing in...
								</>
							) : (
								"Sign In"
							)}
						</button>
					</form>

					<p className="auth-switch">
						Don't have an account?{" "}
						<NavLink to="/register">Create one</NavLink>
					</p>
				</div>
			</div>
		</React.Fragment>
	);
};

export default LoginPage;
