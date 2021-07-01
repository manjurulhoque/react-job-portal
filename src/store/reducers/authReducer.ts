import { ActionTypes } from "../actions/types";

const authReducer = (state: any, action: any) => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("refreshToken", action.payload.refreshToken);

            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken,
                isLoading: false
            };
        case ActionTypes.LOGOUT:
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null
            };
        default:
            return state;
    }
};

export default authReducer;