import { ActionTypes } from "store/actions/types";
import AxiosConfig from "AxiosConfig";


const jobReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.ALL_JOBS:
            AxiosConfig.get('jobs')
                .then(res => {
                    //setJobs(res.data);
                    return {
                        ...state,
                        jobs: res.data
                    };
                })
                .catch(err => console.log(err));
        default:
            return state;
    }
};

export default jobReducer;