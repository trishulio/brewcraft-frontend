import React from "react";
import { Route, Redirect } from "react-router-dom";

import { authenticateUser, getLoggedInUser } from '../helpers/authUtils';

const AppRoute = ({
  component: Component,
  isAuthProtected,
  layout : Layout,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (isAuthProtected) {
        // return (
        //   <Redirect to={{ pathname: "/login", state: { from: props.location } }} exact />
        // );
        authenticateUser(); // oauth
      }
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

export default AppRoute;
