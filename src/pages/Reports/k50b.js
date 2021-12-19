/* eslint-disable */
import React, { Component } from "react";
import { connect } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Dashboard", link: "#" },
                { title: "Reports", link: "#" },
            ],
        };
    }

    componentDidMount() {
        this.props.setBreadcrumbItems("Reports", this.state.breadcrumbItems);
    }

    render() {
        return (
            <React.Fragment>
                <h1>Hello World!</h1>
            </React.Fragment>
        );
    }
}

export default connect(null, { setBreadcrumbItems })(Reports);
