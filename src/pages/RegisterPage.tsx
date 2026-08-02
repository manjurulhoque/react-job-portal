/* eslint-disable */
import React, { useState, useContext } from "react";
import Header from "../components/Header";
import { Helmet } from "react-helmet-async";
import AxiosConfig from "../AxiosConfig";
import { AuthContext } from "../contexts/AuthContext";
import { NavLink, Navigate } from "react-router";
import toast from "react-hot-toast";
import "../assets/css/auth.css";

const RegisterPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [gender, setGender] = useState("");
	const [role, setRole] = useState("");
	const [redirect, setRedirect] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const authContext = useContext(AuthContext);

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
		evt.preventDefault();
		setSubmitted(true);

		if (!email && !password) {
			alert("All fields are required");
			setSubmitted(false);
			return true;
		}

		const postData = {
			email: email,
			password: password,
			password2: password2,
			gender: gender,
			role: role,
		};

		AxiosConfig.post("register/", postData)
			.then((res) => {
				setSubmitted(false);
				toast.success("Registered successfully");
				if (res.status == 201) setRedirect(true);
			})
			.catch((err) => {
				setSubmitted(false);
				toast.error("Register failed");
			});
	};

	if (redirect) {
		return <Navigate to="/login" replace />;
	}

	return (
		<React.Fragment>
			<Header />
			<Helmet>
				<title>Register</title>
			</Helmet>

			<div className="auth-page">
				<div className="auth-card">
					<div className="auth-brand">
						<span className="auth-logo">J</span>
						<span className="auth-logo-text">Job Portal</span>
					</div>
					<h2 className="auth-title">Create your account</h2>
					<p className="auth-subtitle">
						Join Job Portal and find your next opportunity
					</p>

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
						<div className="form-group">
							<div className="input-icon">
								<i className="lni-lock" />
								<input
									type="password"
									className="form-control"
									placeholder="Confirm Password"
									value={password2}
									onChange={(e) =>
										setPassword2(e.target.value)
									}
								/>
							</div>
						</div>
						<div className="form-group">
							<div className="input-icon">
								<i className="lni-user" />
								<select
									className="form-control"
									onChange={(e) => setGender(e.target.value)}
								>
									<option value="" defaultValue={""}>
										Select gender
									</option>
									<option value="male">Male</option>
									<option value="female">Female</option>
								</select>
							</div>
						</div>
						<div className="form-group">
							<div className="input-icon">
								<i className="lni-briefcase" />
								<select
									className="form-control"
									onChange={(e) => setRole(e.target.value)}
								>
									<option value="" defaultValue={""}>
										Select role
									</option>
									<option value="employee">Employee</option>
									<option value="employer">Employer</option>
								</select>
							</div>
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
									Creating account...
								</>
							) : (
								"Create Account"
							)}
						</button>
					</form>

					<p className="auth-switch">
						Already have an account?{" "}
						<NavLink to="/login">Sign in</NavLink>
					</p>
				</div>
			</div>
		</React.Fragment>
	);
};

export default RegisterPage;
