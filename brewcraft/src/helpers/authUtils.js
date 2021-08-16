import axios from 'axios';
import { Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib-esm/types";

// Set the logged in user data in local session
const setLoggedInUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}

const getLoggedInUser = () => {
    if (!localStorage.getItem('user')) return null;
    return JSON.parse(localStorage.getItem('user'));
}

// is user is logged in
const authenticateUser = async () => {
    return Auth.currentSession().then(res => {
        const payload = res.getIdToken().decodePayload();
        setLoggedInUser({
            username: payload["cognito:username"],
            email: payload.email,
            ...res
        });
        return true;
    })
    .catch(() => {
        setLoggedInUser(null);
        Auth.federatedSignIn({
            provider: CognitoHostedUIIdentityProvider.Cognito
        });
        return false;
    })
}

const signOut = function () {
    setLoggedInUser(null);
    Auth.signOut();
}

const listenAuthEvents = () => {
    Hub.listen('auth', (data) => {
        switch (data.payload.event) {
            case 'signIn':
                console.info('user signed in');
                break;
            case 'signUp':
                console.info('user signed up');
                break;
            case 'signOut':
                console.info('user signed out');
                break;
            case 'signIn_failure':
                console.error('user sign in failed');
                break;
            case 'tokenRefresh':
                console.info('token refresh succeeded');
                break;
            case 'tokenRefresh_failure':
                console.error('token refresh failed');
                break;
            case 'configured':
                console.info('the Auth module is configured');
                break;
            default:
                break;
        }
    });
}

// Register Method
const postRegister = (url, data) => {
    return axios.post(url, data).then(response => {
        if (response.status >= 200 || response.status <= 299)
            return response.data;
        throw response.data;
    }).catch(err => {
        var message;
        if (err.response && err.response.status) {
            switch (err.response.status) {
                case 404: message = "Sorry! the page you are looking for could not be found"; break;
                case 500: message = "Sorry! something went wrong, please contact our support team"; break;
                case 401: message = "Invalid credentials"; break;
                default: message = err[1]; break;
            }
        }
        throw message;
    });

}

// Login Method
const postLogin = (url, data) => {
    return axios.post(url, data).then(response => {
        if (response.status === 400 || response.status === 500)
            throw response.data;
        return response.data;
    }).catch(err => {
        throw err[1];
    });
}

// postForgetPwd
const postForgetPwd = (url, data) => {
    return axios.post(url, data).then(response => {
        if (response.status === 400 || response.status === 500)
            throw response.data;
        return response.data;
    }).catch(err => {
        throw err[1];
    });
}


export { getLoggedInUser, authenticateUser, listenAuthEvents, postRegister, postLogin, postForgetPwd, setLoggedInUser, signOut }