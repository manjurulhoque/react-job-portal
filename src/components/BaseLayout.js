/* eslint-disable */
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import {Helmet} from "react-helmet";

const BaseLayout = ({children, title}) => {
    return (
        <React.Fragment>
            <Header/>
            <Helmet>
                <title>{title}</title>
            </Helmet>

            {children}

            <Footer/>
        </React.Fragment>
    )
};

export default BaseLayout;