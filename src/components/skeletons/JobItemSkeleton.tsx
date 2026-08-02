/* eslint-disable */
import React, { FC } from "react";
import Skeleton from "react-loading-skeleton";

const JobItemSkeleton: FC = () => {
	return (
		<div className="job-card job-card--skeleton" aria-hidden="true">
			<div className="job-card__top">
				<span className="job-card__mark">
					<Skeleton circle height={28} width={28} />
				</span>
				<Skeleton width={72} height={22} borderRadius={999} />
			</div>
			<div>
				<h3 className="job-card__title">
					<Skeleton height={18} width="85%" />
				</h3>
				<p className="job-card__company">
					<Skeleton height={12} width="45%" />
				</p>
			</div>
			<div className="job-card__meta">
				<Skeleton height={12} width="40%" />
				<Skeleton height={12} width="30%" />
			</div>
		</div>
	);
};

export default JobItemSkeleton;
