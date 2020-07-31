/* eslint-disable */
import React, { useState } from "react";
import CategoryItem from "./CategoryItem";

const CategoryItems = () => {
    const [categories, setCategories] = useState([
        {
            name: "Web design",
            slug: "web-design",
            icon: "fa fa-2x fa-brush text-xpro"
        },
        {
            name: "Graphic design",
            slug: "graphic-design",
            icon: "fa fa-2x fa-code text-xinspire"
        },
        {
            name: "Web development",
            slug: "web-development",
            icon: "fa fa-2x fa-boxes text-xsmooth"
        },
        {
            name: "Human Resource",
            slug: "human-resource",
            icon: "fa fa-2x fa-brush text-xpro"
        },
        {
            name: "Support",
            slug: "support",
            icon: "fa fa-2x fa-brush text-xpro"
        },
        {
            name: "Android Development",
            slug: "android",
            icon: "fa fa-2x fa-atlassian text-xpro"
        }
    ]);

    return (
        <div className="row row-deck">
            {categories.map(category => (
                <CategoryItem category={category} key={category.name} />
            ))}
            {/* <div className="col-md-6 col-xl-3">
                <a
                    className="block block-rounded block-link-shadow d-flex justify-content-center align-items-start text-center bg-xpro"
                    href="#!"
                >
                    <div className="block-content block-content-full bg-white mt-1 align-self-stretch">
                        <div className="py-4">
                            <i className="fa fa-2x fa-brush text-xpro"></i>
                            <p className="font-size-lg font-w600 mt-3 mb-1">
                                Design
                            </p>
                            <p className="text-muted mb-0">
                                Graphic, Web, Brand, Product, Packaging etc
                            </p>
                        </div>
                    </div>
                </a>
            </div> */}
        </div>
    );
};

export default CategoryItems;
