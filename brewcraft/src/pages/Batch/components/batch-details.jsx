import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import {
    Row,
    Col,
    Input,
    Label,
    FormGroup,
    FormFeedback
} from "reactstrap";
import {
    setBatchDetails,
    setBatchInvalidName,
    setBatchInvalidStartedAt,
    setBatchInvalidEndedAt,
    setBatchInvalidDescription,
    setBatchInvalidBatchId,
    setBatchInvalidParentBrew,
    setBatchInvalidProduct
} from "../../../store/actions";
import { formatDatetime } from "../../../helpers/textUtils";
import Product from "./batch-product";

export default function BatchMetadata(props) {

    const dispatch = useDispatch();

    const batch = useSelector(state => {
        return state.Batch.details.data;
    });

    const { invalidName, invalidBatchId, invalidProduct } = useSelector(state => {
        return state.Batch.details;
    });

    const products = useSelector(state => {
        return state.Products.all;
    });

    function onFormInputChange(e) {
        switch(e.target.name) {
            case "batchName":
                if (batch.name !== e.target.value) {
                    dispatch(setBatchInvalidName(!e.target.value));
                    dispatch(setBatchDetails({
                        data: {
                            ...batch,
                            name: e.target.value
                        }
                    }));
                }
                break;
            case "batchBatchId":
                if (batch.batchId !== e.target.value) {
                    dispatch(setBatchInvalidBatchId(!e.target.value));
                    dispatch(setBatchDetails({
                        data: {
                            ...batch,
                            batchId: e.target.value
                        }
                    }));
                }
                break;
            case "batchParentBrew":
                if (batch.parentBrew?.id !== e.target.value) {
                    dispatch(setBatchInvalidParentBrew(!e.target.value));
                    dispatch(setBatchDetails({
                        data: {
                            ...batch,
                            parentBrew: { id: e.target.value }
                        }
                    }));
                }
                break;
            case "batchProduct":
                if (batch.product?.id !== e.target.value) {
                    dispatch(setBatchInvalidProduct(!e.target.value));
                    dispatch(setBatchDetails({
                        data: {
                            ...batch,
                            product: { id: e.target.value }
                        }
                    }));
                }
                break;
            case "batchStartDateTime":
                if (batch.startedAt !== e.target.value) {
                    dispatch(setBatchInvalidStartedAt(!e.target.value));
                    dispatch(setBatchDetails({
                        data: {
                            ...batch,
                            startedAt: e.target.value
                        }
                    }));
                }
                break;
            case "batchEndDateTime":
                if (batch.endedAt !== e.target.value) {
                    dispatch(setBatchInvalidEndedAt(!e.target.value));
                    dispatch(setBatchDetails({
                        data: {
                            ...batch,
                            endedAt: e.target.value
                        }
                    }));
                }
                break;
            case "batchDescription":
                if (batch.description !== e.target.value) {
                    dispatch(setBatchInvalidDescription(!e.target.value));
                    dispatch(setBatchDetails({
                        data: {
                            ...batch,
                            description: e.target.value
                        }
                    }));
                }
                break;
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            <div className="mb-4">
                <div className="d-sm-inline-block align-middle mb-4 mb-sm-0">
                    <Product {...props}/>
                </div>
                <div className="d-sm-inline-block align-middle ml-0 ml-sm-4">
                    <Row hidden={props.editable}>
                        <Col xs="4">
                            <Label
                                for="batchParentBrew"
                                className="my-3"
                            >
                                Parent
                            </Label>
                        </Col>
                        <Col xs="8">
                            <div className="mt-3">
                                {batch.parentBrew ? batch.parentBrew.name : "-"}
                            </div>
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col xs="2">
                            <Label
                                for="batchStartDateTime"
                                // className="mb-3"
                            >
                                Progress
                            </Label>
                        </Col>
                        <Col xs="8">
                            <Progress
                                color="primary"
                                className="mb-3"
                                style={{
                                    height: "2rem",
                                    width: "16rem"
                                }}
                                value={25}
                            >
                                Kettle 25%
                            </Progress>
                        </Col>
                    </Row> */}
                    <Row>
                        <Col xs="4">
                            <Label
                                for="batchName"
                                className="mb-3"
                            >
                                Product
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup
                                hidden={!props.editable}
                            >
                                <Input
                                    type="select"
                                    className="waves-effect"
                                    // bsSize="sm"
                                    name="batchProduct"
                                    style={{ width: "16rem" }}
                                    disabled={!props.editable}
                                    invalid={invalidProduct}
                                    value={batch.product?.id || ""}
                                    onChange={e => {
                                        onFormInputChange(e);
                                    }}
                                >
                                    <option value="">Select</option>
                                    {
                                        map(products, (value, index) => (
                                            <option value={value.id} key={index}>
                                                {value.name}
                                            </option>
                                        ))
                                    }
                                </Input>
                                <FormFeedback>Enter a valid batch product.</FormFeedback>
                            </FormGroup>
                            <div hidden={props.editable}>
                                {batch.product ? batch.product.name : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            <Label
                                for="batchName"
                                className="mb-3"
                            >
                                Name
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup
                                hidden={!props.editable}
                            >
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    // bsSize="sm"
                                    value={batch.name}
                                    placeholder="Enter"
                                    name="batchName"
                                    disabled={!props.editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidName}
                                    style={{ width: "16rem" }}
                                />
                                <FormFeedback>Enter a valid batch name.</FormFeedback>
                            </FormGroup>
                            <div hidden={props.editable}>
                                {batch.name ? batch.name : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            <Label
                                for="batchBatchId"
                                className="mb-3"
                            >
                                Batch ID
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup
                                hidden={!props.editable}
                            >
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    // bsSize="sm"
                                    value={batch.batchId}
                                    placeholder="Enter"
                                    name="batchBatchId"
                                    disabled={!props.editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidBatchId}
                                    style={{ width: "16rem" }}
                                />
                                <FormFeedback>Enter a valid batch id.</FormFeedback>
                            </FormGroup>
                            <div hidden={props.editable}>
                                {batch.batchId ? batch.batchId : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            <Label
                                for="batchStartDateTime"
                                className="mb-3"
                            >
                                Start
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup
                                hidden={!props.editable}
                            >
                                <Input
                                    type="datetime-local"
                                    name="batchStartDateTime"
                                    className="waves-effect"
                                    // bsSize="sm"
                                    style={{ width: "16rem" }}
                                    value={batch.startedAt}
                                    onChange={onFormInputChange}
                                    hidden={!props.editable}
                                />
                                <FormFeedback>Enter a valid start date.</FormFeedback>
                            </FormGroup>
                            <div
                                style={{
                                    minWidth: "16rem"
                                }}
                                hidden={props.editable}
                            >
                                {batch.startedAt ? formatDatetime(batch.startedAt) : "-"}
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            </React.Fragment>
    )
};

