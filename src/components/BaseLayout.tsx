/* eslint-disable */
import React, { FC } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";

interface Props {
    children: React.ReactNode
    title: string | undefined
}

const BaseLayout: FC<Props> = ({children, title}) => {
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