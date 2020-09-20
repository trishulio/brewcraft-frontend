import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    Col,
    Row,
    Card,
    CardBody,
    Table,
    Button,
    CardHeader,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    CardFooter
  } from "reactstrap";
import classnames from "classnames";
import { setBreadcrumbItems } from "../../store/actions";
import BarChart from "../../component/MaterialsChart/barchart-raw-quantity";
import InProcessBarChart from "../../component/MaterialsChart/barchart-in-process";
import DountChart from "../../component/MaterialsChart/dountchart-raw-cost";
import MiniCard from "../Dashboard/mini-card";

class Materials extends Component {
    constructor(props) {
        super(props);
        const date = new Date();
        this.state = {
            breadcrumbItems : [
                { title : "Dashboard", link : "#" },
                { title : "Raw Materials", link : "#" }
            ],
            materialActiveTab: "hops",
            reports : [
                { title : "Raw Materials", icon : "mdi-trash-can-outline", result : "0%", value : "$1,700.08", desc : "From previous period", color : "warning" },
                { title : "In-Process", icon : "mdi-buffer", result : "-29%", value : "$46,782", desc : "From previous period", color : "danger" },
                { title : "COGS", icon : "mdi-tag-text-outline", result : "0%", value : "$15,900", desc : "From previous period", color : "warning" },
                { title : "Waste", icon : "mdi-cube-outline", result : "+11%", value : "$20,587", desc : "From previous period", color : "info" },
            ]
        }
    }

    componentDidMount() {
        this.props.setBreadcrumbItems("Materials", this.state.breadcrumbItems);
    }

    toggleMaterialActiveTab(card, tab) {
        switch(card) {
            case "inventory-value":
            case "raw-materials":
            case "in-process":
                if (this.state.materialActiveTab !== tab) {
                    this.setState({
                      materialActiveTab: tab
                    });
                  }
                break;
            default:
                break;
        }
    }

