/* eslint-disable */
import React, { Fragment } from "react";
import { Route } from "react-router-dom";

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
                        <Component {...props} />
                    </Fragment>
                );
            }}
        />
    );
};

export default AppRoute;
