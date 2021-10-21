import React from "react";
import { useSelector } from "react-redux";
import {
    Row,
    Col
} from "reactstrap";
import Details from "../mixture/details";
import OGravity from "../mixture/og";
import Transfers from "../mixture/transfers";

export default function BrewWhirlpool({ editable }) {

    const stage = useSelector(state => {
        return state.Batch.stages.content[2] || {};
    });

    const mixture = useSelector(state => {
        return state.Batch.mixtures.content[4] || {};
    });

    return (
        <React.Fragment>
            <Row>
                <Col xs="12">
                    <div className="mb-3">
                        <Details {...{stage, hideQuantity: false, editable}}/>
                    </div>
                </Col>
                <Col md="6">
                    <div className="mb-3">
                        <OGravity {...{mixture, editable}}/>
                    </div>
                </Col>
                <Col md="6">
                    <div className="mb-3">
                        <Transfers {...{mixture, editable}}/>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}