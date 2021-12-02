import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import {
    Input,
    Label,
    FormGroup,
    FormFeedback
} from "reactstrap";
import {
    setBatchDetails,
    setBatchInvalidName,
    setBatchInvalidDescription,
    setBatchInvalidParentBrew,
    setTransferMixtureRecords
} from "../../../store/actions";
import { formatDatetime } from "../../../helpers/textUtils";
import fantasticLager from "../../../assets/images/products/fantastic-lager.jpg";
import { isValidName, validDate, validId } from "../../../helpers/utils";

export default function BatchMetadata(props) {

    const dispatch = useDispatch();

    const { data: batch, invalidBatchId, invalidProduct, invalidBatchStartedAt, invalidBatchEndedAt } = useSelector(state => {
        return state.Batch.Batch;
    });

    const products = useSelector(state => {
        return state.Products.all;
    });

    const transferMixture = useSelector(state => {
        return state.Batch.TransferMixture.data;
    });

    const mixtureRecords = useSelector(state => {
        return state.Batch.TransferMixtureRecordings.content;
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
                    dispatch(setBatchDetails({
                        data: {
                            ...batch,
                            batchId: e.target.value.trim()
                        },
                        invalidBatchId: !isValidName(e.target.value)
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
                    dispatch(setBatchDetails({
                        data: {
                            ...batch,
                            product: { id: e.target.value }
                        },
                        invalidProduct: !validId(e.target.value)
                    }));
                }
                break;
            case "batchStartDateTime":
                if (batch.startedAt !== e.target.value) {
                    dispatch(setBatchDetails({
                        data: {
                            ...batch,
                            startedAt: e.target.value
                        },
                        invalidBatchStartedAt: !validDate(e.target.value)
                    }));
                }
                break;
            case "batchFinishDateTime":
                dispatch(setBatchDetails({
                    data: {
                        ...batch,
                        endedAt: e.target.value
                    },
                    invalidBatchEndedAt: e.target.value && !validDate(e.target.value) ? true : false
                }));
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
            case "transferMixtureGravity":
                let record;
                const index = mixtureRecords.findIndex(r => r.measure.id === 5);
                if (index >= 0) {
                    record = mixtureRecords.splice(index, 1)[0];
                    record.value = parseInt(e.target.value);
                } else {
                    record = {
                        mixture: transferMixture,
                        measure: {
                            id: 5
                        },
                        value: parseInt(e.target.value)
                    }
                }
                dispatch(setTransferMixtureRecords({
                    content: [
                        ...mixtureRecords,
                        record
                    ]
                }));
                break;
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            <div className="d-inline-block align-top mr-5">
                <Label
                    for="batchBatchId"
                    className="d-sm-inline-block align-top"
                    style={{
                        width: "6rem"
                    }}
                >
                    {props.editable ? "* Batch ID" : "Batch ID" }
                </Label>
                <FormGroup
                    className="d-sm-inline-block align-middle"
                    hidden={!props.editable}
                >
                    <Input
                        type="text"
                        className="waves-effect"
                        value={batch.batchId}
                        placeholder="Enter"
                        name="batchBatchId"
                        disabled={!props.editable}
                        onChange={onFormInputChange}
                        style={{ width: "16rem" }}
                        hidden={!props.editable}
                        invalid={invalidBatchId}
                    />
                    <FormFeedback>
                        {!batch.id ? "Batch ID is required" : "Invalid batch parameter"}</FormFeedback>
                </FormGroup>
                <div className="d-sm-inline-block align-middle mb-2">
                    <div hidden={props.editable}>
                        {batch.batchId ? batch.batchId : "-"}
                    </div>
                </div>
                <div className="clearfix"></div>
                <Label
                    for="batchProduct"
                    className="d-sm-inline-block align-top"
                    style={{
                        width: "6rem"
                    }}
                >
                    {props.editable ? "* Product" : "Product"}
                </Label>
                <FormGroup
                    className="d-sm-inline-block align-middle"
                    hidden={!props.editable}
                >
                    <Input
                        type="select"
                        className="waves-effect"
                        name="batchProduct"
                        style={{ width: "16rem" }}
                        disabled={!props.editable}
                        value={batch.product?.id || ""}
                        onChange={e => {
                            onFormInputChange(e);
                        }}
                        hidden={!props.editable}
                        invalid={invalidProduct}
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
                    <FormFeedback>{
                        !batch.product.id ? "Product must be selected" : "Invalid batch parameter"
                    }
                    </FormFeedback>
                </FormGroup>
                {!props.editable &&
                    <React.Fragment>
                        <div className="d-inline-block align-top mr-0 mb-2">
                            <div className="mr-2">
                                <img style={{ height: "2.5rem", margin: "0 auto" }} src={fantasticLager} alt="product" className="border d-block" />
                            </div>
                        </div>
                        <div className="d-inline-block align-middle">
                            {batch.product ? batch.product.name : "-"}
                        </div>
                        <div className="clearFix"></div>
                    </React.Fragment>
                }
            </div>
            <div className="d-inline-block align-top">
            <Label
                    for="batchStartDateTime"
                    className="d-sm-inline-block align-top"
                    style={{
                        width: "6rem"
                    }}
                >
                    {props.editable ? "* Start Time" : "Start Time" }
                </Label>
                <FormGroup
                    className="d-sm-inline-block align-middle"
                    hidden={!props.editable}
                >
                    <Input
                        type="datetime-local"
                        name="batchStartDateTime"
                        className="waves-effect"
                        style={{ width: "16rem" }}
                        value={batch.startedAt}
                        onChange={onFormInputChange}
                        hidden={!props.editable}
                        invalid={invalidBatchStartedAt}
                    />
                    <FormFeedback>Enter a valid time and date.</FormFeedback>
                </FormGroup>
                <div className="d-sm-inline-block align-middle mb-2">
                    <div hidden={props.editable}>
                        {batch.startedAt ? formatDatetime(batch.startedAt) : "-"}
                    </div>
                </div>
                <div className="clearfix"></div>
                <Label
                    for="batchFinishDateTime"
                    className="d-sm-inline-block align-top"
                    style={{
                        width: "6rem"
                    }}
                >
                    Finish Time
                </Label>
                <FormGroup
                    className="d-sm-inline-block align-middle"
                    hidden={!props.editable}
                >
                    <Input
                        type="datetime-local"
                        name="batchFinishDateTime"
                        className="waves-effect"
                        style={{ width: "16rem" }}
                        value={batch.endedAt}
                        onChange={onFormInputChange}
                        hidden={!props.editable}
                        invalid={invalidBatchEndedAt}
                    />
                    <FormFeedback>Enter a valid time and date.</FormFeedback>
                </FormGroup>
                <div className="d-sm-inline-block align-middle mb-2">
                    <div hidden={props.editable}>
                        {batch.endedAt ? formatDatetime(batch.endedAt) : "-"}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};
