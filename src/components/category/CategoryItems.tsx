/* eslint-disable */
import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import AxiosConfig from "../../AxiosConfig";
import CategoryItemSkeleton from "../skeletons/CategoryItemSkeleton";
import { ICategory } from "../../interfaces";

const CategoryItems = () => {
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const res = await AxiosConfig.get("categories/");
				setCategories(res.data);
				setLoading(false);
			} catch (e) {
				console.log(e);
				setLoading(false);
			}
		};

		fetchCategories().then();
	}, []);

	return (
		<section className="jp-section">
			<div className="container">
				<div className="jp-section__head">
					<h2>Browse categories</h2>
					<p>
						Popular job categories on Job Portal, ready to explore.
					</p>
				</div>
				<div className="jp-categories">
					{loading &&
						Array(6)
							.fill(0)
							.map((_, index) => (
								<CategoryItemSkeleton key={index} />
							))}
					{!loading &&
						categories.map((category) => (
							<CategoryItem
								category={category}
								key={category.name}
							/>
						))}
				</div>
			</div>
		</section>
	);
};

export default CategoryItems;
