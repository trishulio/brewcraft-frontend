import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { setBreadcrumbItems } from "../../store/actions";
import { getSuppliers } from "./provider";

class VendorList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleNewUserClick = this.handleNewUserClick.bind(this);
    }

    componentDidMount() {
        this.props.setBreadcrumbItems("Vendors", [
            { title: "List all vendors", link: "/vendors" }
        ]);
        getSuppliers().then(res => {
            console.log(res);
        });
    }

    render() {
        return (
            <React.Fragment>
                <Button onClick={this.handleNewUserClick}>Create User</Button>
            </React.Fragment>
        )
    }
}

const mapStatetoProps = state => {
    const Materials = state.Materials;
    return {};
};

export default connect(mapStatetoProps, {setBreadcrumbItems})(VendorList);
