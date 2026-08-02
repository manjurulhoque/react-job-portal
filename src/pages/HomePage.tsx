/* eslint-disable */
import React, { FC } from "react";
import CategoryItems from "../components/category/CategoryItems";
import HowItWorks from "../components/HowItWorks";
import Jumbotron from "../components/Jumbotron";
import BaseLayout from "../components/BaseLayout";

const HomePage: FC = () => {
	return (
		<BaseLayout title={"Home"}>
			<Jumbotron />
			<CategoryItems />
			<HowItWorks />
		</BaseLayout>
	);
};

export default HomePage;
