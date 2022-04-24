import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Col,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Row,
} from "reactstrap";
import {
    editBatchStage,
    setBatchMixtureRecordings,
    setBrewStageDetails,
} from "../../../../store/actions";
import {
    Modal,
    ModalBody,
    ModalFooter,
} from "../../../../component/Common/modal";

export default function StageStartModal({
    title,
    show,
    setShow,
    stage,
    mixture,
}) {
    const dispatch = useDispatch();

    const mixtureRecordings = useSelector((state) => {
        return state.Batch.MixtureRecordings.content;
    });

    const initialVolume = useSelector((state) => {
        const record = state.Batch.MixtureRecordings.content.find((mr) => {
            return mr.mixture.id === mixture.id && mr.measure.id === 10;
        });
        return record ? record.value : "";
    });

    const stages = useSelector((state) => {
        return state.Batch.Stages.content;
    });

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

    return (
        <Modal
            title={title}
            size="lg"
            show={show}
            close={() => {
                setShow(false);
            }}
        >
            <ModalBody>
                <Row>
                    <Col sm="6">
                        <Label for="mixtureStartDateTime">Mixture Start</Label>
                        <FormGroup className="mb-3">
                            <Input
                                type="datetime-local"
                                name="mixtureStartDateTime"
                                className="waves-effect"
                                value={stage.startedAt || ""}
                                onChange={(e) => {
                                    if (stage.startedAt !== e.target.value) {
                                        setStage({
                                            ...stage,
                                            startedAt: e.target.value,
                                        });
                                    }
                                }}
                            />
                            <FormFeedback>
                                Enter a valid start time.
                            </FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                {stage.task.id !== 1 && (
                    <Col sm="6">
                        <Label for="mixtureInitialQuantityValue">
                            Volume In (l)
                        </Label>
                        <FormGroup className="mb-3">
                            <Input
                                type="text"
                                className="waves-effect"
                                value={initialVolume}
                                placeholder={"Enter"}
                                name="mixtureInitialQuantityValue"
                                onChange={(e) => {
                                    let record;
                                    const index = mixtureRecordings.findIndex(
                                        (r) =>
                                            r.measure.id === 10 &&
                                            r.mixture.id === mixture.id // initialVolume
                                    );
                                    if (index >= 0) {
                                        record = mixtureRecordings.splice(
                                            index,
                                            1
                                        )[0];
                                        record.value = parseInt(e.target.value);
                                    } else {
                                        record = {
                                            mixture,
                                            measure: {
                                                id: 10, // initialVolume
                                            },
                                            value: parseInt(e.target.value),
                                        };
                                    }
                                    dispatch(
                                        setBatchMixtureRecordings({
                                            content: [
                                                ...mixtureRecordings,
                                                record,
                                            ],
                                        })
                                    );
                                }}
                            />
                            <FormFeedback>Enter a valid number.</FormFeedback>
                        </FormGroup>
                    </Col>
                )}
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => {
                        dispatch(
                            editBatchStage({
                                ...stage,
                                status: {
                                    id: 1,
                                    name: "IN-PROGRESS",
                                },
                            })
                        );
                        setShow(false);
                    }}
                    disabled={
                        !stage.startedAt ||
                        (stage.task.id !== 1 && !initialVolume)
                    }
                >
                    Save
                </Button>{" "}
                <Button
                    onClick={() => {
                        setShow(false);
                    }}
                >
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}
