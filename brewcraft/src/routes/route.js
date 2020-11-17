import React from "react";
import { Route } from "react-router-dom";
import { authenticateUser } from '../helpers/authUtils';

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
        authenticateUser(); // oauth redirect
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
