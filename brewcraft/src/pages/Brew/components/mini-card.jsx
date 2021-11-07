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

    function formatOriginalGravity() {
        return transferMixtureRecordings.find(r => r.measure.id === 5)?.value || "-";
    }

    function formatWortVolume() {
        if (whirlpoolMixture.brewStage.status?.id === 3) {
            // skip whirlpool
            if (kettleMixture.quantity.value) {
                return `${kettleMixture.quantity.value} ${kettleMixture.quantity.symbol}`;
            } else {
                return "-";
            }
        } else if (whirlpoolMixture.quantity.value) {
            return `${whirlpoolMixture.quantity.value} ${whirlpoolMixture.quantity.symbol}`;
        } else {
            return "-";
        }
    }

    function formatMaltUsed() {
        let quantity = 0;
        initialMaterialPortions
            .filter(portion => portion.materialLot.invoiceItem.material.category.name === "Malt")
            .forEach(portion => {
                quantity += portion.quantity.value;
            });

        return quantity + " kg";
    }

    function formatCost() {
        let cost = 0;
        initialMaterialPortions.forEach(mp => {
            cost += mp.materialLot.invoiceItem.amount.amount
                / mp.materialLot.invoiceItem.quantity.value
                * mp.quantity.value;
        });

        return cost;
    }

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
                                <h6 className="text-uppercase font-size-16">Wort<br/>Volume</h6>
                                <h2 className="mb-4">{formatWortVolume()}</h2>
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
                                <h6 className="text-uppercase font-size-16">Original<br/>Gravity</h6>
                                <h2 className="mb-4">{formatOriginalGravity()}</h2>
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
                                <h6 className="text-uppercase font-size-16">Total Malt<br/>&nbsp;</h6>
                                <h2 className="mb-4">{formatMaltUsed()}</h2>
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
                                <h6 className="text-uppercase font-size-16">Brew Cost<br/>&nbsp;</h6>
                                <h2 className="mb-4">{formatCurrency(formatCost())}</h2>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}
