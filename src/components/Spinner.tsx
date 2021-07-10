import React, { FC } from "react";

interface Props {
    isLoading: boolean
}

const Spinner: FC<Props> = ({isLoading}) => {
    return (
        <div id="preloader">
            <div className="loader" id="loader-1"/>
        </div>
    )
}

export default Spinner;