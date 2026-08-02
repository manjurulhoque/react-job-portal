/* eslint-disable */
import React, { FC } from "react";
import Skeleton from "react-loading-skeleton";

const CategoryItemSkeleton: FC = () => {
	return (
		<div className="jp-category" aria-hidden="true">
			<span className="jp-category__icon">
				<Skeleton circle height={28} width={28} />
			</span>
			<span className="jp-category__body" style={{ flex: 1 }}>
				<h3>
					<Skeleton height={14} width="70%" />
				</h3>
				<p>
					<Skeleton height={12} width="40%" />
				</p>
			</span>
		</div>
	);
};

export default CategoryItemSkeleton;
