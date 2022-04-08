/* eslint-disable */
import Axios from "axios";
import { authenticateUser, getLoggedInUser } from "./authUtils";
import { Auth } from "aws-amplify";

const AxiosInstance = Axios.create({
    // timeout: 5000,
    mode: "no-cors",
    crossDomain: true,
});

AxiosInstance.interceptors.request.use(
    async function (config) {
        const getsession = await Auth.currentSession();

        if (!getsession) authenticateUser();

        config.headers.common["Authorization"] = `Bearer ${getsession
            ?.getAccessToken()
            .getJwtToken()}`;

        config.headers.common["X-Iaas-Token"] = `${getsession
            ?.getIdToken()
            .getJwtToken()}`;

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// eslint-disable-next-line
export function setInterceptorHistory(history) {
    AxiosInstance.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            if (error.response.status === 401) {
                authenticateUser();
            }

            return Promise.reject(error);
        }
    );
}

export default AxiosInstance;
