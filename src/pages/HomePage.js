/* eslint-disable */
import React from "react";
import CategoryItems from "../components/category/CategoryItems";
import HowItWorks from "../components/HowItWorks";
import BaseLayout from "../components/BaseLayout";

const HomePage = () => {
    return (
        <BaseLayout title={'Home'}>
            <CategoryItems/>

            <HowItWorks/>
        </BaseLayout>
    );
};

export default HomePage;
