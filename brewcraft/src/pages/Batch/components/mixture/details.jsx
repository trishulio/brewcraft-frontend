import React from "react";
import {
    Row,
    Col,
    Input,
    Label,
    FormGroup,
    FormFeedback
} from "reactstrap";
import { formatDatetime } from "../../../../helpers/textUtils";

export default function BatchTimes({ stage, mixture, showSkipCheckbox, editable }) {

    function onFormInputChange(e) {
        switch(e.target.name) {
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            <Row>
                <Col sm="6" xl="4">
                    <Label
                        for="mixtureStartDateTime"
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
                            name="mixtureStartDateTime"
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
                        for="mixtureFinishDateTime"
                        className="d-sm-inline-block font-size-12"
                        style={{
                            width: "5rem"
                        }}
                    >
                        Finish time
                    </Label>
                    <FormGroup
                        className="d-sm-inline-block"
                        hidden={!editable}
                    >
                        <Input
                            type="datetime-local"
                            name="mixtureFinishDateTime"
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
                            className="d-sm-inline-block"
                        >
                            {stage.finishedAt ? formatDatetime(stage.finishedAt) : "-"}
                        </div>
                    }
                </Col>
                <Col sm="6" xl="4">
                    {
                            <React.Fragment>
                                <Label
                                    for="mixtureQuantity"
                                    className="d-inline-block font-size-12 mb-3"
                                    style={{
                                        width: "6rem"
                                    }}
                                >
                                    Final volume
                                </Label>
                                <FormGroup
                                    className="d-sm-inline-block mb-3"
                                    hidden={!editable}
                                >
                                    <Input
                                        type="text"
                                        className="waves-effect"
                                        // bsSize="sm"
                                        value={mixture?.quantity?.value}
                                        placeholder="Enter"
                                        name="mixtureQuantity"
                                        onChange={onFormInputChange}
                                        style={{ width: "8rem" }}
                                        hidden={!editable}
                                    />
                                    <FormFeedback>Enter a valid number.</FormFeedback>
                                </FormGroup>
                                {
                                    !editable && <div
                                            className="d-sm-inline-block mb-3"
                                        >
                                        {mixture?.name ? mixture.name : "-"}
                                    </div>
                                }
                                <div className="clearfix"></div>
                            </React.Fragment>
                    }
                    <div
                        hidden={!showSkipCheckbox}
                    >
                        <Label
                            for="mixtureCompleteCheckbox"
                            className="d-inline-block font-size-12"
                            style={{
                                width: "6rem"
                            }}
                        >
                            Skip
                        </Label>
                        <FormGroup
                            className="d-sm-inline-block"
                        >
                            <Input
                                type="checkbox"
                                name="mixtureCompleteCheckbox"
                                className="mx-0"
                                onChange={onFormInputChange}
                                disabled={!editable}
                                checked={true}
                            />
                        </FormGroup>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}