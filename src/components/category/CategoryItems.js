/* eslint-disable */
import React, {useState} from "react";
import CategoryItem from "./CategoryItem";

const CategoryItems = () => {
    const [categories, setCategories] = useState([
        {
            name: "Web design",
            slug: "web-design",
            icon: "lni-brush"
        },
        {
            name: "Graphic design",
            slug: "graphic-design",
            icon: "lni-heart"
        },
        {
            name: "Web development",
            slug: "web-development",
            icon: "lni-funnel"
        },
        {
            name: "Human Resource",
            slug: "human-resource",
            icon: "lni-cup"
        },
        {
            name: "Support",
            slug: "support",
            icon: "lni-home"
        },
        {
            name: "Android Development",
            slug: "android",
            icon: "lni-world"
        }
    ]);

    return (
        <section className="category section bg-gray">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Browse Categories</h2>
                    <p>Most popular categories of portal, sorted by popularity</p>
                </div>
                <div className="row">
                    {categories.map((category, index) => (
                        <CategoryItem category={category} index={index} key={category.name}/>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryItems;
