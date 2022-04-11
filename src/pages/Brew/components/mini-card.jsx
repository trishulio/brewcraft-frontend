import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { Card, CardBody } from "../../../component/Common/Card";
import { prettyVolume, toHl } from "../../../helpers/textUtils";

export default function BrewMiniCard() {
    const { id } = useParams();

    const turns = useSelector((state) => {
        return state.MiniCards.brewsMixtures?.length;
    });

    const packagedTotalVolumeHl = useSelector((state) => {
        let volume = 0.0; // hl
        if (state.MiniCards.finishedGoods) {
            state.MiniCards.finishedGoods.forEach(
                (fg) =>
                    (volume += toHl(
                        fg.mixturePortions[0].quantity.value,
                        fg.mixturePortions[0].quantity.symbol
                    ))
            );
        }
        return volume;
    });

    const gravity = useSelector((state) => {
        return state.Batch.MixtureRecordings.content.find(
            (mr) =>
                mr.measure.name === "gravity" &&
                mr.mixture.brewStage.brew.id === id
        )?.value;
    });

    return (
        <React.Fragment>
            <Row>
                <Col md="6">
                    <Card className="mini-stat bg-primary">
                        <CardBody className="mini-stat-img">
                            <div className="mini-stat-icon">
                                <i
                                    className={
                                        "mdi mdi-arrow-up-box float-right"
                                    }
                                ></i>
                            </div>
                            <div className="text-white">
                                <h6 className="text-uppercase font-size-16">
                                    Brew House
                                    <br />
                                    Turns
                                </h6>
                                <h2 className="mb-2">{turns || "-"}</h2>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="6">
                    <Card className="mini-stat bg-primary">
                        <CardBody className="mini-stat-img">
                            <div className="mini-stat-icon">
                                <i
                                    className={
                                        "mdi mdi-clipboard-text-outline float-right"
                                    }
                                ></i>
                            </div>
                            <div className="text-white">
                                <h6 className="text-uppercase font-size-16">
                                    Brew House
                                    <br />
                                    Total Vol.
                                </h6>
                                <h2 className="mb-2">
                                    {packagedTotalVolumeHl
                                        ? prettyVolume(
                                              packagedTotalVolumeHl,
                                              "hl"
                                          )
                                        : "-"}
                                </h2>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="6">
                    <Card className="mini-stat bg-primary">
                        <CardBody className="mini-stat-img">
                            <div className="mini-stat-icon">
                                <i className={"mdi mdi-barley float-right"}></i>
                            </div>
                            <div className="text-white">
                                <h6 className="text-uppercase font-size-16">
                                    Original
                                    <br />
                                    Gravity
                                </h6>
                                <h2 className="mb-2">{gravity || "-"}</h2>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="6">
                    <Card className="mini-stat bg-primary">
                        <CardBody className="mini-stat-img">
                            <div className="mini-stat-icon">
                                <i
                                    className={
                                        "mdi mdi-currency-usd float-right"
                                    }
                                ></i>
                            </div>
                            <div className="text-white">
                                <h6 className="text-uppercase font-size-16">
                                    Batch Yield
                                    <br />
                                    &nbsp;
                                </h6>
                                <h2 className="mb-2">-</h2>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}
