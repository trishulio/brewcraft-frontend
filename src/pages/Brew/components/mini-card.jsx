import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Row, Col } from "reactstrap";
import { Card, CardBody } from "../../../component/Common/Card";
import {
    formatPercent,
    formatVolumeHL,
    prettyVolume,
    toHl,
} from "../../../helpers/textUtils";
import { useQuery } from "../../../helpers/utils";
import {
    fetchMiniCardBrewsMixtures,
    fetchMiniCardFinishedGoods,
} from "../../../store/MiniCards/actions";

export default function BrewMiniCard() {
    const dispatch = useDispatch();
    const query = useQuery();
    const tab = query.get("tab");

    const turns = useSelector((state) => {
        if (state.MiniCards.brewsMixtures?.length) {
            return state.MiniCards.brewsMixtures?.length;
        }
        return "-";
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

    const { loading } = useSelector((state) => {
        return state.MiniCards;
    });

    const batch = useSelector((state) => {
        return state.Batch.Batch.data;
    });

    useEffect(() => {
        if (tab === "details") {
            dispatch(
                fetchMiniCardBrewsMixtures({
                    brewIds: [batch.id],
                    stageStatusIds: [2, 6], // complete, skipped
                    stageTaskIds: [3],
                })
            );
            dispatch(
                fetchMiniCardFinishedGoods({
                    brewIds: [batch.id],
                })
            );
        }
        // eslint-disable-next-line
    }, [tab]);

    return (
        <React.Fragment>
            <Row>
                <Col xl="3" md="6">
                    <Card className="mini-stat bg-primary">
                        <CardBody isLoading={loading} className="mini-stat-img">
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
                                <h2 className="mb-4">{turns}</h2>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="3" md="6">
                    <Card className="mini-stat bg-primary">
                        <CardBody isLoading={loading} className="mini-stat-img">
                            <div className="mini-stat-icon">
                                <i
                                    className={
                                        "mdi mdi-clipboard-text-outline float-right"
                                    }
                                ></i>
                            </div>
                            <div className="text-white">
                                <h6 className="text-uppercase font-size-16">
                                    Produced
                                    <br />
                                    &nbsp;
                                </h6>
                                <h2 className="mb-4">
                                    {prettyVolume(packagedTotalVolumeHl, "hl")}
                                </h2>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="3" md="6">
                    <Card className="mini-stat bg-primary">
                        <CardBody isLoading={loading} className="mini-stat-img">
                            <div className="mini-stat-icon">
                                <i className={"mdi mdi-barley float-right"}></i>
                            </div>
                            <div className="text-white">
                                <h6 className="text-uppercase font-size-16">
                                    Total Gain /<br />
                                    Loss
                                </h6>
                                <h2 className="mb-4">{formatVolumeHL(0)}</h2>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="3" md="6">
                    <Card className="mini-stat bg-primary">
                        <CardBody isLoading={loading} className="mini-stat-img">
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
                                <h2 className="mb-4">{formatPercent(0)}</h2>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}
