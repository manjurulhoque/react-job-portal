/* eslint-disable */
import React, { useContext } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";

const GoogleSocialAuth = (props) => {
	const authContext = useContext(AuthContext);
	const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

	const googleResponse = (response) => {
		// NOTE: @react-oauth/google returns a Google ID token (JWT) as `credential`.
		// The backend receives it under the same `access_token` field as before.
		const postData = {
			provider: "google-oauth2",
			access_token: response.credential,
		};
		axios
			.post("http://127.0.0.1:8000/api/oauth/login/", postData)
			.then((res) => {
				let decoded = jwtDecode(res.data.access);
				authContext.authDispatch({
					type: authContext.ActionTypes.LOGIN,
					payload: {
						user: decoded.user || {},
						token: res.data.access,
						refreshToken: res.data.refresh,
					},
				});
			})
			.catch((err) => console.log(err));
	};

	if (!clientId) {
		return (
			<button type="button" className="btn btn-success" disabled>
				LOGIN WITH GOOGLE (client ID not configured)
			</button>
		);
	}

	return (
		<GoogleOAuthProvider clientId={clientId}>
			<GoogleLogin
				onSuccess={googleResponse}
				onError={() => console.log("Google login failed")}
				text="LOGIN WITH GOOGLE"
				shape="pill"
			/>
		</GoogleOAuthProvider>
	);
};

export default GoogleSocialAuth;
