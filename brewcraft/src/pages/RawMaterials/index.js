import React, { Component } from 'react';
import { connect, Provider } from "react-redux";
import {
    setBreadcrumbItems,
    setRawMaterialItems
} from "../../store/actions";
import {
    Col,
    Row,
    Card,
    CardBody,
    Table,
    Button,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    CardFooter
  } from "reactstrap";
import classnames from "classnames";
import BarChart from "../../component/MaterialsChart/barchart-raw-quantity";
import InProcessBarChart from "../../component/MaterialsChart/barchart-in-process";
import DountChart from "../../component/MaterialsChart/dountchart-raw-cost";
import TransactionTable from "../../component/TransactionsTable";
import MiniCard from "../Dashboard/mini-card";
import DataProvider from "../../providers/raw-materials";

class RawMaterials extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems : [
                { title : "Dashboard", link : "#" },
                { title : "Raw Materials", link : "#" }
            ]
        }
    }

    componentDidMount() {
        this.props.setBreadcrumbItems("Overview", this.state.breadcrumbItems);
        DataProvider.fetchOverview()
            .then(oData => {
                this.props.setRawMaterialItems(oData);
            });
    }

    render() {
        return(
            <React.Fragment>
                <Row>
                    <MiniCard reports={this.props.reports} />
                </Row>
                <Row>
                    <Col md="6" lg="3">
                        <Card>
                            <CardBody>
                                <h4 className="card-title mb-4">{this.props.total_value.title}</h4>
                                <div className="row text-center mt-4">
                                    {this.props.total_value.stats.map(stat => (
                                        <div className="col-sm-6">
                                            <h5 className="mb-0 font-size-20">{stat.value}</h5>
                                            <p className="text-muted">{stat.title}</p>
                                        </div>
                                    ))}
                                </div>
                                <Nav tabs className="nav-tabs-custom" role="tablist">
                                    {this.props.total_value.tabs.map(tab => (
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor : "pointer" }}
                                                className={classnames({
                                                    active: this.props.total_value.active_tab === tab.key
                                                })}
                                                onClick={() => {
                                                    this.props.setRawMaterialItems({
                                                        total_value: {
                                                            ...this.props.total_value,
                                                            active_tab: tab.key
                                                        }
                                                    });
                                                }}
                                            >
                                                <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                                                <span className="d-none d-sm-block">{tab.title}</span>
                                            </NavLink>
                                        </NavItem>
                                    ))}
                                </Nav>
                                <TabContent activeTab={this.props.total_value.active_tab}>
                                    <TabPane tabId="hops" className="p-3">
                                        <DountChart data={this.props.total_value.data.hops} />
                                    </TabPane>
                                    <TabPane tabId="malts" className="p-3">
                                    <DountChart data={this.props.total_value.data.malts} />
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
                                    {this.props.raw_materials.stats.map(stat => (
                                        <div className="col-sm-4">
                                            <h5 className="mb-0 font-size-20">{stat.value}</h5>
                                            <p className="text-muted">{stat.title}</p>
                                        </div>
                                    ))}
                                </div>
                                <Nav tabs className="nav-tabs-custom" role="tablist">
                                    {this.props.raw_materials.tabs.map(tab => (
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor : "pointer" }}
                                                className={classnames({
                                                    active: this.props.raw_materials.active_tab === tab.key
                                                })}
                                                onClick={() => {
                                                    this.props.setRawMaterialItems({
                                                        raw_materials: {
                                                            ...this.props.raw_materials,
                                                            active_tab: tab.key
                                                        }
                                                    });
                                                }}
                                            >
                                                <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                                                <span className="d-none d-sm-block">{tab.title}</span>
                                            </NavLink>
                                        </NavItem>
                                    ))}
                                </Nav>
                                <TabContent activeTab={this.props.raw_materials.active_tab}>
                                    <TabPane tabId="hops" className="p-3">
                                        <BarChart data={this.props.raw_materials.data.hops} />
                                    </TabPane>
                                    <TabPane tabId="malts" className="p-3">
                                        <BarChart data={this.props.raw_materials.data.malts} />
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
                                    {this.props.in_process.stats.map(stat => (
                                        <div className="col-sm-6">
                                            <h5 className="mb-0 font-size-20">{stat.value}</h5>
                                            <p className="text-muted">{stat.title}</p>
                                        </div>
                                    ))}
                                </div>
                                <Nav tabs className="nav-tabs-custom" role="tablist">
                                    {this.props.in_process.tabs.map(tab => (
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor : "pointer" }}
                                                className={classnames({
                                                    active: this.props.in_process.active_tab === tab.key
                                                })}
                                                onClick={() => {
                                                    this.props.setRawMaterialItems({
                                                        in_process: {
                                                            ...this.props.in_process,
                                                            active_tab: tab.key
                                                        }
                                                    });
                                                }}
                                            >
                                                <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                                                <span className="d-none d-sm-block">{tab.title}</span>
                                            </NavLink>
                                        </NavItem>
                                    ))}
                                </Nav>
                                <TabContent activeTab={this.props.in_process.active_tab}>
                                        <TabPane tabId="hops" className="p-3">
                                            <InProcessBarChart data={this.props.in_process.data.hops} />
                                        </TabPane>
                                        <TabPane tabId="malts" className="p-3">
                                            <InProcessBarChart data={this.props.in_process.data.malts} />
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
                            <TransactionTable {...this.props.purchases} />
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
                            <TransactionTable {...this.props.waste} />
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

const mapStatetoProps = state => {
    const Overview = state.Brewery.modules.raw_materials.overview;
    return {
        ...Overview,
        reports: [
            {
                title: "Raw Materials",
                icon: "mdi-cube-outline",
                desc : "From previous period",
                color: "info",
                ...Overview.mini_card.raw_materials
            },
            {
                title: "In-Process",
                icon: "mdi-cube",
                desc : "From previous period",
                color: "info",
                ...Overview.mini_card.in_process
            },
            {
                title : "COGS",
                icon : "mdi-tag-text-outline",
                desc : "From previous period",
                color: "info",
                ...Overview.mini_card.cogs
            },
            {
                title : "Waste",
                icon : "mdi-trash-can-outline",
                desc : "From previous period",
                color: "info",
                ...Overview.mini_card.waste
            }
        ]
    };
};

export default connect(mapStatetoProps, { setBreadcrumbItems, setRawMaterialItems })(RawMaterials);
