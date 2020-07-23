import axios from "axios";
// Next we make an 'instance' of it

const AxiosConfig = axios.create({
    baseURL: "http://jobs.manjurulhoque.com/api/"
});

export default AxiosConfig;
