import axios from "axios";
// Next we make an 'instance' of it

const AxiosConfig = axios.create({
    baseURL: "https://django-job.herokuapp.com/api/"
});

export default AxiosConfig;
