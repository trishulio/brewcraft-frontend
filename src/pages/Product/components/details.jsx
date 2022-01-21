import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter, map } from "lodash";
import { Row, Col, FormGroup, FormFeedback, Input, Label } from "reactstrap";
import {
    setProductDetails,
    setProductInvalidName,
    setProductInvalidClass,
    setProductInvalidAbv,
} from "../../../store/actions";
import { Card, CardBody, CardHeader } from "../../../component/Common/Card";
import CategoriesModal from "../../../component/ProductCategories/modal";
import { validAmount } from "../../../helpers/utils";

const ADD_NEW = "ADD_NEW";
const PRODUCT_CATEGORY_CLASS = "class";
const PRODUCT_CATEGORY_STYLE = "style";
const PRODUCT_CATEGORY_TYPE = "type";

export default function ProductDetails({ product, editable }) {
    const [showProductCategoryModal, setShowProductCategoryModal] =
        useState(false);
    const [modalCategoryType, setModalCategoryType] = useState(null);
    const [modalParentCategoryId, setModalParentCategoryId] = useState(null);

    const { invalidName, invalidClass, invalidType, invalidAbv } = useSelector(
        (state) => {
            return state.Product;
        }
    );

    const categories = useSelector((state) => {
        return state.ProductCategories.data;
    });

    const abv = useSelector((state) => {
        return state.Measures.data.find((measure) => measure.name === "abv");
    });

    const dispatch = useDispatch();

    function onFormInputChange(e) {
        switch (e.target.name) {
            case "productName":
                if (product.name !== e.target.value) {
                    dispatch(setProductInvalidName(!e.target.value));
                    dispatch(
                        setProductDetails({
                            name: e.target.value,
                        })
                    );
                }
                break;
            case "productClass":
                if (product.productClass?.id !== e.target.value) {
                    dispatch(setProductInvalidClass(!e.target.value));
                    dispatch(
                        setProductDetails({
                            productClass: categories.find(
                                (c) => c.id === parseInt(e.target.value)
                            ),
                            type: null,
                            style: null,
                        })
                    );
                }
                break;
            case "productType":
                if (product.productType?.id !== e.target.value) {
                    dispatch(
                        setProductDetails({
                            type: categories.find(
                                (c) => c.id === parseInt(e.target.value)
                            ),
                            style: null,
                        })
                    );
                }
                break;
            case "productStyle":
                if (product.productStyle?.id !== e.target.value) {
                    dispatch(
                        setProductDetails({
                            style: categories.find(
                                (c) => c.id === parseInt(e.target.value)
                            ),
                        })
                    );
                }
                break;
            case "productTargetMeasuresAbv":
                let abvIndex = product.targetMeasures?.findIndex(
                    (measure) => measure.measure.id === abv.id
                );
                let updatedTargetMeasures = product.targetMeasures
                    ? JSON.parse(JSON.stringify(product.targetMeasures))
                    : [];
                if (abvIndex < 0) {
                    let productAbv = {
                        id: null,
                        measure: abv,
                        value: null,
                    };
                    updatedTargetMeasures.push(productAbv);
                }
                if (
                    product.targetMeasures[abvIndex]?.value !== e.target.value
                ) {
                    updatedTargetMeasures.find(
                        (measure) => measure.measure.id === abv.id
                    ).value = e.target.value;
                    dispatch(
                        setProductInvalidAbv(
                            !validAmount(parseFloat(e.target.value))
                        )
                    );
                    dispatch(
                        setProductDetails({
                            targetMeasures: updatedTargetMeasures,
                        })
                    );
                }
                break;
            case "productDescription":
                if (product.productStyle?.id !== e.target.value) {
                    dispatch(
                        setProductDetails({
                            description: e.target.value,
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
            <Card>
                <CardHeader>Product Details</CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="2">
                            <Label for="name" className="mb-3">
                                Name
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup hidden={!editable}>
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    bsSize="sm"
                                    value={product.name}
                                    style={{ width: "16rem" }}
                                    placeholder="Enter"
                                    name="productName"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidName}
                                    data-testid="product-name"
                                />
                                <FormFeedback>
                                    Enter a valid product name.
                                </FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {product.name ? product.name : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label for="productClass" className="mb-3">
                                Class
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup hidden={!editable}>
                                <Input
                                    type="select"
                                    className="waves-effect"
                                    bsSize="sm"
                                    name="productClass"
                                    style={{ width: "8rem" }}
                                    disabled={!editable}
                                    invalid={invalidClass}
                                    data-testid="product-class"
                                    value={
                                        product.productClass
                                            ? product.productClass.id
                                            : ""
                                    }
                                    onChange={(e) => {
                                        if (e.target.value !== ADD_NEW) {
                                            onFormInputChange(e);
                                        } else {
                                            setModalCategoryType(
                                                PRODUCT_CATEGORY_CLASS
                                            );
                                            setModalParentCategoryId(null);
                                            setShowProductCategoryModal(true);
                                        }
                                    }}
                                >
                                    <option value="">Select</option>
                                    {map(
                                        filter(
                                            categories,
                                            (c) => c.parentCategoryId === null
                                        ),
                                        (value, index) => (
                                            <option
                                                value={value.id}
                                                key={index}
                                            >
                                                {value.name}
                                            </option>
                                        )
                                    )}
                                    <option value={ADD_NEW}>+ Add new</option>
                                </Input>
                                <FormFeedback>
                                    Enter a valid product class.
                                </FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {product.productClass
                                    ? product.productClass.name
                                    : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label for="type" className="mb-3">
                                Type
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup hidden={!editable}>
                                <Input
                                    type="select"
                                    className="waves-effect"
                                    bsSize="sm"
                                    style={{ width: "8rem" }}
                                    name="productType"
                                    disabled={!editable}
                                    invalid={invalidType}
                                    data-testid="product-type"
                                    value={product.type ? product.type.id : ""}
                                    onChange={(e) => {
                                        if (e.target.value !== ADD_NEW) {
                                            onFormInputChange(e);
                                        } else {
                                            setModalCategoryType(
                                                PRODUCT_CATEGORY_TYPE
                                            );
                                            setModalParentCategoryId(
                                                product.productClass.id
                                            );
                                            setShowProductCategoryModal(true);
                                        }
                                    }}
                                >
                                    <option value="">Select</option>
                                    {product.productClass &&
                                        map(
                                            filter(
                                                categories,
                                                (c) =>
                                                    c.parentCategoryId ===
                                                    product.productClass.id
                                            ),
                                            (value, index) => (
                                                <option
                                                    value={value.id}
                                                    key={index}
                                                >
                                                    {value.name}
                                                </option>
                                            )
                                        )}{" "}
                                    {product.productClass && (
                                        <option value={ADD_NEW}>
                                            + Add new
                                        </option>
                                    )}
                                </Input>
                                <FormFeedback>
                                    Enter a valid product style.
                                </FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {product.type ? product.type.name : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label for="style" className="mb-3">
                                Style
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup hidden={!editable}>
                                <Input
                                    type="select"
                                    className="waves-effect"
                                    bsSize="sm"
                                    style={{ width: "8rem" }}
                                    name="productStyle"
                                    disabled={!editable}
                                    value={
                                        product.style ? product.style.id : ""
                                    }
                                    data-testid="product-style"
                                    onChange={(e) => {
                                        if (e.target.value !== ADD_NEW) {
                                            onFormInputChange(e);
                                        } else {
                                            setModalCategoryType(
                                                PRODUCT_CATEGORY_STYLE
                                            );
                                            setModalParentCategoryId(
                                                product.type.id
                                            );
                                            setShowProductCategoryModal(true);
                                        }
                                    }}
                                >
                                    <option value="">Select</option>
                                    {product.type &&
                                        map(
                                            filter(
                                                categories,
                                                (c) =>
                                                    c.parentCategoryId ===
                                                    product.type.id
                                            ),
                                            (value, index) => (
                                                <option
                                                    value={value.id}
                                                    key={index}
                                                >
                                                    {value.name}
                                                </option>
                                            )
                                        )}{" "}
                                    {product.type && (
                                        <option value={ADD_NEW}>
                                            + Add new
                                        </option>
                                    )}
                                </Input>
                                <FormFeedback>
                                    Enter a valid product style.
                                </FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {product.style ? product.style.name : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label for="abv" className="mb-3">
                                ABV (%)
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup hidden={!editable}>
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    bsSize="sm"
                                    value={
                                        product.targetMeasures?.find(
                                            (elem) =>
                                                elem.measure?.id === abv?.id
                                        )?.value
                                    }
                                    style={{ width: "8rem" }}
                                    placeholder="Enter"
                                    name="productTargetMeasuresAbv"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidAbv}
                                />
                                <FormFeedback>
                                    Enter a valid ABV (%).
                                </FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {product.targetMeasures?.find(
                                    (elem) => elem.measure?.id === abv?.id
                                )?.value
                                    ? product.targetMeasures?.find(
                                          (elem) => elem.measure.id === abv?.id
                                      )?.value
                                    : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label for="description">Description</Label>
                        </Col>
                        <Col xs="10">
                            <Input
                                type="textarea"
                                className="waves-effect mb-2"
                                value={product.description}
                                rows={4}
                                name="productDescription"
                                data-testid="product-description"
                                disabled={!editable}
                                onChange={(e) => {
                                    onFormInputChange(e);
                                }}
                                autoComplete="false"
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <CategoriesModal
                show={showProductCategoryModal}
                parentCategoryId={modalParentCategoryId}
                setShow={setShowProductCategoryModal}
                type={modalCategoryType}
            />
        </React.Fragment>
    );
}
