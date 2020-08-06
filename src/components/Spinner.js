import React, { useContext } from "react";

const Spinner = ({ isLoading }) => {
    return (
        <div id="preloader">
            <div className="loader" id="loader-1"></div>
        </div>
    )
}

export default Spinner;