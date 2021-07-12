import React from "react";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    Input,
    Label,
    Badge
} from "reactstrap";

export default function Metadata(brew, editable) {
    return (
        <Card>
            <CardHeader>
                <h4 className="card-title font-size-12 align-middle">Description</h4>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col sm="6">
                        <Row>
                            <Col xs="6">
                                <Label
                                    for="status"
                                    className="mb-3"
                                >
                                    Status
                                </Label>
                            </Col>
                            <Col xs="6">
                                {
                                    editable ?
                                        <Input
                                            type="select"
                                            className="waves-effect"
                                            size="sm"
                                            name="status"
                                        >
                                            <option>Active</option>
                                            <option>Not Active</option>
                                        </Input> : <Badge color="info">Active</Badge>
                                }
                            </Col>

                        </Row>
                    </Col>
                    <Col sm="6">
                        <Row>
                            <Col xs="6">
                                <Label
                                    for="status"
                                    className="mb-3"
                                >
                                    Stage
                                </Label>
                            </Col>
                            <Col xs="6">
                                {
                                    editable ?
                                        <Input
                                            type="stage"
                                            className="waves-effect"
                                            size="sm"
                                            name="status"
                                        >
                                            <option>Wort</option>
                                            <option>Mash</option>
                                            <option>Kettle</option>
                                            <option>Whirlpool</option>
                                            <option>Ferment</option>
                                            <option>Condition</option>
                                            <option>Bright Tank</option>
                                        </Input> : <Badge color="primary">Wort</Badge>
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
                                    for="category.name"
                                    className="mb-3"
                                >
                                    Category
                                </Label>
                            </Col>
                            <Col xs="6">
                                {
                                    editable ?
                                        <Input
                                            type="select"
                                            className="waves-effect"
                                            size="sm"
                                            name="category.name"
                                        >
                                            <option>Lager</option>
                                            <option>Pale Ale</option>
                                            <option>Stout</option>
                                            <option>IPA</option>
                                            <option>Pilsner</option>
                                        </Input> : "Lager"
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs="3">
                        <Label
                            for="description"
                        >
                            Description
                        </Label>
                    </Col>
                    <Col xs="9">
                        <Input
                            type="textarea"
                            className="waves-effect mb-2"
                            defaultValue={brew.description}
                            rows={4}
                            name="description"
                            disabled={!editable}
                        />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
};

