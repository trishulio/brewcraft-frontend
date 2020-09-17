import React, { Component } from 'react';
import { connect } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { Card, CardBody } from "reactstrap";

class Facility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems : [
                { title : "Dashboard", link : "#" },
                { title : "Facility", link : "#" }
            ]
        }
    }

    componentDidMount(){
        this.props.setBreadcrumbItems("Facility", this.state.breadcrumbItems);
    }

    render() {
        return(
            <React.Fragment>
                <h1>Hello World!</h1>
            </React.Fragment>
        );
    }
}

export default connect(null, { setBreadcrumbItems })(Facility);
