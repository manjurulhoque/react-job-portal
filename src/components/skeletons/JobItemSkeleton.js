/* eslint-disable */
import React from "react";
import moment from "moment";
import {Link} from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const JobItemSkeleton = (props) => {
    return (
        <div className="col-lg-4 col-md-6 col-xs-12">
            <div className="job-featured">
                <div className="icon">
                    <Skeleton circle={true} height={50} width={50}/>
                </div>
                <div className="content">
                    <h3>
                        <Skeleton height={10}/>
                    </h3>
                    <p className="brand">
                        <Skeleton height={10}/>
                    </p>
                    <div className="tags">
                        <span><Skeleton height={10}/></span>
                        <span><Skeleton height={10}/></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobItemSkeleton;
