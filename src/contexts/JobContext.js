import React, { createContext, useReducer } from "react";
import { ActionTypes } from "store/actions/types";
import jobReducer from "store/reducers/jobReducer";

export const JobContext = createContext();

const initialState = {
    isLoading: false,
    jobs: []
};


export const JobContextProvider = (props) => {
    const [jobState, jobDispatch] = useReducer(jobReducer, initialState);

    return (
        <JobContext.Provider
            value={{
                jobState,
                jobDispatch,
                ActionTypes,
            }}>
            {props.children}
        </JobContext.Provider>
    )
}