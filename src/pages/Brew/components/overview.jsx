import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Alert, Col, Row } from "reactstrap";
import { Card, CardBody } from "../../../component/Common/Card";
import BrewMiniCard from "./mini-card";
import {
    GravityLine,
    AbvLine,
    TemperatureLine,
    PhLine,
    IngredientsBar,
    IngredientsDoughnut,
    FinishedGoodsBar,
    FinishedGoodsDoughnut,
} from "./charts";
// import { ActiveStageWidget, DaysWidget, ProductWidget } from "./widgets";

export default function BatchOverview() {
    const { id } = useParams();

    const { error } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const ingredients = useSelector((state) => {
        return state.Batch.MaterialPortions.content;
    });

    const finishedGoods = useSelector((state) => {
        return state.Batch.BatchFinishedGoods.content;
    });

    const originalGravity = useSelector((state) => {
        const record = state.Batch.MixtureRecordings.content.find(
            (mr) =>
                mr.measure.name === "gravity" &&
                mr.mixture.brewStage.brew.id === id
        );
        return record ? record.value : 0;
    });

    const gravityRecords = useSelector((state) => {
        return state.Batch.MixtureRecordings.content.filter(
            (mr) =>
                mr.measure.name === "gravity" &&
                mr.mixture.brewStage.brew.id === id
        );
    });

    const abvRecords = useSelector((state) => {
        return state.Batch.MixtureRecordings.content
            .filter(
                (mr) =>
                    mr.measure.name === "gravity" &&
                    mr.mixture.brewStage.brew.id === id
            )
            .map((r) => ({
                ...r,
                value: Math.ceil((originalGravity - r.value) * 131.25),
            }));
    });

    const temperatureRecords = useSelector((state) => {
        return state.Batch.MixtureRecordings.content.filter(
            (mr) =>
                mr.measure.name === "temperature" &&
                mr.mixture.brewStage.brew.id === id
        );
    });

    const phRecords = useSelector((state) => {
        return state.Batch.MixtureRecordings.content.filter(
            (mr) =>
                mr.measure.name === "ph" && mr.mixture.brewStage.brew.id === id
        );
    });

    const props = {
        gravityRecords,
        abvRecords,
        temperatureRecords,
        phRecords,
        ingredients,
        finishedGoods,
    };

    return (
        <React.Fragment>
            {error && (
                <Alert color="info" className="mt-2 mb-4">
                    <strong>Oh snap!</strong> Change a few things up and try
                    submitting again.
                </Alert>
            )}
            <BrewMiniCard />
            <Row>
                <Col sm={6}>
                    <Card>
                        <CardBody>
                            <h4 className="font-size-14 mb-2">
                                Specific Gravity
                            </h4>
                            <GravityLine {...props} />
                        </CardBody>
                    </Card>
                </Col>
                <Col sm={6}>
                    <Card>
                        <CardBody>
                            <h4 className="font-size-14 mb-2">ABV.</h4>
                            <AbvLine {...props} />
                        </CardBody>
                    </Card>
                </Col>
                <Col sm={6}>
                    <Card>
                        <CardBody>
                            <h4 className="font-size-14 mb-2">Temperature</h4>
                            <TemperatureLine {...props} />
                        </CardBody>
                    </Card>
                </Col>
                <Col sm={6}>
                    <Card>
                        <CardBody>
                            <h4 className="font-size-14 mb-2">PH</h4>
                            <PhLine {...props} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                {/* <Col md={6}>
                    <Card>
                        <CardBody>
                            <h4 className="font-size-14 mb-2">Product</h4>
                            <ProductWidget {...props} />
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <h4 className="font-size-14 mb-2">Current Stage</h4>
                            <ActiveStageWidget />
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <h4 className="font-size-14 mb-2">Batch Time</h4>
                            <DaysWidget />
                        </CardBody>
                    </Card>
                </Col> */}
                <Col md={8}>
                    <Card>
                        <CardBody>
                            <h4 className="font-size-14 mb-2">
                                Ingredients Chart
                            </h4>
                            <IngredientsBar {...props} />
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <CardBody>
                            <h4 className="font-size-14 mb-2">
                                Ingredients Portions
                            </h4>
                            <IngredientsDoughnut {...props} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={8}>
                    <Card>
                        <CardBody>
                            <h4 className="font-size-14 mb-2">
                                Finished Goods Chart
                            </h4>
                            <FinishedGoodsBar {...props} />
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <CardBody>
                            <h4 className="font-size-14 mb-2">SKU Portions</h4>
                            <FinishedGoodsDoughnut {...props} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}
