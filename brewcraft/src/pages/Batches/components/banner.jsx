import React from "react";
import {
    Row,
    Col,
    Card,
    CardBody,
    Badge
} from "reactstrap";

export default function Banner() {
    return (
        <Row>
            <Col xl="3" md="6">
                <Card className="mini-stat bg-primary">
                    <CardBody className="mini-stat-img">
                        <div className="mini-stat-icon">
                            <i className={"mdi mdi-barley float-right"}></i>
                        </div>
                        <div className="text-white">
                            <h6 className="text-uppercase font-size-16">Malt Used<br/>Month-to-date</h6>
                            <h2 className="mb-4">20.28 kg</h2>
                            <Badge color="info"> -5.0%</Badge><span className="ml-2">From previous month</span>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xl="3" md="6">
                <Card className="mini-stat bg-primary">
                    <CardBody className="mini-stat-img">
                        <div className="mini-stat-icon">
                            <i className={"mdi mdi-barley float-right"}></i>
                        </div>
                        <div className="text-white">
                            <h6 className="text-uppercase font-size-16">Malt Used<br/>Year-to-date</h6>
                            <h2 className="mb-4">196.1 kg</h2>
                            <Badge color="info"> -5.0%</Badge><span className="ml-2">From previous month</span>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xl="3" md="6">
                <Card className="mini-stat bg-primary">
                    <CardBody className="mini-stat-img">
                        <div className="mini-stat-icon">
                            <i className={"mdi mdi-beer float-right"}></i>
                        </div>
                        <div className="text-white">
                            <h6 className="text-uppercase font-size-16">Finished Brews<br/>Month-to-date</h6>
                            <h2 className="mb-4">5</h2>
                            <Badge color="info"> -5.0%</Badge><span className="ml-2">From previous month</span>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xl="3" md="6">
                <Card className="mini-stat bg-primary">
                    <CardBody className="mini-stat-img">
                    <div className="mini-stat-icon">
                            <i className={"mdi mdi-beer float-right"}></i>
                        </div>
                        <div className="text-white">
                            <h6 className="text-uppercase font-size-16">Finished Brews<br/>Year-to-date</h6>
                            <h2 className="mb-4">37</h2>
                            {/* <Badge color="info"> -35.0%</Badge><span className="ml-2">From previous year</span> */}
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}
