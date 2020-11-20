import React, { Component } from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { connect } from "react-redux";
import { authProtectedRoutes, publicRoutes } from "./routes/";
import AppRoute from "./routes/route";
import VerticalLayout from "./component/Layout/VerticalLayout";
import HorizontalLayout from "./component/Layout/HorizontalLayout/";
import NonAuthLayout from "./component/NonAuthLayout/NonAuthLayout";
import { listenAuthEvents } from "./helpers/authUtils";

// Import scss
import "./theme.scss";

if (process.env.NODE_ENV !== 'production') {
  // write authentication events to console log
  listenAuthEvents();
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  getLayout = () => {
    let layoutCls = VerticalLayout;

    switch (this.props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  };

  render() {
    const Layout = this.getLayout();

    return (
      <React.Fragment>
        <Router>
          <Switch>
            {publicRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                component={route.component}
                layout={NonAuthLayout}
                key={idx}
                isAuthProtected={false}
              />
            ))}
            {authProtectedRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                component={route.component}
                layout={Layout}
                key={idx}
                isAuthProtected={true}
                {...route}
              />
            ))}

          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    layout: state.Layout
  };
};

export default connect(mapStateToProps, null)(App);
