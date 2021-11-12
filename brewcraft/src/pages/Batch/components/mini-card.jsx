import React from 'react';
import { useSelector } from 'react-redux';
import {
    Row,
    Col,
    Card,
    CardBody,
    Badge
} from "reactstrap";
import { formatCurrency } from '../../../helpers/textUtils';

export default function BrewMiniCard() {

    const totalPackaged = 0;
    const brewHouseTurns = 0;
    const totalCost = 0;
    const costPerLitre = 0;

    const kettleMixture = useSelector(state => {
        return state.Batch.KettleMixture.data;
    })

    const whirlpoolMixture = useSelector(state => {
        return state.Batch.WhirlpoolMixture.data;
    })

    const { initial: initialMaterialPortions } = useSelector(state => {
        return state.Batch.MashMaterialPortion;
    });

    const transferMixtureRecordings = useSelector(state => {
        return state.Batch.TransferMixtureRecordings.content;
    })

    return (
        <React.Fragment>
            <Row>
                <Col xl="3" md="6">
                    <Card className="mini-stat bg-primary">
                        <CardBody className="mini-stat-img">
                            <div className="mini-stat-icon">
                                <i className={"mdi mdi-arrow-up-box float-right"}></i>
                            </div>
                            <div className="text-white">
                                <h6 className="text-uppercase font-size-16">Packaged<br/>Volume</h6>
                                <h2 className="mb-4">{totalPackaged}</h2>
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
                                <h6 className="text-uppercase font-size-16">Brew House<br/>Turns</h6>
                                <h2 className="mb-4">{brewHouseTurns}</h2>
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
                                <h6 className="text-uppercase font-size-16">Batch<br/>Cost&nbsp;</h6>
                                <h2 className="mb-4">{formatCurrency(totalCost)}</h2>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="3" md="6">
                    <Card className="mini-stat bg-primary">
                        <CardBody className="mini-stat-img">
                            <div className="mini-stat-icon">
                                <i className={"mdi mdi-beer float-right"}></i>
                            </div>
                            <div className="text-white">
                                <h6 className="text-uppercase font-size-16">Cost /<br/>Litre</h6>
                                <h2 className="mb-4">{formatCurrency(costPerLitre)}</h2>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}
