import React, { Component } from 'react';
import { Col, Card, CardBody, Badge } from "reactstrap";

class MiniCard extends Component {
    render() {
        return (
            <React.Fragment>
                <Col xl="3" md="6">
                    <Card className="mini-stat bg-primary">
                        <CardBody className="mini-stat-img">
                            <div className="mini-stat-icon">
                                <i className={"mdi mdi-package-variant-closed float-right"}></i>
                            </div>
                            <div className="text-white">
                                <h6 className="text-uppercase font-size-16">Finished Goods</h6>
                                <h2 className="mb-4">594.9 HL</h2>
                                <Badge color="info"> +5%</Badge><span className="ml-2">From previous period</span>
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
                                <h6 className="text-uppercase font-size-16">Reserved Inventory</h6>
                                <h2 className="mb-4">284.0 HL</h2>
                                <Badge color="warning"> +15.6%</Badge><span className="ml-2">Above average</span>
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
                                <h6 className="text-uppercase font-size-16">Cost of Goods</h6>
                                <h2 className="mb-4">$89,223</h2>
                                <Badge color="info"> +4.5%</Badge><span className="ml-2">From previous month</span>
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
                                <h6 className="text-uppercase font-size-16">Sales</h6>
                                <h2 className="mb-4">$23,508</h2>
                                <Badge color="info"> -0.02%</Badge><span className="ml-2">From previous month</span>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </React.Fragment>
        );
    }
}

export default MiniCard;