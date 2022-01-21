import React, { useState } from "react";
import { Row, Col, Input, Label, FormGroup, FormFeedback } from "reactstrap";
import { formatDatetime } from "../../../../helpers/textUtils";
import { isValidNumberString } from "../../../../helpers/utils";

export default function MixtureDetails({
    stage,
    setStage,
    originalGravity,
    setOriginalGravity,
    mixture,
    setMixture,
    mixtureRecordings,
    setMixtureRecords,
    showOriginalGravityCheckbox,
    showSkipCheckbox,
    editable,
}) {
    const [invalidOriginalGravity, setInvalidOriginalGravity] = useState(false);

    function onFormInputChange(e) {
        switch (e.target.name) {
            case "mixtureStartDateTime":
                if (stage.startedAt !== e.target.value) {
                    setStage({
                        ...stage,
                        startedAt: e.target.value,
                    });
                }
                break;
            case "mixtureFinishDateTime":
                if (stage.endedAt !== e.target.value) {
                    setStage({
                        ...stage,
                        endedAt: e.target.value,
                    });
                }
                break;
            case "mixtureQuantityValue":
                if (mixture.quantity.value !== e.target.value) {
                    setMixture({
                        ...mixture,
                        quantity: {
                            ...mixture.quantity,
                            value: e.target.value,
                        },
                    });
                }
                break;
            case "mixtureCompleteCheckbox":
                setStage({
                    ...stage,
                    status: { id: e.target.checked ? 6 : 1 },
                });
                break;
            case "mixtureGravity":
                let record;
                const index = mixtureRecordings.findIndex(
                    (r) => r.measure.id === 5
                );
                if (index >= 0) {
                    record = mixtureRecordings.splice(index, 1)[0];
                    record.value = parseInt(e.target.value);
                } else {
                    record = {
                        mixture,
                        measure: {
                            id: 5,
                        },
                        value: parseInt(e.target.value),
                    };
                }
                setMixtureRecords({
                    content: [...mixtureRecordings, record],
                });
                break;
            case "stageStatus":
                setStage({
                    ...stage,
                    status: { id: parseInt(e.target.value) },
                });
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
                        className="d-block d-sm-inline-block font-size-14 mb-3"
                        style={{
                            width: "5rem",
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
                            value={
                                stage.status.id === 6
                                    ? ""
                                    : stage.startedAt || ""
                            }
                            onChange={onFormInputChange}
                            hidden={!editable}
                            disabled={showSkipCheckbox && stage.status.id === 3}
                        />
                        <FormFeedback>Enter a valid start time.</FormFeedback>
                    </FormGroup>
                    {!editable && (
                        <div className="d-sm-inline-block mb-3">
                            {stage.status.id !== 6 && stage.startedAt
                                ? formatDatetime(stage.startedAt)
                                : "-"}
                        </div>
                    )}
                    <div className="clearfix"></div>
                    <Label
                        for="mixtureFinishDateTime"
                        className="d-block d-sm-inline-block font-size-14"
                        style={{
                            width: "5rem",
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
                            style={{ maxWidth: "14rem" }}
                            value={
                                stage.status.id === 6 ? "" : stage.endedAt || ""
                            }
                            onChange={onFormInputChange}
                            hidden={!editable}
                            disabled={showSkipCheckbox && stage.status.id === 3}
                        />
                        <FormFeedback>Enter a valid finish time.</FormFeedback>
                    </FormGroup>
                    {!editable && (
                        <div className="d-sm-inline-block mr-4">
                            {stage.status.id !== 6 && stage.endedAt
                                ? formatDatetime(stage.endedAt)
                                : "-"}
                        </div>
                    )}
                    <div className="clearfix"></div>
                    {showOriginalGravityCheckbox && (
                        <React.Fragment>
                            <Label
                                for="transferMixtureGravity"
                                className="d-sm-inline-block align-top font-size-14"
                                style={{
                                    width: "8rem",
                                }}
                            >
                                Original Gravity
                            </Label>
                            {editable && (
                                <FormGroup className="d-sm-inline-block align-middle">
                                    <Input
                                        type="text"
                                        className="waves-effect"
                                        value={originalGravity}
                                        placeholder="Enter"
                                        name="mixtureOriginalGravity"
                                        disabled={!editable}
                                        invalid={invalidOriginalGravity}
                                        onChange={(e) => {
                                            setOriginalGravity(e.target.value);
                                            if (!e.target.value) {
                                                setInvalidOriginalGravity(
                                                    false
                                                );
                                            } else {
                                                setInvalidOriginalGravity(
                                                    !isValidNumberString(
                                                        e.target.value
                                                    )
                                                );
                                            }
                                        }}
                                        style={{ width: "8rem" }}
                                    />
                                    <FormFeedback>
                                        Enter a valid gravity value.
                                    </FormFeedback>
                                </FormGroup>
                            )}
                            {!editable && (
                                <div className="d-sm-inline-block align-middle font-size-12 mb-2">
                                    {(mixtureRecordings &&
                                        mixtureRecordings.find(
                                            (r) => r.measure.id === 5
                                        )?.value) ||
                                        "-"}
                                </div>
                            )}
                            <div className="clearFix"></div>
                        </React.Fragment>
                    )}
                </Col>
                <Col sm="6">
                    <Label
                        for="stageStatus"
                        className="d-block d-sm-inline-block font-size-14"
                        style={{
                            width: "8rem",
                        }}
                    >
                        Status
                    </Label>
                    {editable && (
                        <FormGroup className="d-block d-sm-inline-block mb-3">
                            <Input
                                type="select"
                                className="waves-effect"
                                value={stage.status.id}
                                name="stageStatus"
                                onChange={onFormInputChange}
                                style={{ width: "8rem" }}
                            >
                                <option value="1">In Progress</option>
                                <option value="2">Complete</option>
                                <option value="3">Failed</option>
                                <option value="4">Not started</option>
                                <option value="5">Stopped</option>
                                {(showSkipCheckbox ||
                                    stage.status.id === 6) && (
                                    <option value="6">Skip</option>
                                )}
                            </Input>
                            <FormFeedback>Enter a valid number.</FormFeedback>
                        </FormGroup>
                    )}
                    {!editable && (
                        <div className="d-sm-inline-block mb-3">
                            {stage.status.id === 1 && "In Progress"}
                            {stage.status.id === 2 && "Complete"}
                            {stage.status.id === 3 && "Failed"}
                            {stage.status.id === 4 && "Not started"}
                            {stage.status.id === 5 && "Stopped"}
                            {stage.status.id === 6 && "Skip"}
                        </div>
                    )}
                    <div className="clearFix"></div>
                    <Label
                        for="mixtureQuantityValue"
                        className="d-block d-sm-inline-block font-size-14"
                        style={{
                            width: "8rem",
                        }}
                    >
                        Final volume
                    </Label>
                    {editable && (
                        <FormGroup className="d-block d-sm-inline-block mb-3">
                            <Input
                                type="text"
                                className="waves-effect"
                                value={
                                    stage.status.id === 6
                                        ? "-"
                                        : mixture.quantity.value
                                }
                                placeholder={"Enter"}
                                name="mixtureQuantityValue"
                                onChange={onFormInputChange}
                                style={{ width: "8rem" }}
                                disabled={stage.status.id === 6}
                            />
                            <FormFeedback>Enter a valid number.</FormFeedback>
                            &nbsp;<span>{mixture.quantity.symbol}</span>
                        </FormGroup>
                    )}
                    {!editable && (
                        <div className="d-sm-inline-block mb-3">
                            {stage.status.id !== 6 && mixture.quantity.value
                                ? `${mixture.quantity.value} ${mixture.quantity.symbol}`
                                : "-"}
                        </div>
                    )}
                </Col>
            </Row>
        </React.Fragment>
    );
}
