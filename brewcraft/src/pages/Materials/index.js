import React, { Component } from 'react';
import { connect, Provider } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { Col, Row } from "reactstrap";
import MiniCard from "../Dashboard/mini-card";
import InventoryValue from "./inventory-value";
import InventoryQuantity from "./inventory-quantity";
import InProcessQuantity from "./in-process-quantity";
import RecentPurchases from "./recent-purchases";
import RecentWaste from "./recent-waste";

class RawMaterials extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems : [
                { title : "Dashboard", link : "#" },
                { title : "Raw Materials", link : "#" }
            ]
        };
    }

    componentDidMount() {
        this.props.setBreadcrumbItems("Overview", this.state.breadcrumbItems);
        // DataProvider.fetchOverview()
        //     .then(oData => {
        //         this.props.setRawMaterialItems(oData);
        //     });
    }

    render() {
        return(
            <React.Fragment>
                <Row>
                    <MiniCard reports={this.props.reports} />
                </Row>
                <Row>
                    <Col md={6} lg={3}>
                        <InventoryValue {...this.props}/>
                    </Col>
                    <Col md={6}>
                        <InventoryQuantity {...this.props}/>
                    </Col>
                    <Col md={6} lg={3}>
                        <InProcessQuantity {...this.props}/>
                    </Col>
                </Row>
                <Row>
                <Col md={6}>
                    <RecentPurchases {...this.props}/>
                </Col>
                <Col md={6}>
                    <RecentWaste {...this.props}/>
                </Col>
                </Row>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const Materials = state.Materials;
    return {
        reports: [
            {
                title: "Materials Value",
                icon: "mdi-cube-outline",
                desc : "From previous month",
                value: Materials.RawMaterial.value
            },
            {
                title : "MTD Materials Used",
                icon : "mdi-tag-text-outline",
                desc : "From previous month",
                value: Materials.Used.mtd_value,
                result: Materials.Used.mtd_increase,
                color: Materials.Used.mtd_increase > 0 ? "info" : "warning"
            },
            {
                title: "In-Process",
                icon: "mdi-cube",
                value: Materials.InProcess.value
            },
            {
                title : "MTD Materials Waste",
                icon : "mdi-trash-can-outline",
                desc : "From previous month",
                value: Materials.Wasted.mtd_value,
                result: Materials.Wasted.mtd_increase,
                color: Materials.Wasted.mtd_increase > 0 ? "info" : "warning"
            }
        ]
    };
};

export default connect(mapStatetoProps, { setBreadcrumbItems })(RawMaterials);
