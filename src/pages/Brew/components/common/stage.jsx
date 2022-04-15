import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import {
    Button,
    Col,
    Collapse,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Row,
} from "reactstrap";
import { CardBody, CardHeader } from "../../../../component/Common/Card";
import {
    Modal,
    ModalBody,
    ModalFooter,
} from "../../../../component/Common/modal";
import { formatDatetime, prettyName } from "../../../../helpers/textUtils";
import {
    editBatch,
    setBatchMixtureRecordings,
    setBrewMixtureDetails,
    setBrewStageDetails,
} from "../../../../store/actions";

export function StageHeader({ title, toolbar, toggleIsOpen }) {
    return (
        <CardHeader
            style={{
                background: "none",
                borderBottom: "solid 1px #6c757d",
            }}
            className="pb-0 pl-0 m-0 mx-3"
        >
            {toggleIsOpen ? (
                <div className="float-left">
                    <h4
                        className="waves-effect font-size-16 m-0 p-0"
                        onClick={() => toggleIsOpen()}
                    >
                        {title}
                    </h4>
                </div>
            ) : (
                <h4 className="d-inline-block font-size-16 m-0 p-0">{title}</h4>
            )}
            <div className="float-right">
                <div className="mb-3">{toolbar}</div>
            </div>
        </CardHeader>
    );
}

