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
    setBrewMixtureDetails,
    setBrewStageDetails,
} from "../../../../store/actions";
import {
    Modal,
    ModalBody,
    ModalFooter,
} from "../../../../component/Common/modal";

export default function StageCompleteModal({
    title,
    show,
    setShow,
    stage,
    mixture,
    failed,
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
                        <Label for="mixtureFinishDateTime">
                            Mixture Finish
                        </Label>
                        <FormGroup>
                            <Input
                                type="datetime-local"
                                name="mixtureFinishDateTime"
                                className="waves-effect"
                                value={stage.endedAt || ""}
                                onChange={(e) => {
                                    if (stage.endedAt !== e.target.value) {
                                        setStage({
                                            ...stage,
                                            endedAt: e.target.value,
                                        });
                                    }
                                }}
                            />
                            <FormFeedback>
                                Enter a valid finish time.
                            </FormFeedback>
                        </FormGroup>
                    </Col>
                    {!failed && (
                        <Col sm="6">
                            <Label for="mixtureQuantityValue">
                                Volume Out (l)
                            </Label>
                            <FormGroup className="mb-3">
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    value={mixture.quantity.value || ""}
                                    placeholder={"Enter"}
                                    name="mixtureQuantityValue"
                                    onChange={(e) => {
                                        if (
                                            mixture.quantity.value !==
                                            e.target.value
                                        ) {
                                            setMixture({
                                                ...mixture,
                                                quantity: {
                                                    ...mixture.quantity,
                                                    value: e.target.value,
                                                },
                                            });
                                        }
                                    }}
                                />
                                <FormFeedback>
                                    Enter a valid number.
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                    )}
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => {
                        dispatch(
                            failed
                                ? editBatchStage({
                                      ...stage,
                                      status: {
                                          id: 3,
                                          name: "FAILED",
                                      },
                                  })
                                : editBatchStage({
                                      ...stage,
                                      status: {
                                          id: 2,
                                          name: "COMPLETE",
                                      },
                                  })
                        );
                        setShow(false);
                    }}
                    disabled={
                        !stage.endedAt || (!failed && !mixture.quantity.value)
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