    render() {
        return(
            <React.Fragment>
                <Row>
                    <MiniCard reports={this.state.reports} />
                </Row>
                <Row>
                    <Col md="6" lg="3">
                        <Card>
                            <CardBody>
                                <h4 className="card-title mb-4">Value</h4>
                                <div className="row text-center mt-4">
                                    <div className="col-sm-6">
                                        <h5 className="mb-0 font-size-20">694</h5>
                                        <p className="text-muted">Hops</p>
                                    </div>
                                    <div className="col-sm-6">
                                        <h5 className="mb-0 font-size-20">55210</h5>
                                        <p className="text-muted">Malts</p>
                                    </div>
                                </div>
                                <Nav tabs className="nav-tabs-custom" role="tablist">
                                    <NavItem>
                                    <NavLink
                                    style={{ cursor : "pointer" }}
                                        className={classnames({
                                        active: this.state.materialActiveTab === "hops"
                                        })}
                                        onClick={() => {
                                        this.toggleMaterialActiveTab("raw-materials", "hops");
                                        }}
                                    >
                                                <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                                                <span className="d-none d-sm-block">Hops</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                    <NavLink
                                    style={{ cursor : "pointer" }}
                                        className={classnames({
                                        active: this.state.materialActiveTab === "malts"
                                        })}
                                        onClick={() => {
                                        this.toggleMaterialActiveTab("raw-materials", "malts");
                                        }}
                                    >
                                                <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                                                <span className="d-none d-sm-block">Malts</span>
                                            </NavLink>
                                        </NavItem>
                                    </Nav>

                                    <TabContent activeTab={this.state.materialActiveTab}>
                                        <TabPane tabId="hops" className="p-3">
                                            <DountChart/>
                                        </TabPane>
                                        <TabPane tabId="malts" className="p-3">
                                            <DountChart/>
                                        </TabPane>
                                    </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="6">
                        <Card>
                            <CardBody>
                                <h4 className="card-title mb-4">Raw Materials</h4>
                                <div className="row text-center mt-4">
                                    <div className="col-sm-4">
                                        <h5 className="mb-0 font-size-20">6,940 kg</h5>
                                        <p className="text-muted">Total Hops</p>
                                    </div>
                                    <div className="col-sm-4">
                                        <h5 className="mb-0 font-size-20">55,210 kg</h5>
                                        <p className="text-muted">Total Malts</p>
                                    </div>
                                    <div className="col-sm-4">
                                        <h5 className="mb-0 font-size-20">98 kg</h5>
                                        <p className="text-muted">Other</p>
                                    </div>
                                </div>

                                <Nav tabs className="nav-tabs-custom" role="tablist">
                                    <NavItem>
                                    <NavLink
                                    style={{ cursor : "pointer" }}
                                        className={classnames({
                                        active: this.state.materialActiveTab === "hops"
                                        })}
                                        onClick={() => {
                                        this.toggleMaterialActiveTab("raw-materials", "hops");
                                        }}
                                    >
                                                <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                                                <span className="d-none d-sm-block">Hops</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                    <NavLink
                                    style={{ cursor : "pointer" }}
                                        className={classnames({
                                        active: this.state.materialActiveTab === "malts"
                                        })}
                                        onClick={() => {
                                        this.toggleMaterialActiveTab("raw-materials", "malts");
                                        }}
                                    >
                                                <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                                                <span className="d-none d-sm-block">Malts</span>
                                            </NavLink>
                                        </NavItem>
                                    </Nav>

                                    <TabContent activeTab={this.state.materialActiveTab}>
                                        <TabPane tabId="hops" className="p-3">
                                            <BarChart />
                                        </TabPane>
                                        <TabPane tabId="malts" className="p-3">
                                            <BarChart />
                                        </TabPane>
                                    </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="6" lg="3">
                        <Card>
                            <CardBody>
                                <h4 className="card-title mb-4">In-Process</h4>
                                <div className="row text-center mt-4">
                                    <div className="col-sm-6">
                                        <h5 className="mb-0 font-size-20">694 Kg</h5>
                                        <p className="text-muted">Hops</p>
                                    </div>
                                    <div className="col-sm-6">
                                        <h5 className="mb-0 font-size-20">5,210 Kg</h5>
                                        <p className="text-muted">Malts</p>
                                    </div>
                                </div>
                                <Nav tabs className="nav-tabs-custom" role="tablist">
                                    <NavItem>
                                    <NavLink
                                    style={{ cursor : "pointer" }}
                                        className={classnames({
                                        active: this.state.materialActiveTab === "hops"
                                        })}
                                        onClick={() => {
                                        this.toggleMaterialActiveTab("in-process", "hops");
                                        }}
                                    >
                                                <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                                                <span className="d-none d-sm-block">Hops</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                    <NavLink
                                    style={{ cursor : "pointer" }}
                                        className={classnames({
                                        active: this.state.materialActiveTab === "malts"
                                        })}
                                        onClick={() => {
                                        this.toggleMaterialActiveTab("in-process", "malts");
                                        }}
                                    >
                                                <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                                                <span className="d-none d-sm-block">Malts</span>
                                            </NavLink>
                                        </NavItem>
                                    </Nav>

                                    <TabContent activeTab={this.state.materialActiveTab}>
                                        <TabPane tabId="hops" className="p-3">
                                            <InProcessBarChart/>
                                        </TabPane>
                                        <TabPane tabId="malts" className="p-3">
                                            <InProcessBarChart/>
                                        </TabPane>
                                    </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                <Col md={6}>
                    <Card>
                        <CardBody>
                        <h4 className="card-title float-left">Recent Purchase</h4>
                        <Button type="button" color="primary" className="mb-4 float-right waves-effect waves-light">New Transaction</Button>
                            <div className="mb-3 table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Date</th>
                                            <th>Product Type</th>
                                            <th>Supplier-ID</th>
                                            <th>Lot-ID</th>
                                            <th>Quantity</th>
                                            <th>Cost</th>
                                            <th>Comment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>042</td>
                                            <td>Today</td>
                                            <td>Pale 2 Row Malt</td>
                                            <td>SASKATCHEWAN_FARMS</td>
                                            <td>L03401-1</td>
                                            <td>2000 Kg</td>
                                            <td>$3,750.89</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>041</td>
                                            <td>Today</td>
                                            <td>Chocolate</td>
                                            <td>MANITOBA_ACRES</td>
                                            <td>MN8891-0</td>
                                            <td>4500KG</td>
                                            <td>$7,890.00</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>041</td>
                                            <td>Today</td>
                                            <td>Chocolate</td>
                                            <td>MANITOBA_ACRES</td>
                                            <td>MN8891-0</td>
                                            <td>4500KG</td>
                                            <td>$7,890.00</td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </CardBody>
                        <CardFooter>
                            <Button type="button" outline className="float-right waves-effect waves-light">View Records</Button>
                        </CardFooter>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <CardBody>
                        <h4 className="card-title float-left">Recent Waste</h4>
                        <Button type="button" color="primary" className="mb-4 float-right waves-effect waves-light">New Transaction</Button>
                            <div className="mb-3 table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Date</th>
                                            <th>Product Type</th>
                                            <th>Supplier-ID</th>
                                            <th>Lot-ID</th>
                                            <th>Quantity</th>
                                            <th>Cost</th>
                                            <th>Comment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>042</td>
                                            <td>Today</td>
                                            <td>Pale 2 Row Malt</td>
                                            <td>SASKATCHEWAN_FARMS</td>
                                            <td>L03401-1</td>
                                            <td>2000 Kg</td>
                                            <td>$3,750.89</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>041</td>
                                            <td>Today</td>
                                            <td>Chocolate</td>
                                            <td>MANITOBA_ACRES</td>
                                            <td>MN8891-0</td>
                                            <td>4500KG</td>
                                            <td>$7,890.00</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>041</td>
                                            <td>Today</td>
                                            <td>Chocolate</td>
                                            <td>MANITOBA_ACRES</td>
                                            <td>MN8891-0</td>
                                            <td>4500KG</td>
                                            <td>$7,890.00</td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </CardBody>
                        <CardFooter>
                            <Button type="button" outline className="float-right waves-effect waves-light">View Records</Button>
                        </CardFooter>
                    </Card>
                </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default connect(null, { setBreadcrumbItems })(Materials);