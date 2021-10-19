import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import {
    Row,
    Col,
    Button,
    Input,
    Label,
    FormGroup,
    FormFeedback
} from "reactstrap";
import {
    setBatchDetails,
    setBatchInvalidName,
    setBatchInvalidStartedAt,
    setBatchInvalidEndedAt,
    setBatchInvalidDescription,
    setBatchInvalidBatchId,
    setBatchInvalidParentBrew,
    setBatchInvalidProduct,
} from "../../../store/actions";
import Ingredients from "./ingredients";
import Times from "./times";

export default function BrewDetails({ editable }) {

    const stage = useSelector(state => {
        return state.Batch.stages.content[0] || {};
    });

    const mixture = useSelector(state => {
        return state.Batch.mixtures.content[0];
    });

    const props = {
        stage, editable
    };

    return (
        <React.Fragment>
            <Row>
                <Col sm="6">
                    <Times {...props}/>
                </Col>
                <Col sm="6">
                    <Ingredients {...mixture}/>
                </Col>
            </Row>
        </React.Fragment>
    );
}