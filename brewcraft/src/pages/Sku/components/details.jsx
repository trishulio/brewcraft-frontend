import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter, map } from "lodash";
import {
    Row,
    Col,
    FormGroup,
    FormFeedback,
    Input,
    Label
} from "reactstrap";
import {
    fetchAllSkus,
    setSkuDetails,
    setSkuInvalidName
} from "../../../store/actions";
import {
    Card,
    CardBody,
    CardHeader
} from "../../../component/Common/Card";

export default function SkuDetails({ editable }) {

    const dispatch = useDispatch();

    const sku = useSelector(state => {
        return state.Sku.data;
    });

    function onFormInputChange(e) {
        switch(e.target.name) {
            case "skuName":
                if (sku.name !== e.target.value) {
                    dispatch(setSkuInvalidName(!e.target.value));
                    dispatch(setSkuDetails({
                        name: e.target.value
                    }));
                }
                break;
            default:
                dispatch(setSkuDetails({
                    [e.target.name]: e.target.value
                }));
                break;
        }
    }

    return (
        <React.Fragment>
            <Card>
                <CardHeader>SKU Details</CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="name"
                                className="mb-3"
                            >
                                Name
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup
                                hidden={!editable}
                            >
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    bsSize="sm"
                                    value={sku.name}
                                    placeholder="Enter"
                                    name="skuName"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                />
                                <FormFeedback>Enter a valid sku name.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {sku.name ? sku.name : "-"}
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}
