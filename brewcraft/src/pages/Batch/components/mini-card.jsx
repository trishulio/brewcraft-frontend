import React, { Component } from 'react';
import { Col, Card, CardBody, Badge } from "reactstrap";
import { useSelector } from 'react-redux';

export default function BrewMiniCard() {

    const { KettleMixture, WhirlpoolMixture } = useSelector(state => {
        return state.Batch;
    });

    return (
        <React.Fragment>
            <Col xl="3" md="6">
                <Card className="mini-stat bg-primary">
                    <CardBody className="mini-stat-img">
                        <div className="mini-stat-icon">
                            <i className={"mdi mdi-arrow-up-box float-right"}></i>
                        </div>
                        <div className="text-white">
                            <h6 className="text-uppercase font-size-16">Wort<br/>Volume</h6>
                            <h2 className="mb-4">
                                {
                                    WhirlpoolMixture.data.quantity.value ? `${WhirlpoolMixture.data.quantity.value} ${WhirlpoolMixture.data.quantity.symbol}` : "-"
                                }
                            </h2>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xl="3" md="6">
                <Card className="mini-stat bg-primary">
                    <CardBody className="mini-stat-img">
                        <div className="mini-stat-icon">
                            <i className={"mdi mdi-clipboard-text-outline float-right"}></i>
                        </div>
                        <div className="text-white">
                            <h6 className="text-uppercase font-size-16">Original<br/>Gravity</h6>
                            <h2 className="mb-4">-</h2>
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
                            <h6 className="text-uppercase font-size-16">Malt Used<br/>&nbsp;</h6>
                            <h2 className="mb-4">-</h2>
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
                            <h6 className="text-uppercase font-size-16">Cost of<br/>Brew</h6>
                            <h2 className="mb-4">-</h2>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
}
