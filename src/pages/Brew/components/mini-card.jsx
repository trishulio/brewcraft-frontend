import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Row, Col } from "reactstrap";
import { Card, CardBody } from "../../../component/Common/Card";
import { formatPercent, formatVolumeHL } from "../../../helpers/textUtils";
import { fetchMiniCardBrewsMixtures } from "../../../store/MiniCards/actions";

export default function BrewMiniCard() {
    const dispatch = useDispatch();

    const turns = useSelector((state) => {
        return state.MiniCards.brewsMixtures?.length;
    });

    const { loading } = useSelector((state) => {
        return state.MiniCards;
    });

    const batch = useSelector((state) => {
        return state.Batch.Batch.data;
    });

    useEffect(() => {
        dispatch(
            fetchMiniCardBrewsMixtures({
                brewIds: [batch.id],
                stageStatusIds: [2, 6], // complete, skipped
                stageTaskIds: [3],
            })
        );
        // eslint-disable-next-line
    }, []);

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
                                    Produced
                                    <br />
                                    &nbsp;
                                </h6>
                                <h2 className="mb-4">{formatVolumeHL(0)}</h2>
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
                                <h2 className="mb-4">{formatPercent(0)}</h2>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}
