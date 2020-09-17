import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import {
    Col,
    Row,
    Card,
    CardBody,
    TabContent,
    TabPane,
    Collapse,
    NavLink,
    NavItem,
    Nav,
    Button
  } from "reactstrap";
import classnames from "classnames";
import { data } from "../../helpers/providers/materials";
import { MDBDataTable } from "mdbreact";

class RawMaterials extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems : [
                { title : "Dashboard", link : "#" },
                { title : "Raw Materials", link : "#" }
            ],
            customActiveTab: "1"
        }
        this.toggleCustom = this.toggleCustom.bind(this);
    }

    componentDidMount(){
        this.props.setBreadcrumbItems("RawMaterials", this.state.breadcrumbItems);
    }

    toggleCustom(tab) {
        if (this.state.customActiveTab !== tab) {
            this.setState({
                customActiveTab: tab
            });
        }
    }

    render() {
        return(
            <React.Fragment>
                <Row>
                    <Col xl="10">
                        <Nav tabs className="nav-tabs-custom" role="tablist">
                            <NavItem>
                                <NavLink
                                    style={{ cursor: "pointer" }}
                                    className={classnames({
                                        active: this.state.customActiveTab === "1"
                                    })}
                                    onClick={() => {
                                        this.toggleCustom("1");
                                    }}
                                >
                                    <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                                    <span className="d-none d-sm-block">Overview</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    style={{ cursor: "pointer" }}
                                    className={classnames({
                                        active: this.state.customActiveTab === "2"
                                    })}
                                    onClick={() => {
                                        this.toggleCustom("2");
                                    }}
                                >
                                    <span className="d-block d-sm-none"><i className="fas fa-cog"></i></span>
                                    <span className="d-none d-sm-block">Material Types</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    style={{ cursor: "pointer" }}
                                    className={classnames({
                                        active: this.state.customActiveTab === "3"
                                    })}
                                    onClick={() => {
                                        this.toggleCustom("3");
                                    }}
                                >
                                    <span className="d-block d-sm-none"><i className="far fa-envelope"></i></span>
                                    <span className="d-none d-sm-block">New Material</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    style={{ cursor: "pointer" }}
                                    className={classnames({
                                        active: this.state.customActiveTab === "4"
                                    })}
                                    onClick={() => {
                                        this.toggleCustom("4");
                                    }}
                                >
                                    <span className="d-block d-sm-none"><i className="far fa-user"></i></span>
                                    <span className="d-none d-sm-block">New Transaction</span>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.customActiveTab}>
                            <TabPane tabId="1" className="p-3">
                                <Card>
                                    <CardBody>
                                        <h4 className="card-title">All Raw Materials</h4>
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
                            </TabPane>
                            <TabPane tabId="2" className="p-3">
                                <Card>
                                    <CardBody>
                                        {/* <h4 className="card-title">Stripped example</h4>
                                        <p className="card-title-desc">mdbreact DataTables has most features enabled by default, so
                                            all you need to do to use it with your own tables is to call
                                            the construction function:{" "}
                                            <code>&lt;MDBDataTable striped /&gt;</code>.
                                        </p> */}
                                        <MDBDataTable
                                            responsive
                                            bordered
                                            striped
                                            data={data}
                                        />
                                    </CardBody>
                                </Card>
                            </TabPane>
                            <TabPane tabId="3" className="p-3">
                                <p className="mb-0">
                                    Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably haven't heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.
                        </p>
                            </TabPane>
                            <TabPane tabId="4" className="p-3">
                                <p className="mb-0">
                                    Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater. Fanny pack portland seitan DIY, art party locavore wolf cliche high life echo park Austin. Cred vinyl keffiyeh DIY salvia PBR, banh mi before they sold out farm-to-table VHS viral locavore cosby sweater. Lomo wolf viral, mustache readymade thundercats keffiyeh craft beer marfa ethical. Wolf salvia freegan, sartorial keffiyeh echo park vegan.
                        </p>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
                <Row>
                    <Col xl="10">

                    </Col>
                </Row>

                <Row>
                    <Col xs="12">

                    </Col>
                </Row>
            </React.Fragment>
            );
        }
    }

    export default connect(null, { setBreadcrumbItems })(RawMaterials);
