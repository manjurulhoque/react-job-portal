/* eslint-disable */
import React, { createContext, useReducer } from "react";
import authReducer from "store/reducers/authReducer";
import { ActionTypes } from "store/actions/types";

export const AuthContext = createContext();

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: false,
};


export const AuthContextProvider = (props) => {
    const [state, authDispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider
            value={{
                state,
                authDispatch,
                ActionTypes,
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}