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
    Table,
    Form,
    FormGroup,
    Label,
    Input,
    InputGroupAddon,
    InputGroup,
  } from "reactstrap";
import DatePicker from "react-datepicker";
import classnames from "classnames";
import { MDBDataTable } from "mdbreact";
import MiniCard from "../Dashboard/mini-card";
import RangePicker from "../../component/RangePicker";

class Materials extends Component {
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

    render() {
        return (
            <React.Fragment>

                <Row>
                    <Col md={{ size: 6, offset: 6 }} sm={12}>
                        <RangePicker
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                        />
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default connect(null, { setBreadcrumbItems })(Materials);