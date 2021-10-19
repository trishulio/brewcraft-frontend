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
            {console.log(stage)}
            <h4 className="font-size-14">Time</h4>
            <hr/>
            <Label
                for="stageBrewStartDateTime"
                className="d-sm-inline-block mr-2 mb-3"
                style={{
                    width: "3rem"
                }}
            >
                Start
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
                    style={{maxWidth: "16rem"}}
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
                className="d-sm-inline-block mr-2 mb-3"
                style={{
                    width: "3rem"
                }}
            >
                Finish
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
                    {stage.startedAt ? formatDatetime(stage.startedAt) : "-"}
                </div>
            }
        </React.Fragment>
    );
}