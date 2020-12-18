/* eslint-disable */
import React from "react";

const CategoryItem = ({category, index}) => {
    let classes = `icon bg-color-${index + 1}`
    return (
        <div className="col-lg-4 col-md-6 col-xs-12 f-category">
            <a href="#">
                <div className={classes}>
                    <i className={category.icon}/>
                </div>
                <h3>{category.name}</h3>
                <p>({category.total_jobs} jobs)</p>
            </a>
        </div>
    );
};

export default CategoryItem;
