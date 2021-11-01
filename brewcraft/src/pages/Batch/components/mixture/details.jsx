import React, { useEffect, useState } from "react";
import {
    Row,
    Col,
    Input,
    Label,
    FormGroup,
    FormFeedback,
    Button
} from "reactstrap";
import { formatDatetime } from "../../../../helpers/textUtils";
import { useDispatch } from "react-redux";

export default function MixtureDetails({ stage, initialStage, setStage, mixture, initialMixture, setMixture, onSave, showSkipCheckbox, showFinalVolume }) {
    const [editable, setEditable] = useState(false);
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        setChanged(isChanged());
    }, [stage, mixture, setChanged]);

    useEffect(() => {
        setEditable(stage.editable);
    }, [stage]);

    function isChanged() {
        return JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({ startedAt, endedAt, status, task }))(initialStage))
            !== JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({ startedAt, endedAt, status, task }))(stage))
            || JSON.stringify(
                    (({ quantity }) => ({ quantity }))(initialMixture))
            !== JSON.stringify(
                (({ quantity }) => ({ quantity }))(mixture));
    }

    function onFormInputChange(e) {
        switch(e.target.name) {
            case "mixtureStartDateTime":
                if (stage.startedAt !== e.target.value) {
                    setStage({
                        ...stage,
                        startedAt: e.target.value
                    });
                }
                break;
            case "mixtureFinishDateTime":
                if (stage.endedAt !== e.target.value) {
                    setStage({
                        ...stage,
                        endedAt: e.target.value
                    });
                }
                break;
            case "mixtureQuantityValue":
                if (mixture.quantity.value !== e.target.value) {
                    setMixture({
                        ...mixture,
                        quantity: {
                            ...mixture.quantity,
                            value: e.target.value === "" ? 0 : e.target.value
                        }
                    });
                }
                break;
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            <Row>
                <Col sm="6">
                    <Label
                        for="mixtureStartDateTime"
                        className="d-block d-sm-inline-block font-size-12 mb-3"
                        style={{
                            width: "5rem"
                        }}
                    >
                        Start
                    </Label>
                    <FormGroup
                        hidden={editable}
                        className="d-block d-sm-inline-block mb-3"
                    >
                        <Input
                            type="datetime-local"
                            name="mixtureStartDateTime"
                            className="waves-effect"
                            style={{ maxWidth: "14rem" }}
                            value={stage.startedAt || ""}
                            onChange={onFormInputChange}
                            hidden={!editable}
                        />
                        <FormFeedback>Enter a valid start time.</FormFeedback>
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
                        className="d-block d-sm-inline-block font-size-12"
                        style={{
                            width: "5rem"
                        }}
                    >
                        Finish
                    </Label>
                    <FormGroup
                        className="d-block d-sm-inline-block"
                        hidden={editable}
                    >
                        <Input
                            type="datetime-local"
                            name="mixtureFinishDateTime"
                            className="waves-effect"
                            style={{maxWidth: "14rem"}}
                            value={stage.endedAt || ""}
                            onChange={onFormInputChange}
                            hidden={!editable}
                        />
                        <FormFeedback>Enter a valid finish time.</FormFeedback>
                    </FormGroup>
                    {
                        !editable && <div
                            className="d-sm-inline-block mr-4"
                        >
                            {stage.endedAt ? formatDatetime(stage.endedAt) : "-"}
                        </div>
                    }
                </Col>
                <Col sm="6">
                    <Label
                        for="mixtureQuantity"
                        className="d-block d-sm-inline-block font-size-12"
                        style={{
                            width: "6rem"
                        }}
                    >
                        Final volume
                    </Label>
                    <FormGroup
                        className="d-block d-sm-inline-block mb-3"
                        hidden={editable}
                    >
                        <Input
                            type="text"
                            className="waves-effect"
                            value={mixture.quantity.value || ""}
                            placeholder="Enter"
                            name="mixtureQuantityValue"
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
                            {mixture.quantity.value ? `${mixture.quantity.value} ${mixture.quantity.symbol}`  : "-"}
                        </div>
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
                                disabled={editable}
                                checked={true}
                            />
                        </FormGroup>
                    </div>
                </Col>
            </Row>
            <div className="clearfix mb-3"></div>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-2"
                onClick={() => {
                    setEditable(true);
                }}
                hidden={editable}
            >
                Edit
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2  mb-2"
                onClick={() => {
                    setEditable(false);
                }}
                hidden={!editable}
            >
                Cancel
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-2"
                onClick={onSave}
                disabled={!changed}
                hidden={!editable}
            >
                    Save
            </Button>
        </React.Fragment>
    );
}