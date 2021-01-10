/* eslint-disable */
import React, {useContext} from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import {AuthContext} from "../../contexts/AuthContext";
import jwtDecode from "jwt-decode";


const GoogleSocialAuth = (props) => {

    const authContext = useContext(AuthContext);

    const googleResponse = (response) => {

        const postData = {
            "provider": "google-oauth2",
            "access_token": response.accessToken,
        }
        axios.post('http://127.0.0.1:8000/api/oauth/login/', postData)
            .then(res => {
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
            .catch(err => console.log(err))
    }

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="LOGIN WITH GOOGLE"
            className="btn btn-success"
            onSuccess={googleResponse}
            onFailure={googleResponse}
        />
    );
}

export default GoogleSocialAuth;