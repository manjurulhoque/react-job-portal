import React from "react";
import FacebookLogin from 'react-facebook-login';


const FacebookSocialAuth = (props) => {
    const fbResponse = (response) => {
        console.log(response);
    }

    return (
        <FacebookLogin
            textButton="LOGIN WITH FACEBOOK"
            appId="<FACEBOOK APP ID>"
            fields="name,email,picture"
            callback={fbResponse}
        />
    );
}

export default FacebookSocialAuth;