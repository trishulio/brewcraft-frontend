import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import { Input, Label, FormGroup, FormFeedback, Row, Col } from "reactstrap";
import {
    setBatchDetails,
    setBatchInvalidName,
    setBatchInvalidDescription,
    setBatchInvalidParentBrew,
    fetchProducts,
    setTransferMixtureRecords,
} from "../../../store/actions";
import {
    isValidName,
    isValidNumberString,
    useQuery,
    validDate,
    validId,
} from "../../../helpers/utils";
import { Card, CardBody, CardHeader } from "../../../component/Common/Card";

export default function BatchDetails(props) {
    const [isDetailsOpen, setIsDetailsOpen] = useState(true);
    const dispatch = useDispatch();
    const query = useQuery();
    const tab = query.get("tab");

    const {
        data: batch,
        loading,
        editable,
        invalidBatchId,
        invalidProduct,
        invalidBatchStartedAt,
        invalidBatchEndedAt,
    } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const { content: products } = useSelector((state) => {
        return state.Products;
    });

    const originalGravity = useSelector((state) => {
        return state.Batch.TransferMixtureRecordings.content.find(
            (r) => r.measure.name === "gravity"
        );
    });

    const transferMixture = useSelector((state) => {
        return state.Batch.TransferMixture.data;
    });

    const { content: transferMixtureRecords } = useSelector((state) => {
        return state.Batch.TransferMixtureRecordings;
    });

    useEffect(() => {
        setTimeout(() => {
            dispatch(
                fetchProducts({
                    pageSize: 1000,
                })
            );
        });
        // eslint-disable-next-line
    }, [tab]);

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
            case "transferOriginalGravity":
                let invalid;
                if (!e.target.value) {
                    invalid = false;
                } else {
                    invalid = !isValidNumberString(e.target.value);
                }
                if (!originalGravity) {
                    dispatch(
                        setTransferMixtureRecords({
                            content: [
                                ...transferMixtureRecords,
                                {
                                    measure: {
                                        id: 5,
                                        name: "gravity",
                                        version: 1,
                                    },
                                    value: e.target.value,
                                    recordedAt: null,
                                    mixture: transferMixture,
                                },
                            ],
                            invalidOriginalGravity: invalid,
                        })
                    );
                } else {
                    originalGravity.value = e.target.value;
                    dispatch(
                        setTransferMixtureRecords({
                            content: JSON.parse(
                                JSON.stringify(transferMixtureRecords)
                            ),
                            invalidOriginalGravity: invalid,
                        })
                    );
                }
                break;
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            <Card className="shadow-none mb-1">
                <CardHeader>
                    <div
                        className="mr-2"
                        onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                    >
                        <i
                            className={`fa fa-caret-right font-size-13 mr-2 ${
                                isDetailsOpen ? " rotate-down" : ""
                            }`}
                        ></i>
                        <span
                            className="text-dark"
                            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                            style={{ cursor: "pointer" }}
                        >
                            Details
                        </span>
                    </div>
                </CardHeader>
                <CardBody
                    isLoading={loading}
                    isOpen={isDetailsOpen}
                    className="pb-0"
                >
                    <Row>
                        <Col sm="6" xl="4">
                            <Label
                                for="batchBatchId"
                                style={{
                                    width: "6rem",
                                }}
                            >
                                {editable ? "* Batch ID" : "Batch ID"}
                            </Label>
                            <FormGroup>
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    value={batch.batchId}
                                    placeholder="Enter"
                                    name="batchBatchId"
                                    onChange={onFormInputChange}
                                    // style={{ width: "16rem" }}
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
                                style={{
                                    width: "6rem",
                                }}
                            >
                                {editable ? "* Product" : "Product"}
                            </Label>
                            <FormGroup>
                                <Input
                                    type="select"
                                    className="waves-effect"
                                    name="batchProduct"
                                    // style={{ width: "16rem" }}
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
                        <Col sm="6" xl="4">
                            <Label
                                for="batchStartDateTime"
                                className="align-top"
                            >
                                Batch Start Date
                            </Label>
                            <FormGroup className="align-middle">
                                <Input
                                    type="datetime-local"
                                    name="batchStartDateTime"
                                    className="waves-effect"
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
                            {batch.id && (
                                <React.Fragment>
                                    <Label
                                        for="batchFinishDateTime"
                                        className="align-top"
                                    >
                                        Batch Finish Date
                                    </Label>
                                    <FormGroup className="align-middle">
                                        <Input
                                            type="datetime-local"
                                            name="batchFinishDateTime"
                                            className="waves-effect"
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
                                </React.Fragment>
                            )}
                        </Col>
                        <Col sm="6" xl="4">
                            <Label
                                for="batchStatus"
                                style={{
                                    width: "140em",
                                }}
                            >
                                Batch Status
                            </Label>
                            <FormGroup>
                                <Input
                                    type="select"
                                    className="waves-effect"
                                    name="batchStatus"
                                    style={{ width: "100%" }}
                                    disabled={true}
                                >
                                    <option value="1">In Progress</option>
                                    <option value="2">Complete</option>
                                    <option value="3">Failed</option>
                                    <option value="4">Not started</option>
                                    <option value="5">Stopped</option>
                                </Input>
                                <FormFeedback>
                                    Enter a valid number.
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}
