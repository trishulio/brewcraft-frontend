import React, { Component } from 'react';
import { connect } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import {
    UncontrolledAlert,
    Col,
    Row,
    Card,
    CardBody,
  } from "reactstrap";
import Select from "react-select";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from "react-bootstrap-table2-editor";
import RangePicker from "../../component/RangePicker";

class Records extends Component {
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
            endDate: date,
            products: [
                { receipt_id: "SASK04910-1", date: date.toDateString(), type: "Hops", qty: 1, cost: "$190", supplier: "Saskatchewan Farms" },
                { receipt_id: "MAN3556-F", date: date.toDateString(), type: "Hops", qty: 2, cost: "$290", supplier: "Manitoba Acres" },
                { receipt_id: "SASK0440-1", date: date.toDateString(), type: "Malt", qty: 3, cost: "$34,000", supplier: "Saskatchewan Farms" },
                { receipt_id: "SASK0423-1", date: date.toDateString(), type: "Hops", qty: 4, cost: "$320", supplier: "Saskatchewan Farms" },
                { receipt_id: "MAN3243-FD", date: date.toDateString(), type: "Yeast", qty: 5, cost: "$59", supplier: "Manitoba Acres" }
            ],
            columns: [
                {
                    dataField: "date",
                    text: "Date Received"
                },
                {
                    dataField: "receipt_id",
                    text: "Order Id"
                },
                {
                    dataField: "supplier",
                    text: "Supplier"
                },
                {
                  dataField: "type",
                  text: "Material"
                },
                {
                  dataField: "qty",
                  text: "Quantity"
                },
                {
                  dataField: "cost",
                  text: "Cost"
                }
            ]
        }
    }

    componentDidMount() {
        this.props.setBreadcrumbItems("Records", this.state.breadcrumbItems);
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
                        <Col xs="12">
                            <Card>
                                <CardBody>
                                    <h4 className="card-title">Transactions</h4>
                                    <BootstrapTable
                                        keyField="id"
                                        data={this.state.products}
                                        columns={this.state.columns}
                                        cellEdit={cellEditFactory({ mode: "click" })}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
            </React.Fragment>
        );
    }
}

export default connect(null, { setBreadcrumbItems })(Records);