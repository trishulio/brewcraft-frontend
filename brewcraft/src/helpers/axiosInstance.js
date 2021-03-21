
import Axios from "axios";
import { getLoggedInUser } from "./authUtils"
import { useDispatch } from "react-redux";
import { togglePreloader } from '../store/layout/actions';

const AxiosInstance = Axios.create({

    // timeout: 5000,
    mode: 'no-cors',
    crossDomain: true
});

AxiosInstance.interceptors.request.use(async function (config) {

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

export default AxiosInstance;