export function StageModal({
    title,
    show,
    setShow,
    afterSave,
    stage,
    mixture,
}) {
    const dispatch = useDispatch();

    const mixtures = useSelector((state) => {
        return state.Batch.BrewMixtures.content;
    });

    const stages = useSelector((state) => {
        return state.Batch.Stages.content;
    });

    const mixtureRecordings = useSelector((state) => {
        return state.Batch.MixtureRecordings.content;
    });

    const initialVolume = useSelector((state) => {
        const record = state.Batch.MixtureRecordings.content.find((mr) => {
            return mr.mixture.id === mixture.id && mr.measure.id === 10;
        });
        return record ? record.value : "";
    });

    const originalGravity = useSelector((state) => {
        const record =
            stage.task.id === 6 &&
            state.Batch.MixtureRecordings.content.find((mr) => {
                return mr.mixture.id === mixture.id && mr.measure.id === 5;
            });
        return record ? record.value : "";
    });

    const equipment = useSelector((state) => {
        return state.Equipment.content;
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
        let record, index;
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
            case "mixtureInitialQuantityValue":
                index = mixtureRecordings.findIndex(
                    (r) => r.measure.id === 10 && r.mixture.id === mixture.id // initialVolume
                );
                if (index >= 0) {
                    record = mixtureRecordings.splice(index, 1)[0];
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
                        content: [...mixtureRecordings, record],
                    })
                );
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
            case "mixtureEquipment":
                if (mixture.equipment?.id !== e.target.value) {
                    const equipmentItem = equipment.find((item) => {
                        return item.id === parseInt(e.target.value);
                    });
                    setMixture({
                        ...mixture,
                        equipment: equipmentItem,
                    });
                }
                break;
            case "originalGravity":
                index = mixtureRecordings.findIndex(
                    (r) => r.measure.id === 5 && r.mixture.id === mixture.id
                );
                if (index >= 0) {
                    record = mixtureRecordings.splice(index, 1)[0];
                    record.value = e.target.value;
                } else {
                    record = {
                        mixture,
                        measure: {
                            id: 5,
                        },
                        value: e.target.value,
                    };
                }
                dispatch(
                    setBatchMixtureRecordings({
                        content: [...mixtureRecordings, record],
                    })
                );
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
        <Modal
            title={title}
            size="lg"
            show={show}
            close={() => {
                setShow(false);
            }}
        >
            <ModalBody>
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
                                            onChange={onFormInputChange}
                                        />
                                        <FormFeedback>
                                            Enter a valid number.
                                        </FormFeedback>
                                    </FormGroup>
                                </Col>
                            )}
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
                                        onChange={onFormInputChange}
                                    />
                                    <FormFeedback>
                                        Enter a valid number.
                                    </FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col sm="6">
                                <Label for="mixtureEquipment">Equipment</Label>
                                <FormGroup className="mb-3">
                                    <Input
                                        type="select"
                                        className="waves-effect"
                                        value={mixture.equipment?.id || ""}
                                        placeholder={"Enter"}
                                        name="mixtureEquipment"
                                        onChange={onFormInputChange}
                                    >
                                        <option value="">Select</option>
                                        {map(equipment, (value, index) => (
                                            <option
                                                value={value.id}
                                                key={index}
                                            >
                                                {value.name}
                                            </option>
                                        ))}
                                    </Input>
                                    <FormFeedback>
                                        Select a valid equipment item.
                                    </FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                    </React.Fragment>
                )}
                {stage.task.id === 6 && (
                    <React.Fragment>
                        <Row>
                            <Col sm="6">
                                <Label for="originalGravity">
                                    Orignial Gravity (OG)
                                </Label>
                                <FormGroup className="mb-3">
                                    <Input
                                        type="text"
                                        className="waves-effect"
                                        value={originalGravity}
                                        placeholder={"Enter"}
                                        name="originalGravity"
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
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => {
                        dispatch(editBatch());
                        afterSave();
                        setShow(false);
                    }}
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

export default function BatchStage({ isOpen, mixture, stage, children }) {
    const initialVolume = useSelector((state) => {
        const record = state.Batch.MixtureRecordings.initial.find((mr) => {
            return mr.mixture.id === mixture.id && mr.measure.id === 10;
        });
        return record ? record.value : "";
    });

    const originalGravity = useSelector((state) => {
        const record =
            stage.task.id === 6 &&
            state.Batch.MixtureRecordings.initial.find((mr) => {
                return mr.mixture.id === mixture.id && mr.measure.id === 5;
            });
        return record ? record.value : "";
    });

    const equipment = useSelector((state) => {
        return state.Equipment.content;
    });

    return (
        <React.Fragment>
            {stage.task.id !== 6 && (
                <React.Fragment>
                    <CardBody className="py-3">
                        <Row>
                            <Col className="mb-3" sm="3">
                                <h4 className="font-size-12">Mixture Start</h4>
                                <span className="d-block">
                                    {stage.startedAt
                                        ? formatDatetime(stage.startedAt)
                                        : "-"}
                                </span>
                            </Col>
                            <Col className="mb-3" sm="3">
                                <h4 className="font-size-12">Mixture Finish</h4>
                                <span className="d-block">
                                    {stage.endedAt
                                        ? formatDatetime(stage.endedAt)
                                        : "-"}
                                </span>
                            </Col>
                            <Col className="mb-3" sm="3">
                                <h4 className="font-size-12">Equipment</h4>
                                <span className="d-block">
                                    {mixture.equipment?.id
                                        ? equipment.find((equipmentItem) => {
                                              return (
                                                  equipmentItem.id ===
                                                  mixture.equipment.id
                                              );
                                          })?.name
                                        : "-"}
                                </span>
                            </Col>
                            <Col className="mb-3" sm="3">
                                <h4 className="font-size-12">Status</h4>
                                <span className="d-block">
                                    {prettyName(stage.status.name)}
                                </span>
                            </Col>
                        </Row>
                        <Collapse isOpen={isOpen}>
                            <Row>
                                <Col className="mb-3" sm="3">
                                    <h4 className="font-size-12">
                                        Volume In (l)
                                    </h4>
                                    <span className="d-block">
                                        {initialVolume || "-"}
                                    </span>
                                </Col>
                                <Col className="mb-3" sm="3">
                                    <h4 className="font-size-12">
                                        Volume Out (l)
                                    </h4>
                                    <span className="d-block">
                                        {mixture.quantity.value}
                                    </span>
                                </Col>
                            </Row>
                            {children}
                        </Collapse>
                    </CardBody>
                </React.Fragment>
            )}
            {stage.task.id === 6 && (
                <React.Fragment>
                    <CardBody className="py-3">
                        <Row>
                            <Col className="mb-3" sm="3">
                                <h4 className="font-size-12">
                                    Orignial Gravity (OG)
                                </h4>
                                <span className="d-block">
                                    {originalGravity || "-"}
                                </span>
                            </Col>
                        </Row>
                    </CardBody>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}
