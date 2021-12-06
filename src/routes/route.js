/* eslint-disable */
import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const AppRoute = function ({
  component: Component,
  isAuthProtected,
  layout: Layout,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <Fragment>
            <ToastContainer />
            <Component {...props} />
          </Fragment>
        );
      }}
    />
  );
};

export default AppRoute;
