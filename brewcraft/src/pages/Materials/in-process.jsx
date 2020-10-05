import React, { Component } from "react";
import { useDispatch, connect } from "react-redux";
import {
    Col,
    Row,
    Card,
    CardBody
} from "reactstrap";
import { setBreadcrumbItems } from "../../store/actions";
import {
    formatCurrency,
    formatPercent,
    formatWeightKG
} from "../../helpers/textUtils";
import MiniCard from "../Dashboard/mini-card";
import InProcessTable from "./in-process-table";

class InProcess extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.setBreadcrumbItems("In-Process Materials", [
            { title: "Dashboard", link: "/dashboard" },
            { title: "Materials", link: "/materials" },
        ]);
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <MiniCard reports={this.props.reports}/>
                </Row>
                <Row>
                    <Col md={3}>
                    </Col>
                    <Col md={9}>
                        <Card>
                            <CardBody>
                                <h4 className="card-title mb-4">In-Process Materials</h4>
                                <InProcessTable isOpen={isMenuOpen.bind(this)} toggleMenu={toggleMenu.bind(this)}/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
};

const isMenuOpen = function(cat, type) {
    return !!(this.state[cat] && this.state[cat][type]);
};

const toggleMenu = function(cat, type) {
    this.setState(prev => ({
        [cat]: {
            ...prev[cat],
            [type]: !(prev[cat] && prev[cat][type])
        }}));
};

const mapStatetoProps = state => {
    const Materials = state.Materials;
    return {
        reports: [
            {
                title: "Hops In-Process",
                icon: "mdi-cube-outline",
                desc: "Combined weight",
                value: formatCurrency(Materials.RawMaterial.value),
                result: formatWeightKG(Materials.RawMaterial.value_increase),
                color: "info"
            },
            {
                title: "Malts In-Process",
                icon: "mdi-cube",
                desc: "Combined weight",
                value: formatCurrency(500),
                result: formatWeightKG(20),
                color: "info"
            },
            {
                title : "MTD Hops Used",
                icon : "mdi-tag-text-outline",
                desc : "From previous month",
                value: formatCurrency(Materials.Used.mtd_value),
                result: formatPercent(Materials.Used.mtd_increase),
                color: Materials.Used.mtd_increase > 0 ? "info" : "warning"
            },
            {
                title : "MTD Malts Used",
                icon : "mdi-trash-can-outline",
                desc : "From previous month",
                value: formatCurrency(Materials.Wasted.mtd_value),
                result: formatPercent(Materials.Wasted.mtd_increase),
                color: Materials.Wasted.mtd_increase > 0 ? "info" : "warning"
            }
        ]
    };
};

export default connect(mapStatetoProps, {setBreadcrumbItems})(InProcess);
