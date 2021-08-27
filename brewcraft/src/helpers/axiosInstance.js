
import Axios from "axios";
import { authenticateUser, getLoggedInUser } from "./authUtils"

const AxiosInstance = Axios.create({
    // timeout: 5000,
    mode: 'no-cors',
    crossDomain: true
});

AxiosInstance.interceptors.request.use(function (config) {

    const user = getLoggedInUser();

    if (user) {

        config.headers.common['Authorization'] = `Bearer ${user.accessToken.jwtToken}`;

    } else {

        debugger;
    }

    return config;

}, function (error) {

    debugger;

    return Promise.reject(error);
});

AxiosInstance.interceptors.response.use(function(response) {

    return response;

}, function(error) {

    if (error.response.status === 401) {

        authenticateUser();
    }

    return Promise.reject(error);
});

export default AxiosInstance;