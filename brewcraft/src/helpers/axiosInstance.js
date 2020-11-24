
import Axios from "axios";
import { getLoggedInUser } from "./authUtils"

const AxiosInstance = Axios.create({
   
    timeout: 5000,
    mode: 'no-cors',
    crossDomain: true
});

  AxiosInstance.interceptors.request.use(async function (config) {
    
    const user = getLoggedInUser();
    
    if (user) {

        config.headers.common['Authorization'] = `Bearer ${user.accessToken.jwtToken}`;
    
    }

    return config;

}, function (error) {

    return Promise.reject(error);
    
  });

export default AxiosInstance;