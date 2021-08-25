import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter, map } from "lodash";
import {
    Row,
    Col,
    Card,
    CardBody,
    FormGroup,
    FormFeedback,
    Input,
    Label
} from "reactstrap";
import {
    setProductDetails,
    setProductInvalidName,
    setInvalidClass
} from "../../../store/actions";
import CategoriesModal from "../../../component/ProductCategories/modal";

const ADD_NEW = "ADD_NEW";
const PRODUCT_CATEGORY_CLASS = "class";
const PRODUCT_CATEGORY_STYLE = "style";
const PRODUCT_CATEGORY_TYPE = "type";

export default function ProductDetails({ product, editable }) {
    const [showProductCategoryModal, setShowProductCategoryModal] = useState(false);
    const [modalCategoryType, setModalCategoryType] = useState(null);
    const [modalParentCategoryId, setModalParentCategoryId] = useState(null);

    const { invalidName, invalidClass, invalidType } = useSelector(state => {
        return state.Product
    });

    const categories = useSelector(state => {
        return state.ProductCategories.data;
    });

    const dispatch = useDispatch();

    function onFormInputChange(e) {
        switch(e.target.name) {
            case "productName":
                if (product.name !== e.target.value) {
                    dispatch(setProductInvalidName(!e.target.value));
                    dispatch(setProductDetails({
                        name: e.target.value
                    }));
                }
                break;
            case "productClass":
                if (product.productClass?.id !== e.target.value) {
                    dispatch(setInvalidClass(!e.target.value));
                    dispatch(setProductDetails({
                        productClass: categories.find(c => c.id === parseInt(e.target.value)),
                        type: null,
                        style: null
                    }));
                }
                break;
            case "productType":
                if (product.productType?.id !== e.target.value) {
                    dispatch(setProductDetails({
                        type: categories.find(c => c.id === parseInt(e.target.value)),
                        style: null
                    }));
                }
                break;
            case "productStyle":
                if (product.productStyle?.id !== e.target.value) {
                    dispatch(setProductDetails({
                        style: categories.find(c => c.id === parseInt(e.target.value))
                    }));
                }
                break;
            case "productDescription":
                if (product.productStyle?.id !== e.target.value) {
                    dispatch(setProductDetails({
                        description: e.target.value
                    }));
                }
                break;
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <h4 className="card-title mb-4">Product Details</h4>
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
                                    value={product.name}
                                    placeholder="Enter"
                                    name="productName"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidName}
                                />
                                <FormFeedback>Enter a valid product name.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {product.name ? product.name : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="productClass"
                                className="mb-3"
                            >
                                Class
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup
                                hidden={!editable}
                            >
                                <Input
                                    type="select"
                                    className="waves-effect"
                                    bsSize="sm"
                                    name="productClass"
                                    style={{ width: "8rem" }}
                                    disabled={!editable}
                                    invalid={invalidClass}
                                    value={product.productClass ? product.productClass.id : ""}
                                    onChange={e => {
                                        if (e.target.value !== ADD_NEW) {
                                            onFormInputChange(e);
                                        } else {
                                            setModalCategoryType(PRODUCT_CATEGORY_CLASS);
                                            setModalParentCategoryId(null);
                                            setShowProductCategoryModal(true);
                                        }
                                    }}
                                >
                                    <option value="">Select</option>
                                    {
                                        map(filter(categories, c => c.parentCategoryId === null), (value, index) => (
                                            <option value={value.id} key={index}>
                                                {value.name}
                                            </option>
                                        ))
                                    }
                                    <option value={ADD_NEW}>+ Add new</option>
                                </Input>
                                <FormFeedback>Enter a valid product class.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {product.productClass ? product.productClass.name : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="type"
                                className="mb-3"
                            >
                                Type
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup
                                hidden={!editable}
                            >
                                <Input
                                    type="select"
                                    className="waves-effect"
                                    bsSize="sm"
                                    style={{ width: "8rem" }}
                                    name="productType"
                                    disabled={!editable}
                                    invalid={invalidType}
                                    value={product.type ? product.type.id : ""}
                                    onChange={e => {
                                        if (e.target.value !== ADD_NEW) {
                                            onFormInputChange(e);
                                        } else {
                                            setModalCategoryType(PRODUCT_CATEGORY_TYPE);
                                            setModalParentCategoryId(product.productClass.id);
                                            setShowProductCategoryModal(true);
                                        }
                                    }}
                                >
                                    <option value="">Select</option>
                                    {
                                        product.productClass &&
                                        map(filter(categories, c => c.parentCategoryId === product.productClass.id), (value, index) => (
                                            <option value={value.id} key={index}>
                                                {value.name}
                                            </option>
                                        ))
                                    } {
                                        product.productClass &&
                                        <option value={ADD_NEW}>+ Add new</option>
                                    }
                                </Input>
                                <FormFeedback>Enter a valid product style.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {product.type ? product.type.name : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="style"
                                className="mb-3"
                            >
                                Style
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup
                                hidden={!editable}
                            >
                                <Input
                                    type="select"
                                    className="waves-effect"
                                    bsSize="sm"
                                    style={{ width: "8rem" }}
                                    name="productStyle"
                                    disabled={!editable}
                                    value={product.style ? product.style.id : ""}
                                    onChange={e => {
                                        if (e.target.value !== ADD_NEW) {
                                            onFormInputChange(e);
                                        } else {
                                            setModalCategoryType(PRODUCT_CATEGORY_STYLE);
                                            setModalParentCategoryId(product.type.id);
                                            setShowProductCategoryModal(true);
                                        }
                                    }}
                                >
                                    <option value="">Select</option>
                                    {
                                        product.type &&
                                        map(filter(categories, c => c.parentCategoryId === product.type.id), (value, index) => (
                                            <option value={value.id} key={index}>
                                                {value.name}
                                            </option>
                                        ))
                                    } {
                                        product.type &&
                                        <option value={ADD_NEW}>+ Add new</option>
                                    }
                                </Input>
                                <FormFeedback>Enter a valid product style.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {product.style ? product.style.name : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="description"
                            >
                                Description
                            </Label>
                        </Col>
                        <Col xs="10">
                            <Input
                                type="textarea"
                                className="waves-effect mb-2"
                                value={product.description}
                                rows={4}
                                name="productDescription"
                                disabled={!editable}
                                onChange={e => {
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
