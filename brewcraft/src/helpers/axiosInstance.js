
import React from "react";
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

        authenticateUser();
    }

    return config;

}, function (error) {

    return Promise.reject(error);

});

export function setInterceptorHistory(history) {

    AxiosInstance.interceptors.response.use(function(response) {

        return response;

    }, function(error) {

        if (error.response.status === 401) {

            authenticateUser();

        } else if (error.response.status === 404) {

            history.replace("/404");

        } else if  (error.response.status === 500) {

            history.replace("/404");
        }

        return Promise.reject(error);
    });
}

export default AxiosInstance;