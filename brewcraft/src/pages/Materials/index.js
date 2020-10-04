import React, { Component } from 'react';
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";
import { setBreadcrumbItems } from "../../store/actions";
import {
    formatCurrency,
    formatPercent
} from "../../helpers/textUtils";
import MiniCard from "../Dashboard/mini-card";
import InventoryValue from "./components/raw-materials-value-chart";
import InventoryQuantity from "./components/materials-quantity-chart";
import InProcessQuantity from "./components/in-process-value-chart";
import RecentPurchases from "./components/recent-purchases";
import RecentWaste from "./components/recent-waste";

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
                desc : "From previous day",
                value: formatCurrency(Materials.RawMaterial.value),
                result: formatPercent(Materials.RawMaterial.value_increase),
                color: "info"
            },
            {
                title: "In-Process",
                icon: "mdi-cube",
                value: formatCurrency(Materials.InProcess.value)
            },
            {
                title : "MTD Materials Used",
                icon : "mdi-tag-text-outline",
                desc : "From previous month",
                value: formatCurrency(Materials.Used.mtd_value),
                result: formatPercent(Materials.Used.mtd_increase),
                color: Materials.Used.mtd_increase > 0 ? "info" : "warning"
            },
            {
                title : "MTD Materials Waste",
                icon : "mdi-trash-can-outline",
                desc : "From previous month",
                value: formatCurrency(Materials.Wasted.mtd_value),
                result: formatPercent(Materials.Wasted.mtd_increase),
                color: Materials.Wasted.mtd_increase > 0 ? "info" : "warning"
            }
        ]
    };
};

export default connect(mapStatetoProps, { setBreadcrumbItems })(RawMaterials);
