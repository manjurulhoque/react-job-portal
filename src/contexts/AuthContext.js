/* eslint-disable */
import React, { createContext, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: false,
};

const ActionTypes = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
};

const reducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", JSON.stringify(action.payload.token));
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
            };
        case ActionTypes.LOGOUT:
            localStorage.clear();
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
};


export const AuthContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AuthContext.Provider
            value={{
                state,
                dispatch,
                ActionTypes,
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}