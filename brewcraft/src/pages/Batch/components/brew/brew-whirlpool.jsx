import React from "react";
import { useSelector } from "react-redux";
import {
    Row,
    Col
} from "reactstrap";
import Ingredients from "../ingredients";
import Times from "../times";

export default function BrewWhirlpool({ editable }) {

    const stage = useSelector(state => {
        return state.Batch.stages.content[2] || {};
    });

    const mixture = useSelector(state => {
        return state.Batch.mixtures.content[2];
    });

    return (
        <React.Fragment>
            <Row>
                <Col xs="12">
                    <div className="mb-3">
                        <Times {...{stage, editable}}/>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}