import React, { Component } from "react";
import { withRouter, Switch } from "react-router-dom";
import { publicRoutes } from "../../routes";
import AppRoute from "../../routes/route";

class NonAuthLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.capitalizeFirstLetter.bind(this);
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(1).toUpperCase() + string.slice(2);
    };

    componentDidMount() {
        let currentage = this.capitalizeFirstLetter(
            this.props.location.pathname
        );

        document.title =
            currentage + " | Brewcraft - Process Control Management";
    }
    render() {
        return (
            <React.Fragment>
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
            </React.Fragment>
        );
    }
}

export default withRouter(NonAuthLayout);
