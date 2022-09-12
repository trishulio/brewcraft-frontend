import { map } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { Card, CardBody, CardHeader } from "../../../component/Common/Card";
import CommonTable from "../../../component/Common/table";
import { IngredientsDoughnut } from "./common/charts";
import StageIngredients from "./common/stage-ingredients";

export default function Materials(props) {
    const maltPortions = useSelector((state) => {
        return state.Batch.MaterialPortions.initial.filter(
            (mp) =>
                mp.materialLot.invoiceItem.material.category?.name === "Malt"
        );
    });
    const hopPortions = useSelector((state) => {
        return state.Batch.MaterialPortions.initial.filter(
            (mp) => mp.materialLot.invoiceItem.material.category?.name === "Hop"
        );
    });

    const otherPortions = useSelector((state) => {
        return state.Batch.MaterialPortions.initial.filter(
            (mp) =>
                mp.materialLot.invoiceItem.material.category?.name !== "Malt" &&
                mp.materialLot.invoiceItem.material.category?.name !== "Hop"
        );
    });
    return (
        <Card>
            <CardHeader>
                <h2 className="">Ingredients</h2>
            </CardHeader>
            <CardBody>
                <h3 className="font-size-16">Malts</h3>
                <div className="d-flex">
                    <div
                        style={{
                            maxWidth: "180px",
                        }}
                    >
                        <IngredientsDoughnut materialLots={maltPortions} />
                    </div>
                    <CommonTable>
                        <tbody>
                            {!maltPortions.length && (
                                <tr>
                                    <td className="text-center">No Malts</td>
                                </tr>
                            )}
                            {map(maltPortions, (value, index) => (
                                <tr key={index}>
                                    <td>
                                        {
                                            value.materialLot.invoiceItem
                                                .material.name
                                        }
                                    </td>
                                    <td>{value.materialLot.lotNumber}</td>
                                    <td className="text-right">
                                        {value.quantity.value}{" "}
                                        {value.quantity.symbol}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </CommonTable>
                </div>
                {/* <Col className="mb-3" sm={toggleCharts ? 4 : 6}>
                        <StageIngredients
                            lotPortions={maltPortions}
                            chart={
                                <div
                                    style={{
                                        maxWidth: "180px",
                                    }}
                                >
                                    <IngredientsDoughnut
                                        materialLots={maltPortions}
                                    />
                                </div>
                            }
                            toggleCharts={toggleCharts}
                            title="Total Malt"
                            noData="No Malt"
                        />
                    </Col> */}
                {/* <Col className="mb-3" sm={toggleCharts ? 4 : 6}>
                        <StageIngredients
                            lotPortions={hopPortions}
                            chart={
                                <div
                                    style={{
                                        maxWidth: "180px",
                                    }}
                                >
                                    <IngredientsDoughnut
                                        materialLots={hopPortions}
                                    />
                                </div>
                            }
                            toggleCharts={toggleCharts}
                            title="Total Hops"
                            noData="No Hops"
                        />
                    </Col>
                    <Col className="mb-3" sm={toggleCharts ? 4 : 6}>
                        <StageIngredients
                            lotPortions={otherPortions}
                            chart={
                                <div
                                    style={{
                                        maxWidth: "180px",
                                    }}
                                >
                                    <IngredientsDoughnut
                                        materialLots={otherPortions}
                                    />
                                </div>
                            }
                            toggleCharts={toggleCharts}
                            title="Other Ingredients"
                            noData="No Ingredients"
                        />
                    </Col> */}
            </CardBody>
        </Card>
    );
}
