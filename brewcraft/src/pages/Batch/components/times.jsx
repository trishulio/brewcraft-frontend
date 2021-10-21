import React, { useState } from "react";
import { useSelector } from "react-redux";
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
import { formatDatetime } from "../../../helpers/textUtils";

export default function BatchTimes({ stage, editable }) {

    function onFormInputChange(e) {
        switch(e.target.name) {
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            <h4 className="font-size-12 pt-3 pt-sm-0">Stage</h4>
            <hr/>
            <Row>
                <Col sm="6" xl="4">
                    <Label
                        for="stageBrewStartDateTime"
                        className="d-sm-inline-block font-size-12 mb-3"
                        style={{
                            width: "5rem"
                        }}
                    >
                        Start time
                    </Label>
                    <FormGroup
                        hidden={!editable}
                        className="d-sm-inline-block mb-3"
                    >
                        <Input
                            type="datetime-local"
                            name="stageBrewStartDateTime"
                            className="waves-effect"
                            // bsSize="sm"
                            style={{ maxWidth: "16rem" }}
                            value={stage.startedAt || ""}
                            onChange={onFormInputChange}
                            hidden={!editable}
                        />
                        <FormFeedback>Enter a valid start date.</FormFeedback>
                    </FormGroup>
                    {
                        !editable && <div
                            className="d-sm-inline-block mb-3"
                        >
                            {stage.startedAt ? formatDatetime(stage.startedAt) : "-"}
                        </div>
                    }
                    <div className="clearfix"></div>
                    <Label
                        for="stageBrewFinishDateTime"
                        className="d-sm-inline-block font-size-12 mb-3"
                        style={{
                            width: "5rem"
                        }}
                    >
                        Finish time
                    </Label>
                    <FormGroup
                        className="d-sm-inline-block mb-3"
                        hidden={!editable}
                    >
                        <Input
                            type="datetime-local"
                            name="stageBrewFinishDateTime"
                            className="waves-effect"
                            // bsSize="sm"
                            style={{maxWidth: "16rem"}}
                            value={stage.finishedAt || ""}
                            onChange={onFormInputChange}
                            hidden={!editable}
                        />
                        <FormFeedback>Enter a valid start date.</FormFeedback>
                    </FormGroup>
                    {
                        !editable && <div
                            className="d-sm-inline-block mb-3"
                        >
                            {stage.finishedAt ? formatDatetime(stage.finishedAt) : "-"}
                        </div>
                    }
                </Col>
                <Col sm="6" xl="4">
                    <Label
                        for="stageBrewStartDateTime"
                        className="d-inline-block font-size-12 mb-3"
                        style={{
                            width: "5rem"
                        }}
                    >
                        Complete
                    </Label>
                    <FormGroup
                        disabled={!editable}
                        className="d-inline-block mb-3"
                    >
                        <Input
                            type="checkbox"
                            name="batchStartDateTime"
                            className="mx-0"
                            onChange={onFormInputChange}
                        />
                    </FormGroup>
                </Col>
            </Row>
        </React.Fragment>
    );
}