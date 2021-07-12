import React from "react";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    Input,
    Label
} from "reactstrap";

export default function BrewDetails(brew, editable) {
    return (
        <Card>
            <CardHeader>
                <h4 className="card-title font-size-12 align-middle">Brew Details</h4>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col sm="6">
                        <Row>
                            <Col xs="6">
                                <Label
                                    for="abv"
                                    className="mb-3"
                                >
                                    ABV.
                                </Label>
                            </Col>
                            <Col xs="6">
                                {
                                    editable ?
                                        <Input
                                            type="text"
                                            className="waves-effect mb-2"
                                            size="sm"
                                            defaultValue={brew.abv}
                                            name="abv"
                                        /> : brew.abv
                                }
                            </Col>
                        </Row>
                    </Col>
                    <Col sm="6">
                        <Row>
                            <Col xs="6">
                                <Label
                                    for="ph"
                                    className="mb-3"
                                >
                                    PH
                                </Label>
                            </Col>
                            <Col xs="6">
                                {
                                    editable ?
                                        <Input
                                            type="text"
                                            className="waves-effect mb-2"
                                            size="sm"
                                            defaultValue={brew.ph}
                                            name="ph"
                                        /> : brew.ph
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col sm="6">
                        <Row>
                            <Col xs="6">
                                <Label
                                    for="ibu"
                                    className="mb-3"
                                >
                                    IBU
                                </Label>
                            </Col>
                            <Col xs="6">
                                {
                                    editable ?
                                        <Input
                                            type="text"
                                            className="waves-effect mb-2"
                                            size="sm"
                                            defaultValue={brew.ibu}
                                            name="ibu"
                                        /> : brew.ibu
                                }
                            </Col>
                        </Row>
                    </Col>
                    <Col sm="6">
                        <Row>
                            <Col xs="6">
                                <Label
                                    for="yield"
                                    className="mb-3"
                                >
                                    Yield
                                </Label>
                            </Col>
                            <Col xs="6">
                                {
                                    editable ?
                                        <Input
                                            type="text"
                                            className="waves-effect mb-2"
                                            size="sm"
                                            defaultValue={brew.yield}
                                            name="yield"
                                        /> : brew.yield
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col sm="6">
                        <Row>
                            <Col xs="6">
                                <Label
                                    for="mashTemperature"
                                    className="mb-3"
                                >
                                    Mash Temperature
                                </Label>
                            </Col>
                            <Col xs="6">
                                {
                                    editable ?
                                        <Input
                                            type="text"
                                            className="waves-effect mb-2"
                                            size="sm"
                                            defaultValue={brew.mashTemperature}
                                            name="mashTemperature"
                                        /> : brew.mashTemperature
                                }
                            </Col>
                        </Row>
                    </Col>
                    <Col sm="6">
                        <Row>
                            <Col xs="6">
                                <Label
                                    for="gravity"
                                    className="mb-3"
                                >
                                    Gravity
                                </Label>
                            </Col>
                            <Col xs="6">
                                {
                                    editable ?
                                        <Input
                                            type="text"
                                            className="waves-effect mb-2"
                                            size="sm"
                                            defaultValue={brew.gravity}
                                            name="gravity"
                                        /> : brew.gravity
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col sm="6">
                        <Row>
                            <Col xs="6">
                                <Label
                                    for="fermentationDays"
                                    className="mb-3"
                                >
                                    Fermentation Days
                                </Label>
                            </Col>
                            <Col xs="6">
                                {
                                    editable ?
                                        <Input
                                            type="text"
                                            className="waves-effect mb-2"
                                            size="sm"
                                            defaultValue={brew.fermentationDays}
                                            name="fermentationDays"
                                        /> : brew.fermentationDays
                                }
                            </Col>
                        </Row>
                    </Col>
                    <Col sm="6">
                        <Row>
                            <Col xs="6">
                                <Label
                                    for="conditioningDays"
                                    className="mb-3"
                                >
                                    Conditioning Days
                                </Label>
                            </Col>
                            <Col xs="6">
                                {
                                    editable ?
                                        <Input
                                            type="text"
                                            className="waves-effect mb-2"
                                            size="sm"
                                            defaultValue={brew.conditioningDays}
                                            name="conditioningDays"
                                        /> : brew.conditioningDays
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col sm="6">
                        <Row>
                            <Col xs="6">
                                <Label
                                    for="brewhouseDuration"
                                    className="mb-3"
                                >
                                    Brewhouse Duration
                                </Label>
                            </Col>
                            <Col xs="6">
                                {
                                    editable ?
                                        <Input
                                            type="text"
                                            className="waves-effect mb-2"
                                            size="sm"
                                            defaultValue={brew.brewhouseDuration}
                                            name="brewhouseDuration"
                                        /> : brew.brewhouseDuration
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}