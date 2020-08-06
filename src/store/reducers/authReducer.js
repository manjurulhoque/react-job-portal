import { ActionTypes } from "store/actions/types";

const authReducer = (state, action) => {
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

export default authReducer;