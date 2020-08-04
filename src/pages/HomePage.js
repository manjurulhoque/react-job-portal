/* eslint-disable */
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import AxiosConfig from "../AxiosConfig";
import { Helmet } from "react-helmet";

const HomePage = () => {
    // const [jobs, setJobs] = useState([]);

    // useEffect(() => {
    //     AxiosConfig.get("jobs/")
    //         .then(res => {
    //             setJobs(res.data);
    //         })
    //         .catch(err => console.log(err));
    // }, []);

    return (
        <React.Fragment>
            <Header />
            <Helmet>
                <title>Home</title>
            </Helmet>

        </React.Fragment>
    );
};

export default HomePage;
