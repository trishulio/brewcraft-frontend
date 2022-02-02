import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Col, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import { Card, CardBody, CardHeader } from "../../../../component/Common/Card";
import { formatDatetime } from "../../../../helpers/textUtils";
import { isValidNumberString } from "../../../../helpers/utils";
import {
    setBrewMixtureDetails,
    setBrewStageDetails,
} from "../../../../store/actions";

export default function BatchStage({
    title,
    isOpen,
    toggleIsOpen,
    toolbar,
    mixture,
    stage,
    mixtureRecordings,
    setMixtureRecords,
    children,
}) {
    const dispatch = useDispatch();

    const { editable } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const mixtures = useSelector((state) => {
        return state.Batch.Mixtures.content;
    });

    const stages = useSelector((state) => {
        return state.Batch.Stages.content;
    });

    function setMixture(mixture) {
        // insert mixture back into array
        const data = [...mixtures];
        const index = mixtures.findIndex((s) => s.id === mixture.id);
        data.splice(index, 1);
        data.splice(index, 0, { ...mixture });
        dispatch(
            setBrewMixtureDetails({
                content: data,
            })
        );
    }

    function setStage(stage) {
        // insert stage back into array
        const data = [...stages];
        const index = stages.findIndex((s) => s.id === stage.id);
        data.splice(index, 1);
        data.splice(index, 0, { ...stage });
        dispatch(
            setBrewStageDetails({
                content: data,
            })
        );
    }

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
            <Card className="shadow-none accordion-item m-0 p-0">
                {title && (
                    <CardHeader className="accordion-header">
                        <div className="mr-2" onClick={() => toggleIsOpen()}>
                            <i
                                className={`fa fa-caret-right font-size-13 mr-2 ${
                                    isOpen ? " rotate-down" : ""
                                }`}
                            ></i>
                            <span
                                className="text-dark"
                                onClick={() => toggleIsOpen()}
                                style={{ cursor: "pointer" }}
                            >
                                {title}
                            </span>
                        </div>
                    </CardHeader>
                )}
                <CardBody isOpen={isOpen} className="py-3">
                    {toolbar && <div className="mb-3">{toolbar}</div>}
                    <Row>
                        <Col sm="6">
                            <Label for="mixtureStartDateTime">
                                Mixture Start
                            </Label>
                            {editable && (
                                <FormGroup className="mb-3">
                                    <Input
                                        type="datetime-local"
                                        name="mixtureStartDateTime"
                                        className="waves-effect"
                                        value={
                                            stage.status.id === 6
                                                ? ""
                                                : stage.startedAt || ""
                                        }
                                        onChange={onFormInputChange}
                                        hidden={!editable}
                                    />
                                    <FormFeedback>
                                        Enter a valid start time.
                                    </FormFeedback>
                                </FormGroup>
                            )}
                            {!editable && (
                                <div className="mb-3">
                                    {stage.status.id !== 6 && stage.startedAt
                                        ? formatDatetime(stage.startedAt)
                                        : "-"}
                                </div>
                            )}
                            <div className="clearfix"></div>
                            <Label for="mixtureFinishDateTime">
                                Mixture Finish
                            </Label>
                            {editable && (
                                <FormGroup>
                                    <Input
                                        type="datetime-local"
                                        name="mixtureFinishDateTime"
                                        className="waves-effect"
                                        value={
                                            stage.status.id === 6
                                                ? ""
                                                : stage.endedAt || ""
                                        }
                                        onChange={onFormInputChange}
                                    />
                                    <FormFeedback>
                                        Enter a valid finish time.
                                    </FormFeedback>
                                </FormGroup>
                            )}
                            {!editable && (
                                <div className="mr-4">
                                    {stage.status.id !== 6 && stage.endedAt
                                        ? formatDatetime(stage.endedAt)
                                        : "-"}
                                </div>
                            )}
                        </Col>
                        <Col sm="6">
                            <Label for="stageStatus">Mixture Status</Label>
                            {editable && (
                                <FormGroup>
                                    <Input
                                        type="select"
                                        className="waves-effect"
                                        value={stage.status.id}
                                        name="stageStatus"
                                        onChange={onFormInputChange}
                                    >
                                        <option value="1">In Progress</option>
                                        <option value="2">Complete</option>
                                        <option value="3">Failed</option>
                                        <option value="4">Not started</option>
                                        <option value="5">Stopped</option>
                                        {/* <option value="6">Skip</option> */}
                                    </Input>
                                    <FormFeedback>
                                        Enter a valid number.
                                    </FormFeedback>
                                </FormGroup>
                            )}
                            {!editable && (
                                <div className="mb-3">
                                    {stage.status.id === 1 && "In Progress"}
                                    {stage.status.id === 2 && "Complete"}
                                    {stage.status.id === 3 && "Failed"}
                                    {stage.status.id === 4 && "Not started"}
                                    {stage.status.id === 5 && "Stopped"}
                                    {stage.status.id === 6 && "Skip"}
                                </div>
                            )}
                            <div className="clearFix"></div>
                            <Label for="mixtureQuantityValue">
                                Final volume (hl)
                            </Label>
                            {editable && (
                                <FormGroup className="mb-3">
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
                                        disabled={stage.status.id === 6}
                                    />
                                    <FormFeedback>
                                        Enter a valid number.
                                    </FormFeedback>
                                </FormGroup>
                            )}
                            {!editable && (
                                <div className="mb-3">
                                    {stage.status.id !== 6 &&
                                    mixture.quantity.value
                                        ? `${mixture.quantity.value} ${mixture.quantity.symbol}`
                                        : "-"}
                                </div>
                            )}
                        </Col>
                    </Row>
                    {children}
                </CardBody>
            </Card>
        </React.Fragment>
    );
}
