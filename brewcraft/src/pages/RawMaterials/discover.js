import React, { Component } from 'react';
import { connect } from "react-redux";
import { setBreadcrumbItems, setRawMaterialDiscover } from "../../store/actions";
import DataProvider from "../../providers/raw-materials";
import DountChart from "../../component/MaterialsChart/dountchart";
import {
    UncontrolledAlert,
    Col,
    Row,
    Card,
    CardBody,
  } from "reactstrap";
import Select from "react-select";
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
            ]
        }
    }

    componentDidMount() {
        this.props.setBreadcrumbItems("Discover", this.state.breadcrumbItems);
        DataProvider.fetchDiscover()
            .then(oData => {
                this.props.setRawMaterialDiscover(oData);
            });
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
                        onChange={(option) => {
                            this.props.setRawMaterialDiscover({
                                material_type: {
                                    ...this.props.material_type,
                                    value: option.value
                                }
                            });
                        }}
                        placeholder="Material Type ..."
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={this.props.material_type.value}
                        options={this.props.material_type.options}
                    />
                    </div>
                    <div className="pl-2 mb-3" style={{ width: "50%", display: 'inline-block'}} >
                    <Select
                        onChange={(option) => {
                            this.props.setRawMaterialDiscover({
                                ...this.props,
                                material: option ? option.value : null
                            });
                        }}
                        placeholder="Material ..."
                        isMulti={true}
                        options={this.props.material.options}
                        className="select2 select2-multiple"
                    />
                    </div>
                    </Col>
                    <Col md={6} sm={12}>
                        <UncontrolledAlert color="info">
                            <strong>Heads up!</strong> You can filter the date period by selecting a <strong>begining date</strong> and an <strong>ending date</strong> below.
                        </UncontrolledAlert>
                        <div className="mb-3 float-right">
                            <RangePicker
                                startDate={this.props.begin_date}
                                endDate={this.props.end_date}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <MiniCard reports={this.props.reports} />
                </Row>
                <Row>
                    <Col md={4}>
                        <Card>
                            <CardBody>
                                <h4 className="card-title mb-4">Value</h4>
                                <div className="row text-center mt-4">
                                    {this.props.inventory_value.stats.map(stat => (
                                        <div className="col-sm-6">
                                            <h5 className="mb-0 font-size-20">{stat.value}</h5>
                                            <p className="text-muted">{stat.text}</p>
                                        </div>
                                    ))}
                                </div>
                                <DountChart data={this.props.inventory_value} />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Card>
                            <CardBody>
                                <h4 className="card-title mb-4">Raw Materials</h4>
                                <div className="row text-center mt-4">
                                    {this.props.inventory_quantity.stats.map(stat => (
                                        <div className="col-sm-4">
                                            <h5 className="mb-0 font-size-20">{stat.value}</h5>
                                            <p className="text-muted">{stat.text}</p>
                                        </div>
                                    ))}
                                </div>
                                <BarChart data={this.props.inventory_quantity}/>
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
                                        data={this.props.records.data}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const Discover = state.Brewery.modules.raw_materials.discover;
    return {
        ...Discover,
        reports: [
            {
                title: "Inventory",
                icon: "mdi-cube-outline",
                desc : "From previous period",
                color: "info",
                ...Discover.mini_card.raw_materials
            },
            {
                title: "Purchases",
                icon: "mdi-cube",
                desc : "From previous period",
                color: "info",
                ...Discover.mini_card.in_process
            },
            {
                title : "COGS",
                icon : "mdi-tag-text-outline",
                desc : "From previous period",
                color: "info",
                ...Discover.mini_card.cogs
            },
            {
                title : "Waste",
                icon : "mdi-trash-can-outline",
                desc : "From previous period",
                color: "info",
                ...Discover.mini_card.waste
            }
        ]
    };
};

export default connect(mapStatetoProps, { setBreadcrumbItems, setRawMaterialDiscover })(Discover);