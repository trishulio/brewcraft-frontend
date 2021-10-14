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
    setBatchInvalidParentBrew,
    setBatchInvalidProduct,
    setBatchInvalidStartedAt,
    setBatchInvalidEndedAt,
    setBatchInvalidDescription,
    setBatchInvalidBatchId
} from "../../../store/actions";
import { formatDatetime } from "../../../helpers/textUtils";
import {
    Card,
    CardBody,
    CardHeader
} from "../../../component/Common/Card";
import Toolbar from "./toolbar";

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

    const statuses = useSelector(state => {
        return state.BatchStatus.content;
    });

    const tasks = useSelector(state => {
        return state.BatchTask.content;
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
        <Card>
            <CardHeader>
                Batch Details
            </CardHeader>
            <CardBody>
                <Row>
                    <Col xs="2">
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
                    <Col xs="2">
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
                    <Col xs="2">
                        <Label
                            for="batchParentBrew"
                            className="mb-3"
                        >
                            Parent
                        </Label>
                    </Col>
                    <Col xs="8">
                        <div hidden={false}>
                            {batch.parentBrew ? batch.parentBrew.name : "-"}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs="2">
                        <Label
                            for="batchProduct"
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
                    <Col xs="2">
                        <Label
                            for="batchStartDateTime"
                            className="mb-3"
                        >
                            Start Date
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
                                style={{maxWidth: "16rem"}}
                                value={batch.startedAt}
                                onChange={onFormInputChange}
                                hidden={!props.editable}
                            />
                            <FormFeedback>Enter a valid start date.</FormFeedback>
                        </FormGroup>
                        <div hidden={props.editable}>
                            {batch.startedAt ? formatDatetime(batch.startedAt) : "-"}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs="2">
                        <Label
                            for="batchEndDateTime"
                            className="mb-3"
                        >
                            End Date
                        </Label>
                    </Col>
                    <Col xs="8">
                        <FormGroup
                            hidden={!props.editable}
                        >
                            <Input
                                type="datetime-local"
                                name="batchEndDateTime"
                                className="waves-effect"
                                // bsSize="sm"
                                style={{maxWidth: "16rem"}}
                                value={batch.endedAt}
                                onChange={onFormInputChange}
                                hidden={!props.editable}
                            />
                            <FormFeedback>Enter a valid end date.</FormFeedback>
                        </FormGroup>
                        <div hidden={props.editable}>
                            {batch.startedAt ? formatDatetime(batch.startedAt) : "-"}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs="2">
                        <Label
                            for="batchDescription"
                        >
                            Description
                        </Label>
                    </Col>
                    <Col xs="10">
                        <Input
                            type="textarea"
                            className="waves-effect mb-4"
                            value={batch.description}
                            rows={8}
                            name="batchDescription"
                            style={{ maxWidth: "40rem" }}
                            disabled={!props.editable}
                            onChange={onFormInputChange}
                            autoComplete="false"
                        />
                    </Col>
                </Row>
                <Toolbar {...props} className="mb-3"/>
            </CardBody>
        </Card>
    )
};

