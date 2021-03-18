import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { togglePreloader } from "../store/layout/actions";
import { authenticateUser } from '../helpers/authUtils';

const AppRoute = function({
  component: Component,
  isAuthProtected,
  layout : Layout,
  ...rest
}) {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    (async() => {
      const isAuth = await authenticateUser();
      dispatch(togglePreloader(!isAuth));
      setIsLoggedIn(isAuth);
    })();
  }, []);
  return (
    <Route
      {...rest}
      render={props => {
        return isLoggedIn &&
          <Layout>
            <Component {...props} />
          </Layout>
      }}
    />
  );
}

export default AppRoute;
