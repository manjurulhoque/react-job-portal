/* eslint-disable */
import React, { FC } from "react";
import { Link } from "react-router";
import { ICategory } from "../../interfaces";

interface Props {
	category: ICategory;
}

const CategoryItem: FC<Props> = ({ category }) => {
	const to = category.id
		? `/jobs?category=${category.id}`
		: category.slug
			? `/jobs?category=${category.slug}`
			: "/jobs";

	return (
		<Link className="jp-category" to={to}>
			<span className="jp-category__icon" aria-hidden="true">
				<i className={category.icon || "lni-briefcase"} />
			</span>
			<span className="jp-category__body">
				<h3>{category.name}</h3>
				{typeof category.total_jobs === "number" && (
					<p>
						{category.total_jobs}{" "}
						{category.total_jobs === 1 ? "job" : "jobs"}
					</p>
				)}
			</span>
		</Link>
	);
};

export default CategoryItem;
