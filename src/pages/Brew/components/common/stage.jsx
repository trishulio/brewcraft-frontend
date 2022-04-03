import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Col, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import { Card, CardBody, CardHeader } from "../../../../component/Common/Card";
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

    const mixtures = useSelector((state) => {
        return state.Batch.BrewMixtures.content;
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
                <CardBody className="py-3" isOpen={isOpen}>
                    {toolbar && <div className="mb-3">{toolbar}</div>}
                    {stage.task.id !== 6 && (
                        <React.Fragment>
                            <Row>
                                <Col sm="6">
                                    <Label for="mixtureStartDateTime">
                                        Mixture Start
                                    </Label>
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
                                        />
                                        <FormFeedback>
                                            Enter a valid start time.
                                        </FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col sm="6">
                                    <Label for="mixtureFinishDateTime">
                                        Mixture Finish
                                    </Label>
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
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6">
                                    <Label for="mixtureQuantityValue">
                                        Volume In (l)
                                    </Label>
                                    <FormGroup className="mb-3">
                                        <Input
                                            type="text"
                                            className="waves-effect"
                                            value={mixture.quantity.value}
                                            placeholder={"Enter"}
                                            name="mixtureQuantityValue"
                                            onChange={onFormInputChange}
                                        />
                                        <FormFeedback>
                                            Enter a valid number.
                                        </FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col sm="6">
                                    <Label for="mixtureQuantityValue">
                                        Volume Out (l)
                                    </Label>
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
                                        />
                                        <FormFeedback>
                                            Enter a valid number.
                                        </FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </React.Fragment>
                    )}
                    {children}
                </CardBody>
            </Card>
        </React.Fragment>
    );
}
