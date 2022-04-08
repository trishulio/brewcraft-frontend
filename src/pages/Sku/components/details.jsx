import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import { FormGroup, FormFeedback, Input, Label, Row, Col } from "reactstrap";
import {
    setSkuDetails,
    setSkuInvalidBaseQuantityUnit,
    setSkuInvalidNumber,
    setSkuInvalidName,
    setSkuInvalidProduct,
    setSkuInvalidVolume,
} from "../../../store/actions";
import { Card, CardBody, CardHeader } from "../../../component/Common/Card";

export default function SkuDetails(props) {
    const dispatch = useDispatch();

    const sku = useSelector((state) => {
        return state.Sku.data;
    });

    const {
        invalidNumber,
        invalidName,
        invalidProduct,
        invalidVolume,
        invalidDescription,
        invalidBaseQuantityUnit,
    } = useSelector((state) => {
        return state.Sku;
    });

    const products = useSelector((state) => {
        return state.Products.all;
    });

    function onFormInputChange(e) {
        switch (e.target.name) {
            case "skuNumber":
                if (sku.number !== e.target.value) {
                    dispatch(setSkuInvalidNumber(e.target.value));
                    dispatch(
                        setSkuDetails({
                            data: {
                                ...sku,
                                number: e.target.value,
                            },
                        })
                    );
                }
                break;
            case "skuName":
                if (sku.name !== e.target.value) {
                    dispatch(setSkuInvalidName(!e.target.value));
                    dispatch(
                        setSkuDetails({
                            data: {
                                ...sku,
                                name: e.target.value,
                            },
                        })
                    );
                }
                break;
            case "skuDescription":
                if (sku.description !== e.target.value) {
                    dispatch(
                        setSkuDetails({
                            data: {
                                ...sku,
                                description: e.target.value,
                            },
                        })
                    );
                }
                break;
            case "skuProduct":
                if (sku.product?.id !== e.target.value) {
                    dispatch(setSkuInvalidProduct(!e.target.value));
                    const product = products.find(
                        (p) => p.id === parseInt(e.target.value)
                    );
                    if (e.target.value) {
                        dispatch(
                            setSkuDetails({
                                data: {
                                    ...sku,
                                    product,
                                },
                            })
                        );
                    }
                }
                break;
            case "skuQuantity":
                if (sku.quantity?.value !== e.target.value) {
                    dispatch(setSkuInvalidVolume(!e.target.value));
                    dispatch(
                        setSkuDetails({
                            data: {
                                ...sku,
                                quantity: {
                                    ...sku.quantity,
                                    value: e.target.value,
                                },
                            },
                        })
                    );
                }
                break;
            case "skuBaseQuantityUnit":
                if (sku.quantity?.symbol !== e.target.value) {
                    dispatch(setSkuInvalidBaseQuantityUnit(!e.target.value));
                    dispatch(
                        setSkuDetails({
                            data: {
                                ...sku,
                                quantity: {
                                    ...sku.quantity,
                                    symbol: e.target.value,
                                },
                            },
                        })
                    );
                }
                break;
            case "skuIsPackageable":
                if (sku.isPackageable !== e.target.checked) {
                    dispatch(
                        setSkuDetails({
                            data: {
                                ...sku,
                                isPackageable: e.target.checked,
                            },
                        })
                    );
                }
                break;
            default:
                dispatch(
                    setSkuDetails({
                        [e.target.name]: e.target.value,
                    })
                );
                break;
        }
    }

    return (
        <React.Fragment>
            <Card>
                <CardHeader>SKU Details</CardHeader>
                <CardBody>
                    <Row>
                        <Col xs={2}>
                            <Label
                                for="skuNumber"
                                className="d-inline-block font-size-12 mb-3"
                                style={{
                                    width: "8rem",
                                }}
                            >
                                SKU #
                            </Label>
                        </Col>
                        <Col xs={8}>
                            <FormGroup
                                className="d-inline-block font-size-12 mb-2"
                                hidden={!props.editable}
                            >
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    name="skuNumber"
                                    style={{ width: "16rem" }}
                                    disabled={!props.editable}
                                    value={sku.number || ""}
                                    onChange={(e) => {
                                        onFormInputChange(e);
                                    }}
                                    hidden={!props.editable}
                                    invalid={invalidNumber}
                                />
                                <FormFeedback>
                                    Enter a valid sku number.
                                </FormFeedback>
                            </FormGroup>
                            <div className="d-inline-block font-size-12 mb-2">
                                <div hidden={props.editable}>
                                    {sku.number ? sku.number : "-"}
                                </div>
                            </div>
                            <div className="clearFix"></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <Label
                                for="skuName"
                                className="d-inline-block font-size-12 mb-3"
                                style={{
                                    width: "8rem",
                                }}
                            >
                                Name
                            </Label>
                        </Col>
                        <Col xs={8}>
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
                                    onChange={(e) => {
                                        onFormInputChange(e);
                                    }}
                                    hidden={!props.editable}
                                    invalid={invalidName}
                                />
                                <FormFeedback>
                                    Enter a valid sku name.
                                </FormFeedback>
                            </FormGroup>
                            <div className="d-inline-block font-size-12 mb-2">
                                <div hidden={props.editable}>
                                    {sku.name ? sku.name : "-"}
                                </div>
                            </div>
                            <div className="clearFix"></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <Label
                                for="skuProduct"
                                className="d-inline-block font-size-12 mb-3"
                                style={{
                                    width: "8rem",
                                }}
                            >
                                Product
                            </Label>
                        </Col>
                        <Col xs={8}>
                            <FormGroup
                                className="d-inline-block font-size-12 mb-2"
                                hidden={!props.editable}
                            >
                                <Input
                                    type="select"
                                    className="waves-effect"
                                    name="skuProduct"
                                    style={{ width: "8rem" }}
                                    disabled={!props.editable}
                                    value={sku.product.id || ""}
                                    onChange={(e) => {
                                        onFormInputChange(e);
                                    }}
                                    hidden={!props.editable}
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
                                    Enter a valid product.
                                </FormFeedback>
                            </FormGroup>
                            <div className="d-inline-block font-size-12 mb-2">
                                <div hidden={props.editable}>
                                    {sku.product ? sku.product.name : "-"}
                                </div>
                            </div>
                            <div className="clearFix"></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <Label
                                for="skuQuantity"
                                className="d-inline-block font-size-12 mb-3"
                                style={{
                                    width: "8rem",
                                }}
                            >
                                Volume
                            </Label>
                        </Col>
                        <Col xs={8}>
                            <Row className="m-0" xs={8}>
                                <FormGroup
                                    className="d-inline-block font-size-12 pr-1"
                                    hidden={!props.editable}
                                >
                                    <Input
                                        type="text"
                                        className="waves-effect"
                                        name="skuQuantity"
                                        style={{ width: "8rem" }}
                                        disabled={!props.editable}
                                        value={sku.quantity?.value || ""}
                                        onChange={(e) => {
                                            onFormInputChange(e);
                                        }}
                                        hidden={!props.editable}
                                        invalid={invalidVolume}
                                    />
                                    <FormFeedback>
                                        Enter a valid sku quantity.
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup
                                    className="d-inline-block font-size-12 m-0"
                                    hidden={!props.editable}
                                >
                                    <Input
                                        type="select"
                                        className="waves-effect"
                                        name="skuBaseQuantityUnit"
                                        style={{ width: "8rem" }}
                                        disabled={!props.editable}
                                        invalid={invalidBaseQuantityUnit}
                                        value={sku.quantity?.symbol || ""}
                                        hidden={!props.editable}
                                        onChange={(e) => {
                                            onFormInputChange(e);
                                        }}
                                    >
                                        <option value="">Select</option>
                                        <option value="hl">hl</option>
                                        <option value="l">l</option>
                                        <option value="ml">ml</option>
                                    </Input>
                                    <FormFeedback>
                                        Enter a valid unit of measure.
                                    </FormFeedback>
                                </FormGroup>
                                <div className="d-inline-block font-size-12 mb-2">
                                    <div hidden={props.editable}>
                                        {sku.quantity
                                            ? sku.quantity.value +
                                              " " +
                                              sku.quantity.symbol
                                            : "-"}
                                    </div>
                                </div>
                                <div className="clearFix"></div>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <Label
                                for="skuIsPackageable"
                                className="d-inline-block font-size-12 mb-3"
                                style={{
                                    width: "8rem",
                                }}
                            >
                                Is Packageable <br />
                                From Brew
                            </Label>
                        </Col>
                        <Col xs={8}>
                            <FormGroup
                                className="d-inline-block font-size-12 mb-2"
                                hidden={!props.editable}
                            >
                                <Input
                                    type="checkbox"
                                    className="waves-effect"
                                    name="skuIsPackageable"
                                    style={{
                                        width: "3.7rem",
                                        height: "20px",
                                        border: "1px solid #808080",
                                    }}
                                    disabled={!props.editable}
                                    checked={sku.isPackageable}
                                    onChange={(e) => {
                                        onFormInputChange(e);
                                    }}
                                    hidden={!props.editable}
                                />
                            </FormGroup>
                            <div className="d-inline-block font-size-12 mb-2">
                                <div hidden={props.editable}>
                                    {sku.isPackageable ? "true" : "false"}
                                </div>
                            </div>
                            <div className="clearFix"></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <Label
                                for="skuDescription"
                                className="d-inline-block font-size-12 mb-3"
                                style={{
                                    width: "8rem",
                                }}
                            >
                                Description
                            </Label>
                        </Col>
                        <Col xs={10}>
                            <FormGroup
                                className="font-size-12 mb-2"
                                hidden={!props.editable}
                            >
                                <Input
                                    type="textarea"
                                    className="waves-effect mb-2"
                                    name="skuDescription"
                                    disabled={!props.editable}
                                    value={sku.description || ""}
                                    onChange={(e) => {
                                        onFormInputChange(e);
                                    }}
                                    hidden={!props.editable}
                                    invalid={invalidDescription}
                                    rows={4}
                                />
                                <FormFeedback>
                                    Enter a valid sku description.
                                </FormFeedback>
                            </FormGroup>
                            <div className="d-inline-block font-size-12 mb-2">
                                <div hidden={props.editable}>
                                    {sku.description ? sku.description : "-"}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}
