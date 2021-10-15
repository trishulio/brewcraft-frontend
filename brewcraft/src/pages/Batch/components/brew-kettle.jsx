import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import {
    Row,
    Col,
    Button,
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

export default function BrewDetails(props) {

    const dispatch = useDispatch();

    const batch = useSelector(state => {
        return state.Batch.details.data;
    });

    const { invalidBrewKettleStatus } = useSelector(state => {
        return state.Batch.details;
    });

    const ingredientLots = useSelector(state => {
        return [];
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
            <h4 className="font-size-14">Start / Finish</h4>
            <hr/>
            <Row>
                <Col xs="1">
                    <Label
                        for="batchBrewStartDateTime"
                        className="mb-3"
                    >
                        Start
                    </Label>
                </Col>
                <Col xs="4">
                    <FormGroup
                        hidden={!props.editable}
                    >
                        <Input
                            type="datetime-local"
                            name="batchBrewStartDateTime"
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
                <Col xs="1">
                    <Label
                        for="batchBrewFinishDateTime"
                        className="mb-3"
                    >
                        Finish
                    </Label>
                </Col>
                <Col xs="4">
                    <FormGroup
                        hidden={!props.editable}
                    >
                        <Input
                            type="datetime-local"
                            name="batchBrewFinishDateTime"
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
            <h4 className="font-size-14 mt-2">Ingredients</h4>
            <hr/>
            {/* <Row>
                <Col xs="1">Material</Col>
                <Col xs="1">Qty</Col>
            </Row> */}
            <Row>
                <Col xs="4">
                    <FormGroup
                        hidden={!props.editable}
                    >
                        <Input
                            type="select"
                            className="waves-effect"
                            // bsSize="sm"
                            name="batchBrewKettleStatus"
                            style={{ maxWidth: "20rem" }}
                            disabled={!props.editable}
                            invalid={invalidBrewKettleStatus}
                            value={batch.product?.id || ""}
                            onChange={e => {
                                onFormInputChange(e);
                            }}
                        >
                            <option value="">Select</option>
                            {
                                map(ingredientLots, (value, index) => (
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
                <Col xs="2">
                    <Input
                        type="text"
                        style={{maxWidth: "16rem"}}
                        className="waves-effect mb-2"
                        placeholder="Qty"
                    />
                </Col>
            </Row>
            <Button size="sm">Add</Button>
        </React.Fragment>
    );
}