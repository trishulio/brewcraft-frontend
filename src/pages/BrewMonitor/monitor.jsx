import React from "react";
import { useSelector } from "react-redux";
import { Alert, Col, Row } from "reactstrap";
import BrewMiniCard from "./components/mini-card";
import {
    GravityLine,
    AbvLine,
    TemperatureLine,
    PhLine,
    IngredientsBar,
    IngredientsDoughnut,
    FinishedGoodsBar,
    FinishedGoodsDoughnut,
} from "./components/charts";
import {
    ActiveStageWidget,
    DaysWidget,
    ProductWidget,
} from "./components/widgets";
import { Card, CardBody } from "../../component/Common/Card";
import Toolbar from "./components/toolbar";

export default function BatchMetadata({
    gravityRecords,
    abvRecords,
    temperatureRecords,
    phRecords,
}) {
    const { error } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const ingredients = useSelector((state) => {
        return [
            ...state.Batch.MashMaterialPortion.content,
            ...state.Batch.KettleMaterialPortion.content,
            ...state.Batch.FermentMaterialPortion.content,
            // ...state.Batch.ConditionMaterialPortion.content,
            // ...state.Batch.BriteTanksMaterialPortion.content,
        ];
    });

    const finishedGoods = useSelector((state) => {
        return state.Batch.FermentFinishedGoods.content;
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
            <Toolbar />
            <BrewMiniCard />
            <Row>
                <Col sm={6} xl={3}>
                    <Card>
                        <CardBody>
                            <h4 className="font-size-14 mb-2">
                                Specific Gravity
                            </h4>
                            <GravityLine {...props} />
                        </CardBody>
                    </Card>
                </Col>
                <Col sm={6} xl={3}>
                    <Card>
                        <CardBody>
                            <h4 className="font-size-14 mb-2">ABV.</h4>
                            <AbvLine {...props} />
                        </CardBody>
                    </Card>
                </Col>
                <Col sm={6} xl={3}>
                    <Card>
                        <CardBody>
                            <h4 className="font-size-14 mb-2">Temperature</h4>
                            <TemperatureLine {...props} />
                        </CardBody>
                    </Card>
                </Col>
                <Col sm={6} xl={3}>
                    <Card>
                        <CardBody>
                            <h4 className="font-size-14 mb-2">PH</h4>
                            <PhLine {...props} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={6} lg={2}>
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
                </Col>
                <Col md={8} xl={{ offset: 0, size: 7 }}>
                    <Card>
                        <CardBody>
                            <h4 className="font-size-14 mb-2">
                                Ingredients Chart
                            </h4>
                            <IngredientsBar {...props} />
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4} xl={3}>
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
                <Col md={8} xl={{ offset: 2, size: 7 }}>
                    <Card>
                        <CardBody>
                            <h4 className="font-size-14 mb-2">
                                Finished Goods Chart
                            </h4>
                            <FinishedGoodsBar {...props} />
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4} xl={3}>
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
