/* eslint-disable */
import React, {createContext, useReducer} from "react";
import authReducer from "store/reducers/authReducer";
import {ActionTypes} from "store/actions/types";
import history from "../history";
import jwtDecode from 'jwt-decode';
import moment from "moment";

export const AuthContext = createContext();

let jwtToken = localStorage.getItem("token");
let refreshToken = localStorage.getItem("refreshToken");
let user = JSON.parse(localStorage.getItem("user"));
let decoded = {};

const excluded_routes = ['/login', '/register', '/jobs']

if (jwtToken) {
    decoded = jwtDecode(jwtToken);
    if (moment.unix(decoded.exp).format() < moment().format()) {
        localStorage.clear();
        if (!excluded_routes.includes(history.location.pathname)) history.push('/');
    }
}
else {
    if (!excluded_routes.includes(history.location.pathname)) history.push('/');
}

const initialState = {
    isAuthenticated: !!decoded.user,
    user: decoded.user,
    token: jwtToken,
    refreshToken: refreshToken,
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