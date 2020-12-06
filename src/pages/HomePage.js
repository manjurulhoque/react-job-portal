/* eslint-disable */
import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import AxiosConfig from "../AxiosConfig";
import {Helmet} from "react-helmet";
import CategoryItems from "../components/category/CategoryItems";
import HowItWorks from "../components/HowItWorks";
import BaseLayout from "../components/BaseLayout";

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
        <BaseLayout title={'Home'}>
            <CategoryItems/>

            <HowItWorks/>
        </BaseLayout>
    );
};

export default HomePage;
