import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import CategoryItems from "../components/category/CategoryItems";
import JobItem from "../components/job/JobItem";
import AxiosConfig from "./../AxiosConfig";

const HomePage = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        AxiosConfig.get("jobs/")
            .then(res => {
                setJobs(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <React.Fragment>
            <Header />
        </React.Fragment>
    );
};

export default HomePage;
