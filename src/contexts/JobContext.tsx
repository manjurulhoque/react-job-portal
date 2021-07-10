import React, { createContext, ReactNode, useReducer } from "react";
import { ActionTypes, IActionTypes } from "../store/actions/types";
import jobReducer from "../store/reducers/jobReducer";

interface initialState {
    isLoading: boolean,
    jobs: Array<any>
}

const initialInfo = {
    isLoading: false,
    jobs: []
};

export const JobContext = createContext<{ jobState: initialState, jobDispatch: React.Dispatch<any>, ActionTypes: IActionTypes }>({
    jobState: initialInfo,
    jobDispatch: () => null,
    ActionTypes: ActionTypes
});

type contextProps = {
    children: ReactNode
}

export const JobContextProvider = (props: contextProps) => {
    const [jobState, jobDispatch] = useReducer(jobReducer, initialInfo);

    return (
        <JobContext.Provider value={
            {
                jobState,
                jobDispatch,
                ActionTypes,
            }
        }>
            {
                props.children
            }
        </JobContext.Provider>
    )
}