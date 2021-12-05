import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import {
    FormGroup,
    FormFeedback,
    Input,
    Label
} from "reactstrap";
import {
    setSkuDetails
} from "../../../store/actions";
import {
    Card,
    CardBody,
    CardHeader
} from "../../../component/Common/Card";

export default function SkuDetails(props) {

    const dispatch = useDispatch();

    const sku = useSelector(state => {
        return state.Sku.data;
    });

    const products = useSelector(state => {
        return state.Products.all;
    });

    function onFormInputChange(e) {
        switch(e.target.name) {
            case "skuName":
                if (sku.name !== e.target.value) {
                    dispatch(setSkuDetails({
                        data: {
                            ...sku,
                            name: e.target.value
                        }
                    }));
                }
                break;
            case "skuDescription":
                if (sku.description !== e.target.value) {
                    dispatch(setSkuDetails({
                        data: {
                            ...sku,
                            description: e.target.value
                        }
                    }));
                }
                break;
            case "skuProduct":
                if (sku.product?.id !== e.target.value) {
                    const product = products.find(p => p.id === parseInt(e.target.value));
                    if (product) {
                        dispatch(setSkuDetails({
                            data: {
                                ...sku, product
                            }
                        }));
                    }
                }
                break;
            case "skuQuantity":
                if (sku.quantity?.value !== e.target.value) {
                    dispatch(setSkuDetails({
                        data: {
                            ...sku,
                            quantity: {
                                value: e.target.value
                            }
                        }
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
                    <Label
                        for="skuName"
                        className="d-inline-block font-size-12 mb-3"
                        style={{
                            width: "8rem"
                        }}
                    >
                        SKU
                    </Label>
                    <FormGroup
                        className="d-inline-block font-size-12 mb-2"
                        hidden={!props.editable}
                    >
                        <Input
                            type="text"
                            className="waves-effect"
                            name="skuName"
                            style={{ width: "16rem" }}
                            disabled={!props.editable}
                            value={sku.name || ""}
                            onChange={e => {
                                onFormInputChange(e);
                            }}
                            hidden={!props.editable}
                        />
                        <FormFeedback>Enter a valid sku name.</FormFeedback>
                    </FormGroup>
                    <div className="d-inline-block font-size-12 mb-2">
                        <div hidden={props.editable}>
                            {sku.name ? sku.name : "-"}
                        </div>
                    </div>
                    <div className="clearFix"></div>
                    <Label
                        for="skuProduct"
                        className="d-inline-block font-size-12 mb-3"
                        style={{
                            width: "8rem"
                        }}
                    >
                        Product
                    </Label>
                    <FormGroup
                        className="d-inline-block font-size-12 mb-2"
                        hidden={!props.editable}
                    >
                        <Input
                            type="select"
                            className="waves-effect"
                            name="skuProduct"
                            style={{ width: "16rem" }}
                            disabled={!props.editable}
                            value={sku.product?.id || ""}
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
                        <FormFeedback>Enter a valid product.</FormFeedback>
                    </FormGroup>
                    <div className="d-inline-block font-size-12 mb-2">
                        <div hidden={props.editable}>
                            {sku.product ? sku.product.name : "-"}
                        </div>
                    </div>
                    <div className="clearFix"></div>
                    <Label
                        for="skuQuantity"
                        className="d-inline-block font-size-12 mb-3"
                        style={{
                            width: "8rem"
                        }}
                    >
                        Volume
                    </Label>
                    <FormGroup
                        className="d-inline-block font-size-12 mb-2"
                        hidden={!props.editable}
                    >
                        <Input
                            type="text"
                            className="waves-effect"
                            name="skuQuantity"
                            style={{ width: "16rem" }}
                            disabled={!props.editable}
                            value={sku.quantity?.value || ""}
                            onChange={e => {
                                onFormInputChange(e);
                            }}
                            hidden={!props.editable}
                        />
                        <FormFeedback>Enter a valid sku quantity.</FormFeedback>
                    </FormGroup>
                    <div className="d-inline-block font-size-12 mb-2">
                        <div hidden={props.editable}>
                            {sku.quantity ? sku.quantity.value + " " + sku.quantity.symbol : "-"}
                        </div>
                    </div>
                    <div className="clearFix"></div>
                    <Label
                        for="skuDescription"
                        className="d-inline-block font-size-12 mb-3"
                        style={{
                            width: "8rem"
                        }}
                    >
                        Description
                    </Label>
                    <FormGroup
                        className="d-inline-block font-size-12 mb-2"
                        hidden={!props.editable}
                    >
                        <Input
                            type="text"
                            className="waves-effect"
                            name="skuDescription"
                            style={{ width: "16rem" }}
                            disabled={!props.editable}
                            value={sku.description || ""}
                            onChange={e => {
                                onFormInputChange(e);
                            }}
                            hidden={!props.editable}
                        />
                        <FormFeedback>Enter a valid sku description.</FormFeedback>
                    </FormGroup>
                    <div className="d-inline-block font-size-12 mb-2">
                        <div hidden={props.editable}>
                            {sku.description ? sku.description : "-"}
                        </div>
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}
