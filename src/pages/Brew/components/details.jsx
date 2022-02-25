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
} from "../../../store/actions";
import {
    isValidName,
    useQuery,
    validDate,
    validId,
} from "../../../helpers/utils";
import { Card, CardBody, CardHeader } from "../../../component/Common/Card";

export default function BatchDetails() {
    const [isDetailsOpen, setIsDetailsOpen] = useState(true);
    const dispatch = useDispatch();
    const query = useQuery();
    const tab = query.get("tab");

    const {
        data: batch,
        invalidProduct,
        invalidBatchStartedAt,
        invalidBatchEndedAt,
    } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const loading = useSelector((state) => {
        return state.Batch.Batch.loading;
    });

    const { content: products } = useSelector((state) => {
        return state.Products;
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
                            Batch Overview
                        </span>
                    </div>
                </CardHeader>
                <CardBody
                    isLoading={loading}
                    isOpen={isDetailsOpen}
                    className="pb-0"
                >
                    <Row>
                        <Col sm="6">
                            <Label for="batchBatchId">Batch ID</Label>
                            <div
                                className="mb-3"
                                style={{
                                    height: "2.09375rem",
                                }}
                            >
                                <span
                                    id="batchBatchId"
                                    className="align-middle font-size-14"
                                >
                                    {batch.id ? batch.id : "-"}
                                </span>
                            </div>
                            <div className="clearfix"></div>
                            <Label
                                for="batchStartDateTime"
                                className="align-top"
                            >
                                Batch Start
                            </Label>
                            <FormGroup className="align-middle">
                                <Input
                                    type="datetime-local"
                                    name="batchStartDateTime"
                                    className="waves-effect"
                                    value={batch.startedAt}
                                    onChange={onFormInputChange}
                                    invalid={invalidBatchStartedAt}
                                />
                                <FormFeedback>
                                    {!batch.startedAt
                                        ? "Enter a valid time and date"
                                        : "Invalid batch parameter"}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col sm="6">
                            <Label
                                for="batchProduct"
                                style={{
                                    width: "6rem",
                                }}
                            >
                                Product
                            </Label>
                            <FormGroup>
                                <Input
                                    type="select"
                                    className="waves-effect"
                                    name="batchProduct"
                                    value={batch.product?.id || ""}
                                    onChange={(e) => {
                                        onFormInputChange(e);
                                    }}
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
                            <div className="clearfix"></div>
                            <React.Fragment>
                                <Label
                                    for="batchFinishDateTime"
                                    className="align-top"
                                >
                                    Batch Finish
                                </Label>
                                <FormGroup className="align-middle">
                                    <Input
                                        type="datetime-local"
                                        name="batchFinishDateTime"
                                        className="waves-effect"
                                        value={batch.endedAt || ""}
                                        onChange={onFormInputChange}
                                        disabled={!batch.id}
                                        invalid={invalidBatchEndedAt}
                                    />
                                    <FormFeedback>
                                        {!batch.endedAt
                                            ? "Enter a valid time and date"
                                            : "Invalid batch parameter"}
                                    </FormFeedback>
                                </FormGroup>
                            </React.Fragment>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}
