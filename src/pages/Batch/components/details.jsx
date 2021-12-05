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
    CardBody,
    Row,
    Col
} from "reactstrap";
import {
    setBatchDetails,
    setBatchInvalidName,
    setBatchInvalidStartedAt,
    setBatchInvalidEndedAt,
    setBatchInvalidDescription,
    setBatchInvalidBatchId,
    setBatchInvalidParentBrew,
    setBatchInvalidProduct,
    setTransferMixtureRecords
} from "../../../store/actions";
import fantasticLager from "../../../assets/images/products/fantastic-lager.jpg";

export default function BatchMetadata(props) {

    const dispatch = useDispatch();

    const batch = useSelector(state => {
        return state.Batch.Batch.data;
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
            <Card style={{ maxWidth: "70rem" }} className="mb-3">
                <CardHeader>
                    <div className="float-left">
                        <h4 className="card-title font-size-14 pt-1">{`Batch ${batch.batchId} (${batch.product.name})`}</h4>
                    </div>
                </CardHeader>
                <CardBody>
                    <Row className="px-2">
                        <Col sm="6">
                            <Label
                                for="batchBatchId"
                                className="d-sm-inline-block font-size-12 mb-3"
                                style={{
                                    width: "8rem"
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
                                    value={batch.batchId}
                                    placeholder="Enter"
                                    name="batchBatchId"
                                    disabled={!props.editable}
                                    onChange={onFormInputChange}
                                    style={{ width: "16rem" }}
                                    hidden={!props.editable}
                                />
                                <FormFeedback>Enter a valid batch id.</FormFeedback>
                            </FormGroup>
                            <div className="d-sm-inline-block font-size-12 mb-2">
                                <div hidden={props.editable}>
                                    {batch.batchId ? batch.batchId : "-"}
                                </div>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <Label
                                for="batchProduct"
                                className="d-sm-inline-block font-size-12 mb-3"
                                style={{
                                    width: "8rem"
                                }}
                            >
                                Product
                            </Label>
                            <div className="d-inline-block align-middle mr-0 mb-2">
                                <div hidden={props.editable} className="mr-2">
                                    <img style={{ height: "2.5rem", margin: "0 auto" }} src={fantasticLager} alt="product" className="border d-block" />
                                </div>
                            </div>
                            <FormGroup
                                className="d-inline-block font-size-12 mb-3"
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
                            <div className="d-sm-inline-block font-size-12 mb-2">
                                <div hidden={props.editable}>
                                    {batch.product ? batch.product.name : "-"}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    )
};
