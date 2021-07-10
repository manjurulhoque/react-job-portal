import axios from "axios";

const AxiosConfig = axios.create({
    baseURL: "/api/"
});

export default AxiosConfig;
