import React, { Component } from 'react';
import { connect } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { Link } from "react-router-dom";
import DataProvider from "../../providers/raw-materials";
import DountChart from "../AllCharts/chartjs/dountchart";
import {
    Alert,
    UncontrolledAlert,
    Col,
    Row,
    Card,
    CardBody,
    TabContent,
    TabPane,
    NavLink,
    NavItem,
    Nav,
    Table,
    Form,
    FormGroup,
    Label,
    Input,
    InputGroupAddon,
    InputGroup,
  } from "reactstrap";
import Select from "react-select";
import classnames from "classnames";
import { MDBDataTable } from "mdbreact";
import BarChart from "../../component/MaterialsChart/barchart-discover";
import MiniCard from "../Dashboard/mini-card";
import RangePicker from "../../component/RangePicker";

class Discover extends Component {
    constructor(props) {
        super(props);
        const date = new Date();
        this.state = {
            breadcrumbItems : [
                { title : "Dashboard", link : "#" },
                { title : "Raw Materials", link : "#" }
            ],
            reports : [
                { title : "Waste", icon : "mdi-trash-can-outline", result : "0%", value : "$1,700.08", desc : "From previous period", color : "warning" },
                { title : "Purchased", icon : "mdi-buffer", result : "-29%", value : "$46,782", desc : "From previous period", color : "danger" },
                { title : "Converted", icon : "mdi-tag-text-outline", result : "0%", value : "$15,900", desc : "From previous period", color : "warning" },
                { title : "Book Value", icon : "mdi-cube-outline", result : "+11%", value : "$20,587", desc : "From previous period", color : "info" },
            ],
            startDate: new Date(date.getFullYear(), date.getMonth(), 1),
            endDate: date
        }
    }

    componentDidMount() {
        this.props.setBreadcrumbItems("Discover", this.state.breadcrumbItems);
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col md={6}>
                    <UncontrolledAlert color="info">
                            <strong>Heads up!</strong> You can narrow the results by selecting <strong>Material Type</strong> or by selecting <strong>Material</strong> below.
                    </UncontrolledAlert>
                    <div className="pr-2 mb-3" style={{ width: "50%", display: 'inline-block'}} >
                    <Select
                        value={null}
                        placeholder="Material Type .."
                        // onChange={this.handleSelectGroup}
                        options={[{
                            label: "Picnic",
                            options: [
                              { label: "Mustard", value: "Mustard" },
                              { label: "Ketchup", value: "Ketchup" },
                              { label: "Relish", value: "Relish" }
                            ]
                          }]}
                        className="select2 select2-multiple"
                    />
                    </div>
                    <div className="pl-2 mb-3" style={{ width: "50%", display: 'inline-block'}} >
                    <Select
                        value={null}
                        // onChange={this.handleSelectGroup}
                        placeholder="Material .."
                        isMulti={true}
                        options={[{
                            label: "Picnic",
                            options: [
                              { label: "Mustard", value: "Mustard" },
                              { label: "Ketchup", value: "Ketchup" },
                              { label: "Relish", value: "Relish" }
                            ]
                          }]}
                        className="select2"
                    />
                    </div>
                    </Col>
                    <Col md={6} sm={12}>
                        <UncontrolledAlert color="info">
                            <strong>Heads up!</strong> You can filter the date period by selecting a <strong>begining date</strong> and an <strong>ending date</strong> below.
                        </UncontrolledAlert>
                        <div className="mb-3 float-right">
                            <RangePicker
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <MiniCard reports={this.state.reports} />
                </Row>
                <Row>
                    <Col md={4}>
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
                                <DountChart/>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={8}>
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
                                <BarChart/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                        <Col xs="12">
                            <Card>
                                <CardBody>
                                    <h4 className="mb-4 card-title">Transactions</h4>
                                    <MDBDataTable
                                        responsive
                                        bordered
                                        striped
                                        data={DataProvider.data}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
            </React.Fragment>
        );
    }
}

export default connect(null, { setBreadcrumbItems })(Discover);