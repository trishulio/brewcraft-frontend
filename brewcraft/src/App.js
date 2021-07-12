import React, { useMemo, useState, useEffect } from "react";
import { Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authProtectedRoutes, publicRoutes } from "./routes/";
import AppRoute from "./routes/route";
import VerticalLayout from "./component/Layout/VerticalLayout";
import HorizontalLayout from "./component/Layout/HorizontalLayout/";
import NonAuthLayout from "./component/NonAuthLayout/NonAuthLayout";
import { listenAuthEvents, authenticateUser } from "./helpers/authUtils";
import { togglePreloader } from "./store/layout/actions";
import "react-toastify/dist/ReactToastify.css";
// Import scss
import "./theme.scss";

if (process.env.NODE_ENV !== "production") {
  // write authentication events to console log
  listenAuthEvents();
}

const App = () => {
  const layout = useSelector((state) => state.Layout);
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const isAuth = await authenticateUser();
      dispatch(togglePreloader(!isAuth));
      setIsLoggedIn(isAuth);
    })();
  }, []);

  const GetLayout = useMemo(() => {
    let layoutCls = VerticalLayout;
    switch (layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  }, [layout]);

  return (
    <React.Fragment>
      {!isLoggedIn && (
        <NonAuthLayout>
          <Switch>
            {publicRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                component={route.component}
                key={idx}
                isAuthProtected={false}
              />
            ))}
          </Switch>
        </NonAuthLayout>
      )}

      {isLoggedIn && (
        <GetLayout>
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
        </GetLayout>
      )}
    </React.Fragment>
  );
};
export default App;
