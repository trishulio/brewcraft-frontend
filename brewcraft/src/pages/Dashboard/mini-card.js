import React, { Component } from 'react';
import { Col, Card, CardBody, Badge, Button } from "reactstrap";
import { Link } from "react-router-dom";
class MiniCard extends Component {
    render() {
        return (
            <React.Fragment>
                <Col xl="3" md="6">
                    <Card className="mini-stat bg-primary">
                        <CardBody className="mini-stat-img">
                            <div className="mini-stat-icon">
                                <i className={"mdi mdi-currency-usd float-right"}></i>
                            </div>
                            <div className="text-white">
                                <h6 className="text-uppercase font-size-16">Gross Duty<br/>Month-to-date</h6>
                                <h2 className="mb-4">$1,020.28</h2>
                                <Badge color="info"> -5.0%</Badge><span className="ml-2">From previous month</span>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="3" md="6">
                    <Card className="mini-stat bg-primary">
                        <CardBody className="mini-stat-img">
                            <div className="mini-stat-icon">
                                <i className={"mdi mdi-currency-usd float-right"}></i>
                            </div>
                            <div className="text-white">
                                <h6 className="text-uppercase font-size-16">Net Duty<br/>Year-to-date</h6>
                                <h2 className="mb-4">$23,508.19</h2>
                                <Badge color="info"> -0.02%</Badge><span className="ml-2">From previous year</span>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="3" md="6">
                    <Card className="mini-stat bg-primary">
                        <CardBody className="mini-stat-img">
                            <div className="mini-stat-icon">
                                <i className={"mdi mdi-package-variant-closed float-right"}></i>
                            </div>
                            <div className="text-white">
                                <h6 className="text-uppercase font-size-16">Total Packaged<br/>Month-to-date</h6>
                                <h2 className="mb-4">284.0hl</h2>
                                <Badge color="warning"> -15.6%</Badge><span className="ml-2">From previous month</span>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="3" md="6">
                    <Card className="mini-stat bg-primary">
                        <CardBody className="mini-stat-img">
                            <div className="mini-stat-icon">
                                <i className={"mdi mdi-currency-usd float-right"}></i>
                            </div>
                            <div className="text-white">
                                <h6 className="text-uppercase font-size-16">Unclaimed Refund<br/>Amount</h6>
                                <h2 className="mb-4">$89,223</h2>
                                <Link to="#" style={{color:"#ffffff", fontWeight:"bold"}}>Learn more <i className="mdi mdi-chevron-double-right"></i></Link>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </React.Fragment>
        );
    }
}

export default MiniCard;