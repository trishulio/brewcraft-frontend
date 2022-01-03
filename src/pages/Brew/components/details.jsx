import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import {
    Input,
    Label,
    FormGroup,
    FormFeedback,
    Card,
    CardBody,
    CardHeader,
    Row,
    Col,
    Button,
    CardFooter,
    Alert,
} from "reactstrap";
import {
    setBatchDetails,
    setBatchInvalidName,
    setBatchInvalidDescription,
    setBatchInvalidParentBrew,
    setTransferMixtureRecords,
} from "../../../store/actions";
import { isValidName, validDate, validId } from "../../../helpers/utils";

export default function BatchMetadata(props) {
    const dispatch = useDispatch();

    const {
        data: batch,
        initial: initialBatch,
        editable,
        changed,
        error,
        invalidBatchId,
        invalidProduct,
        invalidBatchStartedAt,
        invalidBatchEndedAt,
    } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const products = useSelector((state) => {
        return state.Products.content;
    });

    const transferMixture = useSelector((state) => {
        return state.Batch.TransferMixture.data;
    });

    const mixtureRecords = useSelector((state) => {
        return state.Batch.TransferMixtureRecordings.content;
    });

    function onFormInputChange(e) {
        switch (e.target.name) {
            case "batchName":
                if (batch.name !== e.target.value) {
                    dispatch(setBatchInvalidName(!e.target.value));
                    dispatch(
                        setBatchDetails({
                            data: {
                                ...batch,
                                name: e.target.value,
                            },
                        })
                    );
                }
                break;
            case "batchBatchId":
                if (batch.batchId !== e.target.value) {
                    dispatch(
                        setBatchDetails({
                            data: {
                                ...batch,
                                batchId: e.target.value.trim(),
                            },
                            invalidBatchId: !isValidName(e.target.value),
                        })
                    );
                }
                break;
            case "batchParentBrew":
                if (batch.parentBrew?.id !== e.target.value) {
                    dispatch(setBatchInvalidParentBrew(!e.target.value));
                    dispatch(
                        setBatchDetails({
                            data: {
                                ...batch,
                                parentBrew: { id: e.target.value },
                            },
                        })
                    );
                }
                break;
            case "batchProduct":
                if (batch.product?.id !== e.target.value) {
                    dispatch(
                        setBatchDetails({
                            data: {
                                ...batch,
                                product: { id: e.target.value },
                            },
                            invalidProduct: !validId(e.target.value),
                        })
                    );
                }
                break;
            case "batchStartDateTime":
                if (batch.startedAt !== e.target.value) {
                    dispatch(
                        setBatchDetails({
                            data: {
                                ...batch,
                                startedAt: e.target.value,
                            },
                            invalidBatchStartedAt: !validDate(e.target.value),
                        })
                    );
                }
                break;
            case "batchFinishDateTime":
                dispatch(
                    setBatchDetails({
                        data: {
                            ...batch,
                            endedAt: e.target.value,
                        },
                        invalidBatchEndedAt:
                            e.target.value && !validDate(e.target.value)
                                ? true
                                : false,
                    })
                );
                break;
            case "batchDescription":
                if (batch.description !== e.target.value) {
                    dispatch(setBatchInvalidDescription(!e.target.value));
                    dispatch(
                        setBatchDetails({
                            data: {
                                ...batch,
                                description: e.target.value,
                            },
                        })
                    );
                }
                break;
            case "transferMixtureGravity":
                let record;
                const index = mixtureRecords.findIndex(
                    (r) => r.measure.id === 5
                );
                if (index >= 0) {
                    record = mixtureRecords.splice(index, 1)[0];
                    record.value = parseInt(e.target.value);
                } else {
                    record = {
                        mixture: transferMixture,
                        measure: {
                            id: 5,
                        },
                        value: parseInt(e.target.value),
                    };
                }
                dispatch(
                    setTransferMixtureRecords({
                        content: [...mixtureRecords, record],
                    })
                );
                break;
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            {error && (
                <Alert color="info" className="mt-2 mb-4">
                    <strong>Oh snap!</strong> Change a few things up and try
                    submitting again.
                </Alert>
            )}
            <Card>
                <CardHeader>Brew Details</CardHeader>
                <CardBody>
                    <Row className="px-2">
                        <Col sm="6">
                            <Label
                                for="batchBatchId"
                                className="d-sm-inline-block align-top"
                                style={{
                                    width: "6rem",
                                }}
                            >
                                {editable ? "* Batch ID" : "Batch ID"}
                            </Label>
                            <FormGroup className="d-sm-inline-block align-middle">
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    value={batch.batchId}
                                    placeholder="Enter"
                                    name="batchBatchId"
                                    onChange={onFormInputChange}
                                    style={{ width: "16rem" }}
                                    disabled={batch.id && !editable}
                                    invalid={invalidBatchId}
                                />
                                <FormFeedback>
                                    {editable || !batch.id
                                        ? "Batch ID is required"
                                        : "Invalid batch parameter"}
                                </FormFeedback>
                            </FormGroup>
                            <div className="clearfix"></div>
                            <Label
                                for="batchProduct"
                                className="d-sm-inline-block align-top"
                                style={{
                                    width: "6rem",
                                }}
                            >
                                {editable ? "* Product" : "Product"}
                            </Label>
                            <FormGroup className="d-sm-inline-block align-middle">
                                <Input
                                    type="select"
                                    className="waves-effect"
                                    name="batchProduct"
                                    style={{ width: "16rem" }}
                                    value={batch.product?.id || ""}
                                    onChange={(e) => {
                                        onFormInputChange(e);
                                    }}
                                    disabled={batch.id && !editable}
                                    invalid={invalidProduct}
                                >
                                    <option value="">Select</option>
                                    {map(products, (value, index) => (
                                        <option value={value.id} key={index}>
                                            {value.name}
                                        </option>
                                    ))}
                                </Input>
                                <FormFeedback>
                                    {!batch.product.id
                                        ? "Product must be selected"
                                        : "Invalid batch parameter"}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col sm="6">
                            <Label
                                for="batchStartDateTime"
                                className="d-sm-inline-block align-top"
                                style={{
                                    width: "6rem",
                                }}
                            >
                                {editable ? "* Start Time" : "Start Time"}
                            </Label>
                            <FormGroup className="d-sm-inline-block align-middle">
                                <Input
                                    type="datetime-local"
                                    name="batchStartDateTime"
                                    className="waves-effect"
                                    style={{ width: "16rem" }}
                                    value={batch.startedAt}
                                    onChange={onFormInputChange}
                                    disabled={batch.id && !editable}
                                    invalid={invalidBatchStartedAt}
                                />
                                <FormFeedback>
                                    {!batch.startedAt
                                        ? "Enter a valid time and date"
                                        : "Invalid batch parameter"}
                                </FormFeedback>
                            </FormGroup>
                            <div className="clearfix"></div>
                            <Label
                                for="batchFinishDateTime"
                                className="d-sm-inline-block align-top"
                                style={{
                                    width: "6rem",
                                }}
                            >
                                Finish Time
                            </Label>
                            <FormGroup className="d-sm-inline-block align-middle">
                                <Input
                                    type="datetime-local"
                                    name="batchFinishDateTime"
                                    className="waves-effect"
                                    style={{ width: "16rem" }}
                                    value={batch.endedAt || ""}
                                    onChange={onFormInputChange}
                                    disabled={batch.id && !editable}
                                    invalid={invalidBatchEndedAt}
                                />
                                <FormFeedback>
                                    {!batch.endedAt
                                        ? "Enter a valid time and date"
                                        : "Invalid batch parameter"}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button
                        type="button"
                        color="secondary"
                        size="sm"
                        className="waves-effect"
                        onClick={() => {
                            dispatch(
                                setBatchDetails({
                                    editable: true,
                                })
                            );
                        }}
                        hidden={editable || !batch.id}
                    >
                        Edit
                    </Button>
                </CardBody>
                {(editable || !batch.id) && (
                    <CardFooter>
                        <Button
                            type="button"
                            color="primary"
                            size="sm"
                            className="waves-effect mr-2"
                            onClick={props.onSave}
                            disabled={!changed}
                        >
                            Save
                        </Button>
                        {batch.id && (
                            <Button
                                type="button"
                                color="secondary"
                                size="sm"
                                className="waves-effect mr-2"
                                onClick={() => {
                                    dispatch(
                                        setBatchDetails({
                                            data: {
                                                ...initialBatch,
                                            },
                                            editable: false,
                                        })
                                    );
                                }}
                            >
                                Done
                            </Button>
                        )}
                    </CardFooter>
                )}
            </Card>
        </React.Fragment>
    );
}
