import axios from "axios";
// Next we make an 'instance' of it

const AxiosConfig = axios.create({
    baseURL: "/api/"
});

export default AxiosConfig;
