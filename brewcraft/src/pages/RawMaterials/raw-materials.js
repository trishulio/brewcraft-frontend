import React, { Component } from 'react';
import { connect } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import {
    Col,
    Row,
    Card,
    CardBody,
    TabContent,
    TabPane,
    NavLink,
    NavItem,
    Nav,
  } from "reactstrap";
import classnames from "classnames";
import { data } from "../../helpers/providers/materials";
import { MDBDataTable } from "mdbreact";
import Overview from "./overview";
import Materials from "./materials";

class RawMaterials extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: props.match.params.tab,
            breadcrumbItems : [
                { title : "Dashboard", link : "#" },
                { title : "Raw Materials", link : "#" }
            ],
            malts: [
                { title : "Pale 2 Row Malt", quantity : 12, cost : 2100 },
                { title : "Carastan Malt", quantity : 47, cost : 2400 },
                { title : "Munich Malt", quantity : 710.8, cost : 8900 },
                { title : "Wheat", quantity : 0, cost : 0 },
                { title : "Black malt", quantity : 0, cost : 0 },
                { title : "Chocolate Malt", quantity : 250.2, cost : 340 },
                { title : "Crystal Malt", quantity : 0, cost : 0 }
            ]
        }
    }

    componentDidMount() {
        let title = "";
        if (this.state.tab) {
            const words = this.props.match.params.tab.split("-");
            title = "";
            words.forEach(word => {
                title += word.charAt(0).toUpperCase() + word.slice(1);
            });
        } else {
            title = "Raw Materials";
        }
        this.props.setBreadcrumbItems(title, this.state.breadcrumbItems);
    }

    render() {
        return(
            <React.Fragment>
                { this.state.tab === "overview" && <Overview/> }
                { this.state.tab === undefined && <Materials/> }
            </React.Fragment>
        );
    }
}

export default connect(null, { setBreadcrumbItems })(RawMaterials);
