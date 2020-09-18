import React, { Component } from 'react';
import { connect } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { Link } from "react-router-dom";
import { data } from "../../helpers/providers/materials";
import BarChart from "../AllCharts/chartjs/barchart";
import DountChart from "../AllCharts/chartjs/dountchart";
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
import { MDBDataTable } from "mdbreact";
import MiniCard from "../Dashboard/mini-card";

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems : [
                { title : "Dashboard", link : "#" },
                { title : "Raw Materials", link : "#" }
            ],
            reports : [
                { title : "Total Waste", icon : "mdi-trash-can-outline", result : "0%", value : "17.8 Kg", desc : "From previous period", color : "warning" },
                { title : "Total Cost", icon : "mdi-buffer", result : "-29%", value : "$46,782", desc : "From previous period", color : "danger" },
                { title : "Average Cost", icon : "mdi-tag-text-outline", result : "0%", value : "$15.9", desc : "From previous period", color : "warning" },
                { title : "Current Value", icon : "mdi-cube-outline", result : "+11%", value : "$1,587", desc : "From previous period", color : "info" },
            ]
        }
    }

    render() {
        return(
            <React.Fragment>
                <Row>
                    <MiniCard reports={this.state.reports} />
                </Row>
                <Row>
                    <Col md="6">
                        <Card>
                            <CardBody>
                                <h4 className="card-title mb-4">Material Quantities</h4>
                                <BarChart />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="6">
                        <Card>
                            <CardBody>
                                <h4 className="card-title mb-4">Material Costs</h4>
                                <DountChart />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Card>
                        <CardBody>
                            <h4 className="card-title">Raw Materials</h4>
                            <p className="card-title-desc">Raw materials are aggregated by <Link
                                    onClick={(() => {
                                        this.toggleCustom("2");
                                    })}
                                    >raw material type.
                                </Link> Raw material cost is calculated using a weighted-average cost formula over the current year-to-date period.
                            </p>
                            <MDBDataTable
                                responsive
                                bordered
                                data={data}
                            />
                        </CardBody>
                    </Card>
                </Row>
            </React.Fragment>
        );
    }
}

export default connect(null, { setBreadcrumbItems })(Overview);