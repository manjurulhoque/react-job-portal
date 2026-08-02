/* eslint-disable */
import React, { FC } from "react";
import { Link } from "react-router";
import { ICategory } from "../../interfaces";

interface Props {
	category: ICategory;
}

const CategoryItem: FC<Props> = ({ category }) => {
	return (
		<Link className="jp-category" to="/jobs">
			<span className="jp-category__icon" aria-hidden="true">
				<i className={category.icon} />
			</span>
			<span className="jp-category__body">
				<h3>{category.name}</h3>
				<p>
					{category.total_jobs}{" "}
					{category.total_jobs === 1 ? "job" : "jobs"}
				</p>
			</span>
		</Link>
	);
};

export default CategoryItem;
