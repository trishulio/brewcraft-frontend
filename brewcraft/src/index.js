import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { Auth } from 'aws-amplify';

let redirectSignIn;
let redirectSignOut;
if (process.env.NODE_ENV === "production") {
    redirectSignIn = document.location.href;
    redirectSignOut = document.location.href;
    console.log("production " + redirectSignIn);
} else {
    console.log("not production");
    redirectSignIn = "http://localhost:3000/";
    redirectSignOut = "http://localhost:3000/";
}

// https://aws-amplify.github.io/docs/js/authentication#manual-setup
Auth.configure({
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
      redirectSignIn: redirectSignIn,
      redirectSignOut: redirectSignOut,
      responseType: 'code',
    },
});

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
