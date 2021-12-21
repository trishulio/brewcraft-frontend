import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";

export default function IngredientsInfo() {
    return (
        <Row>
            <Col xl="3" md="6">
                <Card className="mini-stat bg-primary">
                    <CardBody className="mini-stat-img">
                        <div className="mini-stat-icon">
                            <i
                                className={
                                    "mdi mdi-package-variant float-right"
                                }
                            ></i>
                        </div>
                        <div className="text-white">
                            <h6 className="text-uppercase font-size-16">
                                Available Inventory
                            </h6>
                            <h2>310.9 HL</h2>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xl="3" md="6">
                <Card className="mini-stat bg-primary">
                    <CardBody className="mini-stat-img">
                        <div className="mini-stat-icon">
                            <i
                                className={
                                    "mdi mdi-package-variant-closed float-right"
                                }
                            ></i>
                        </div>
                        <div className="text-white">
                            <h6 className="text-uppercase font-size-16">
                                Reserved Inventory
                            </h6>
                            <h2>284.0 HL</h2>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xl="3" md="6">
                <Card className="mini-stat bg-primary">
                    <CardBody className="mini-stat-img">
                        <div className="mini-stat-icon">
                            <i className={"mdi mdi-package float-right"}></i>
                        </div>
                        <div className="text-white">
                            <h6 className="text-uppercase font-size-16">
                                Total Inventory
                            </h6>
                            <h2>594.9 HL</h2>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xl="3" md="6">
                <Card className="mini-stat bg-primary">
                    <CardBody className="mini-stat-img">
                        <div className="mini-stat-icon">
                            <i
                                className={"mdi mdi-currency-usd float-right"}
                            ></i>
                        </div>
                        <div className="text-white">
                            <h6 className="text-uppercase font-size-16">
                                COGS
                            </h6>
                            <h2>$89,223</h2>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}
