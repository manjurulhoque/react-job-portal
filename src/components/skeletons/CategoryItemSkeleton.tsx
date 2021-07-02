/* eslint-disable */
import React, { FC } from "react";
import Skeleton from "react-loading-skeleton";

const CategoryItemSkeleton: FC<any> = (props: any) => {
    return (
        <div className="col-lg-4 col-md-6 col-xs-12 f-category">
            <a href="#">
                <div className="icon">
                    <Skeleton circle={true} height={50} width={50}/>
                </div>
                <h3>
                    <Skeleton height={10}/>
                </h3>
                <p>
                    <Skeleton height={10}/>
                </p>
            </a>
        </div>
    );
};

export default CategoryItemSkeleton;
