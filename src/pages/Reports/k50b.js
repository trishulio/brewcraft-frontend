/* eslint-disable */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { setBreadcrumbItems } from "../../store/actions";
import k50b from "../../assets/reports/k50b-21e-1.png";

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
        this.props.setBreadcrumbItems("K50b", this.state.breadcrumbItems);
    }

    render() {
        return (
            <React.Fragment>
                <FormGroup className="d-block mb-3">
                    <Label className="mr-2">Date From</Label>
                    <Input
                        type="datetime-local"
                        className="waves-effect mr-3"
                        style={{
                            width: "16rem",
                        }}
                    />
                    <Label className="mr-2">Date to</Label>
                    <Input
                        type="datetime-local"
                        className="waves-effect mr-3"
                        style={{
                            width: "16rem",
                        }}
                    />
                    <Button className="waves-effect mr-2" color="primary">
                        Print
                    </Button>
                </FormGroup>
                <img src={k50b} className="d-block" />
            </React.Fragment>
        );
    }
}

export default connect(null, { setBreadcrumbItems })(Reports);
