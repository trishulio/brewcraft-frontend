const Auth = require("aws-amplify").Auth;

import "cypress-localstorage-commands";

const username = Cypress.env("username");
const password = Cypress.env("password");
const userPoolId = Cypress.env("userPoolId");
const clientId = Cypress.env("clientId");

Auth.configure({
  region: 'us-east-1',
  userPoolId: 'us-east-1_hCtghdWqM',
  userPoolWebClientId: '4b6444oesahrbgihut7o37jr5f',
  oauth: {
      domain: 'brewcraft.auth.us-east-1.amazoncognito.com',
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
