import React from "react";
import { useSelector } from "react-redux";
import {
    Row,
    Col
} from "reactstrap";
import Details from "../mixture/details";

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
                        <Details {...{stage, showSkipCheckbox: true, editable}}/>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}