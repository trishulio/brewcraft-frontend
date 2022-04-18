import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { Card, CardBody } from "../../../component/Common/Card";
import BrewMiniCard from "./mini-card";
import {
    AbvLine,
    IngredientsBar,
    IngredientsDoughnut,
    FinishedGoodsBar,
    FinishedGoodsDoughnut,
} from "./common/charts";
import { useEffect } from "react";

export default function BatchOverview() {
    const [batchId, setBatchId] = useState("");

    const { id } = useParams();

    useEffect(() => {
        setBatchId(parseInt(id));
    }, [id]);

    const ingredients = useSelector((state) => {
        return state.Batch.MaterialPortions.content;
    });

    const skuLots = useSelector((state) => {
        return state.Batch.BatchFinishedGoods.content;
    });

    const originalGravity = useSelector((state) => {
        const record = state.Batch.MixtureRecordings.content.find(
            (mr) =>
                mr.measure.name === "gravity" &&
                mr.mixture.brewStage.brew.id === batchId
        );
        return record ? record.value : 0;
    });

    const gravityRecords = useSelector((state) => {
        return state.Batch.MixtureRecordings.content.filter(
            (mr) =>
                mr.measure.id === 5 && mr.mixture.brewStage.brew.id === batchId
        );
    });

    const abvRecords = useSelector((state) => {
        return state.Batch.MixtureRecordings.content
            .filter(
                (mr) =>
                    mr.measure.name === "gravity" &&
                    mr.mixture.brewStage.brew.id === batchId
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
                mr.mixture.brewStage.brew.id === batchId
        );
    });

    const phRecords = useSelector((state) => {
        return state.Batch.MixtureRecordings.content.filter(
            (mr) =>
                mr.measure.name === "ph" &&
                mr.mixture.brewStage.brew.id === batchId
        );
    });

    const props = {
        gravityRecords,
        abvRecords,
        temperatureRecords,
        phRecords,
        ingredients,
        skuLots,
    };

    return (
        <React.Fragment>
            <BrewMiniCard />
            <Row>
                <Col sm={6}>
                    <Card>
                        <CardBody>
                            <h4 className="font-size-14 mb-2">ABV.</h4>
                            <AbvLine {...props} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
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
