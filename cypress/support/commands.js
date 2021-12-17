const Auth = require("aws-amplify").Auth;

import "cypress-localstorage-commands";

const username = Cypress.env("username");
const password = Cypress.env("password");
const REACT_APP_USER_POOL_REGION = Cypress.env("REACT_APP_USER_POOL_REGION");
const REACT_APP_USER_POOL_ID = Cypress.env("REACT_APP_USER_POOL_ID");
const REACT_APP_USER_POOL_WEB_CLIENT_ID = Cypress.env("REACT_APP_USER_POOL_WEB_CLIENT_ID");
const REACT_APP_USER_POOL_DOMAIN = Cypress.env("REACT_APP_USER_POOL_DOMAIN");

Auth.configure({
  region: REACT_APP_USER_POOL_REGION,
  userPoolId:REACT_APP_USER_POOL_ID,
  userPoolWebClientId: REACT_APP_USER_POOL_WEB_CLIENT_ID,
  oauth: {
    domain: REACT_APP_USER_POOL_DOMAIN,
      scope: [
          "phone",
          "email",
          "profile",
          "openid",
          "aws.cognito.signin.user.admin"
      ],
  }
});

Cypress.Commands.add("signIn", () => {
  cy.then(() => Auth.signIn(username, password)).then((cognitoUser) => {
    const idToken = cognitoUser.signInUserSession.idToken.jwtToken;
    const accessToken = cognitoUser.signInUserSession.accessToken.jwtToken;
    const makeKey = (name) =>
      `CognitoIdentityServiceProvider.${cognitoUser.pool.clientId}.${cognitoUser.username}.${name}`;

    cy.setLocalStorage(makeKey("accessToken"), accessToken);
    cy.setLocalStorage(makeKey("idToken"), idToken);
    cy.setLocalStorage(
      `CognitoIdentityServiceProvider.${cognitoUser.pool.clientId}.LastAuthUser`,
      cognitoUser.username
    );
  });
  cy.saveLocalStorage();
});
