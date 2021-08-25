import React, { useMemo } from "react";
import { Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import VerticalLayout from "../Layout/VerticalLayout";
import HorizontalLayout from "../Layout/HorizontalLayout/";
import { authProtectedRoutes } from "../../routes/";
import AppRoute from "../../routes/route";

export default function AuthLayout() {
    const layout = useSelector(state => {
        return state.Layout;
    });

    const Layout = useMemo(() => {
        switch (layout.layoutType) {
            case "horizontal":
                return HorizontalLayout;
            default:
                return VerticalLayout;
        }
    }, [layout]);

    return (
        <React.Fragment>
            <Layout>
                <Switch>
                    {authProtectedRoutes.map((route, idx) => (
                    <AppRoute
                        path={route.path}
                        component={route.component}
                        key={idx}
                        isAuthProtected={true}
                        {...route}
                    />
                    ))}
                </Switch>
            </Layout>
        </React.Fragment>
    );
}