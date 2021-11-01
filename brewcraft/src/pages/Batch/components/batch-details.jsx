import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import {
    Input,
    Label,
    FormGroup,
    FormFeedback,
    Card,
    CardHeader,
    CardBody
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
import Toolbar from "./toolbar";

export default function BatchMetadata(props) {

    const dispatch = useDispatch();

    const batch = useSelector(state => {
        return state.Batch.details.data;
    });

    const { invalidBatchId, invalidProduct } = useSelector(state => {
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
            <Card className="mb-3">
                <CardHeader>
                    <div className="float-left">
                        <h4 className="card-title font-size-14 pt-1">Batch </h4>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="d-sm-inline-block align-bottom mr-0 mr-sm-4 mb-3">
                        <Product {...props}/>
                    </div>
                    <div className="d-sm-inline-block align-top mr-0 mr-sm-4 mb-3">
                        <Label
                            for="batchProduct"
                            className="d-sm-inline-block font-size-12 mb-3"
                            style={{
                                width: "5rem"
                            }}
                        >
                            Product
                        </Label>
                        <FormGroup
                            className="d-sm-inline-block font-size-12 mb-3"
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
                                hidden={!props.editable}
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
                        <div className="d-sm-inline-block font-size-12 mb-3">
                            <div hidden={props.editable}>
                                {batch.product ? batch.product.name : "-"}
                            </div>
                        </div>
                        <div className="clearFix"></div>
                        <Label
                            for="batchBatchId"
                            className="d-sm-inline-block font-size-12f mb-3"
                            style={{
                                width: "5rem"
                            }}
                        >
                            Batch ID
                        </Label>
                        <FormGroup
                            className="d-sm-inline-block font-size-12 mb-3"
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
                                hidden={!props.editable}
                            />
                            <FormFeedback>Enter a valid batch id.</FormFeedback>
                        </FormGroup>
                        <div className="d-sm-inline-block font-size-12 mb-3">
                            <div hidden={props.editable}>
                                {batch.batchId ? batch.batchId : "-"}
                            </div>
                        </div>
                        <div className="clearfix"></div>
                        <Label
                            for="batchParentBrew"
                            className="d-sm-inline-block font-size-12 mb-3"
                            style={{
                                width: "5rem"
                            }}
                        >
                            Parent
                        </Label>
                        <div className="d-sm-inline-block font-size-12 mb-3">
                            {batch.parentBrew ? batch.parentBrew.name : "-"}
                        </div>
                        <div className="clearfix"></div>
                        <Label
                            for="batchStartDateTime"
                            className="d-sm-inline-block font-size-12 mb-3"
                            style={{
                                width: "5rem"
                            }}
                        >
                            Start
                        </Label>
                        <FormGroup
                            className="d-sm-inline-block font-size-12 mb-3"
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
                        <div className="d-sm-inline-block font-size-12 mb-3">
                            <div hidden={props.editable}>
                                {batch.startedAt ? formatDatetime(batch.startedAt) : "-"}
                            </div>
                        </div>
                        <div className="clearFix mt-3"></div>
                        <Toolbar {...props}/>
                    </div>
                    {/* <div className="d-sm-inline-block align-top mr-0 mr-sm-4 mb-3">
                            <Toolbar {...props}/>
                    </div> */}
                </CardBody>
            </Card>
        </React.Fragment>
    )
};
