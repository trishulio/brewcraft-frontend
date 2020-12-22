import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { Auth } from 'aws-amplify';

const params = {
    region: process.env.REACT_APP_USER_POOL_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
    oauth: {
        domain: process.env.REACT_APP_USER_POOL_DOMAIN,
        scope: [
            "phone",
            "email",
            "profile",
            "openid",
            "aws.cognito.signin.user.admin"
        ],
        responseType: 'code',
    }
};
if (process.env.NODE_ENV === "production") {
    params.oauth.redirectSignIn = process.env.REACT_APP_REDIRECT_SIGN_IN;
    params.oauth.redirectSignOut = process.env.REACT_APP_REDIRECT_SIGN_IN;
} else {
    params.oauth.redirectSignIn = "http://localhost:3000/";
    params.oauth.redirectSignOut = "http://localhost:3000/";
}
// https://aws-amplify.github.io/docs/js/authentication#manual-setup
Auth.configure(params);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
