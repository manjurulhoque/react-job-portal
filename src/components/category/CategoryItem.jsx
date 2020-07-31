import React from "react";

const CategoryItem = ({ category }) => {
    return (
        <div className="col-md-6 col-xl-3">
            <a
                className="block block-rounded block-link-shadow d-flex justify-content-center align-items-start text-center bg-xinspire"
                href="#!"
            >
                <div className="block-content block-content-full bg-white mt-1 align-self-stretchv">
                    <div className="py-4">
                        <i className={category.icon}></i>
                        <p className="font-size-lg font-w600 mt-3 mb-1">
                            {category.name}
                        </p>
                        <p className="text-muted mb-0">
                            Graphic, Web, Brand, Product, Packaging etc
                        </p>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default CategoryItem;
