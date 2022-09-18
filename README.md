# Brewcraft-Frontend

## Node version
```
node --version
v14.17.5
```

## Install
```
echo "
REACT_APP_USER_POOL_REGION=ca-central-1
REACT_APP_USER_POOL_ID=ca-central-1_1d8IVLk1T
REACT_APP_USER_POOL_WEB_CLIENT_ID=5jtpovtf41orn9hs35qt5ovnal
REACT_APP_USER_POOL_DOMAIN=staging-brewcraft.auth.ca-central-1.amazoncognito.com
" > .env

yarn
```

## Run
```
yarn start

# start on http://localhost:3000
```

## Auth
```
user: tenant_admin
password: Freebeer1
```

## Cypress Test
```
echo '
{
    "username": "admin@brewcraft.io",
    "password": "Password123$",
    "REACT_APP_USER_POOL_REGION":"ca-central-1",
    "REACT_APP_USER_POOL_ID":"ca-central-1_1d8IVLk1T",
    "REACT_APP_USER_POOL_WEB_CLIENT_ID":"5jtpovtf41orn9hs35qt5ovnal",
    "REACT_APP_USER_POOL_DOMAIN":"staging-brewcraft.auth.ca-central-1.amazoncognito.com"

  }
' > cypress.env.json

## Run

```
yarn cypress:open

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
