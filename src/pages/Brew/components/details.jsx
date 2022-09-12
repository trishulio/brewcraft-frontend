import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import {
    Input,
    Label,
    FormGroup,
    FormFeedback,
    Row,
    Col,
    Button,
    Collapse,
} from "reactstrap";
import {
    setBatchDetails,
    setBatchInvalidName,
    setBatchInvalidDescription,
    setBatchInvalidParentBrew,
    fetchProducts,
    editBatch,
    addBatch,
} from "../../../store/actions";
import {
    isValidName,
    useQuery,
    validDate,
    validId,
} from "../../../helpers/utils";
import { Card, CardBody } from "../../../component/Common/Card";
import TooltipButton from "../../../component/Common/tooltip-button";
import { formatDatetime } from "../../../helpers/textUtils";
import { Modal, ModalBody, ModalFooter } from "../../../component/Common/modal";
import { StageHeader } from "./common/stage";
import StageIngredients from "./common/stage-ingredients";
import { IngredientsDoughnut } from "./common/charts";

function BatchDetailsModal({ show, setShow, afterSave }) {
    const dispatch = useDispatch();

    const {
        data: batch,
        invalidProduct,
        invalidBatchStartedAt,
        invalidBatchEndedAt,
    } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const { content: products } = useSelector((state) => {
        return state.Products;
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
            default:
                break;
        }
    }
    return (
        <React.Fragment>
            <Modal
                title="Batch Details"
                size="lg"
                show={show}
                close={() => {
                    setShow(false);
                }}
            >
                <ModalBody>
                    <Row>
                        <Col sm="6">
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
                        {batch.id && (
                            <Col sm="6">
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
                            </Col>
                        )}
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
                                    {!batch.product?.id
                                        ? "Product must be selected"
                                        : "Invalid batch parameter"}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            if (!batch.id) {
                                dispatch(addBatch());
                            } else {
                                dispatch(editBatch());
                            }
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
        </React.Fragment>
    );
}

export default function BatchDetails() {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [toggleCharts, setToggleCharts] = useState(false);
    const dispatch = useDispatch();
    const query = useQuery();
    const tab = query.get("tab");

    const { data: batch } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const maltPortions = useSelector((state) => {
        return state.Batch.MaterialPortions.initial.filter(
            (mp) =>
                mp.materialLot.invoiceItem.material.category?.name === "Malt"
        );
    });

    const hopPortions = useSelector((state) => {
        return state.Batch.MaterialPortions.initial.filter(
            (mp) => mp.materialLot.invoiceItem.material.category?.name === "Hop"
        );
    });

    const otherPortions = useSelector((state) => {
        return state.Batch.MaterialPortions.initial.filter(
            (mp) =>
                mp.materialLot.invoiceItem.material.category?.name !== "Malt" &&
                mp.materialLot.invoiceItem.material.category?.name !== "Hop"
        );
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

    return (
        <React.Fragment>
            <Card className="shadow-none mb-1">
                <StageHeader
                    title="Batch Details"
                    toggleIsOpen={() => {
                        setIsDetailsOpen(!isDetailsOpen);
                    }}
                    toolbar={
                        <React.Fragment>
                            <TooltipButton
                                id="editDetailsButton"
                                className="waves-effect mr-1 mb-1"
                                outline={true}
                                tooltipText="Edit Details"
                                placement="bottom"
                                onClick={() => setShow(true)}
                            >
                                <i className="mdi mdi-pencil"></i>
                            </TooltipButton>
                            <TooltipButton
                                id="chartsDetailsButton"
                                className="waves-effect m-0 mr-1 mb-1"
                                outline={true}
                                tooltipText={
                                    toggleCharts ? "Hide Charts" : "Show Charts"
                                }
                                placement="bottom"
                                onClick={() => {
                                    setToggleCharts(!toggleCharts);
                                    setIsDetailsOpen(true);
                                }}
                            >
                                {toggleCharts ? (
                                    <i className="mdi mdi-table"></i>
                                ) : (
                                    <i className="mdi mdi-chart-bar"></i>
                                )}
                            </TooltipButton>
                            <TooltipButton
                                id="toggleDetailsButton"
                                className="waves-effect m-0 mr-1 mb-1"
                                outline={true}
                                tooltipText={
                                    isDetailsOpen ? "Show Less" : "Show More"
                                }
                                placement="bottom"
                                onClick={() => {
                                    setIsDetailsOpen(!isDetailsOpen);
                                }}
                            >
                                <i className="mdi mdi-arrow-up-down"></i>
                            </TooltipButton>
                        </React.Fragment>
                    }
                />
                <CardBody className="pb-0">
                    <Row>
                        <Col className="mb-3" sm="3">
                            <h4 className="">Batch ID</h4>
                            <span className="d-block">
                                {batch.id ? batch.id : "-"}
                            </span>
                        </Col>
                        <Col className="mb-3" sm="3">
                            <h4 className="">Batch Start</h4>
                            <span className="d-block">
                                {batch.startedAt
                                    ? formatDatetime(batch.startedAt)
                                    : "-"}
                            </span>
                        </Col>
                        <Col className="mb-3" sm="3">
                            <h4 className="">Batch Finish</h4>
                            <span className="d-block">
                                {batch.endedAt
                                    ? formatDatetime(batch.endedAt)
                                    : "-"}
                            </span>
                        </Col>
                        <Col className="mb-3" sm="3">
                            <h4 className="">Product</h4>
                            <span className="d-block">
                                {batch.product.name ? batch.product.name : "-"}
                            </span>
                        </Col>
                    </Row>
                    <Collapse isOpen={isDetailsOpen}>
                        <Row>
                            <Col className="mb-3" sm={toggleCharts ? 4 : 6}>
                                <StageIngredients
                                    lotPortions={maltPortions}
                                    chart={
                                        <div
                                            style={{
                                                maxWidth: "180px",
                                            }}
                                        >
                                            <IngredientsDoughnut
                                                materialLots={maltPortions}
                                            />
                                        </div>
                                    }
                                    toggleCharts={toggleCharts}
                                    title="Total Malt"
                                    noData="No Malt"
                                />
                            </Col>
                            <Col className="mb-3" sm={toggleCharts ? 4 : 6}>
                                <StageIngredients
                                    lotPortions={hopPortions}
                                    chart={
                                        <div
                                            style={{
                                                maxWidth: "180px",
                                            }}
                                        >
                                            <IngredientsDoughnut
                                                materialLots={hopPortions}
                                            />
                                        </div>
                                    }
                                    toggleCharts={toggleCharts}
                                    title="Total Hops"
                                    noData="No Hops"
                                />
                            </Col>
                            <Col className="mb-3" sm={toggleCharts ? 4 : 6}>
                                <StageIngredients
                                    lotPortions={otherPortions}
                                    chart={
                                        <div
                                            style={{
                                                maxWidth: "180px",
                                            }}
                                        >
                                            <IngredientsDoughnut
                                                materialLots={otherPortions}
                                            />
                                        </div>
                                    }
                                    toggleCharts={toggleCharts}
                                    title="Other Ingredients"
                                    noData="No Ingredients"
                                />
                            </Col>
                        </Row>
                    </Collapse>
                </CardBody>
            </Card>

            <BatchDetailsModal
                show={show}
                setShow={setShow}
                afterSave={() => setShow(true)}
            />
        </React.Fragment>
    );
}
