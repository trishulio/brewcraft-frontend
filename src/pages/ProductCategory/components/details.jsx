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
    fetchAllProductCategories,
    setProductCategoryDetails,
    setProductCategoryInvalidName
} from "../../../store/actions";
import {
    Card,
    CardBody,
    CardHeader
} from "../../../component/Common/Card";
import CategoriesModal from "../../../component/ProductCategories/modal";

const ADD_NEW = "ADD_NEW";
const PRODUCT_CATEGORY_CLASS = "class";
const PRODUCT_CATEGORY_TYPE = "type";

export default function ProductCategoryDetails({ editable }) {
    const [showProductCategoryModal, setShowProductCategoryModal] = useState(false);
    const [modalCategoryType, setModalCategoryType] = useState(null);
    const [modalParentCategoryId, setModalParentCategoryId] = useState(null);

    const [parentClass, setParentClass] = useState("");
    const [parentType, setParentType] = useState("");

    const dispatch = useDispatch();

    const category = useSelector(state => {
        return state.ProductCategory.data;
    });

    const categories = useSelector(state => {
        return state.ProductCategories.data;
    });

    const { loading, invalidName, invalidClass, invalidType } = useSelector(state => {
        return state.ProductCategory
    });

    useEffect(() => {
        let parentClass = "", parentType = "";
        if (category.parentCategoryId && categories.length) {
            const parent = categories.find(c => c.id === category.parentCategoryId);
            if (parent.parentCategoryId) {
                parentType = parent;
                parentClass = categories.find(c => c.id === parent.parentCategoryId);
            } else {
                parentType = "";
                parentClass = parent;
            }
        }
        setParentType(parentType);
        setParentClass(parentClass);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    useEffect(() => {
        dispatch(setProductCategoryDetails({
            parentCategoryId: parentClass ? parentClass.id : null
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parentClass]);

    useEffect(() => {
        dispatch(setProductCategoryDetails({
            parentCategoryId: parentType ? parentType.id : null
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parentType]);

    function onFormInputChange(e) {
        switch(e.target.name) {
            case "productCategoryName":
                if (category.name !== e.target.value) {
                    dispatch(setProductCategoryInvalidName(!e.target.value));
                    dispatch(setProductCategoryDetails({
                        name: e.target.value
                    }));
                }
                break;
            case "productCategoryClass":
                if (e.target.value) {
                    setParentClass(categories.find(c => c.id === parseInt(e.target.value)));
                } else {
                    setParentClass("");
                }
                break;
            case "productCategoryType":
                if (e.target.value) {
                    setParentType(categories.find(c => c.id === parseInt(e.target.value)));
                } else {
                    setParentType("");
                }
                break;
            default:
                dispatch(setProductCategoryDetails({
                    [e.target.name]: e.target.value
                }));
                break;
        }
    }

    return (
        <React.Fragment>
            <Card>
                <CardHeader>Category Details</CardHeader>
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
                                    value={category.name}
                                    placeholder="Enter"
                                    name="productCategoryName"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidName}
                                    style={{ width: "16rem" }}
                                />
                                <FormFeedback>Enter a valid category name.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {category.name ? category.name : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="productCategoryClass"
                                className="mb-3"
                            >
                                Parent Class
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
                                    name="productCategoryClass"
                                    style={{ width: "8rem" }}
                                    disabled={!editable}
                                    invalid={invalidClass}
                                    value={parentClass ? parentClass.id : ""}
                                    onChange={e => {
                                        if (e.target.value !== ADD_NEW) {
                                            onFormInputChange(e);
                                        } else {
                                            // open add class modal
                                            dispatch(
                                                fetchAllProductCategories({
                                                    success: () => {
                                                        setModalCategoryType(PRODUCT_CATEGORY_CLASS);
                                                        setModalParentCategoryId(null);
                                                        setShowProductCategoryModal(true);
                                                    }
                                                })
                                            );
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
                                <FormFeedback>Enter a valid category class.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {parentClass ? parentClass.name : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="productCategoryType"
                                className="mb-3"
                            >
                                Parent Type
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
                                    name="productCategoryType"
                                    disabled={!editable}
                                    invalid={invalidType}
                                    value={parentType ? parentType.id : ""}
                                    onChange={e => {
                                        if (e.target.value !== ADD_NEW) {
                                            onFormInputChange(e);
                                        } else {
                                            dispatch(
                                                fetchAllProductCategories({
                                                    success: () => {
                                                        setModalCategoryType(PRODUCT_CATEGORY_TYPE);
                                                        setModalParentCategoryId(parentClass.id);
                                                        setShowProductCategoryModal(true);
                                                    }
                                                })
                                            );
                                        }
                                    }}
                                >
                                    <option value="">Select</option>
                                    {
                                        parentClass &&
                                        map(filter(categories, c => c.parentCategoryId === parentClass.id), (value, index) => (
                                            <option value={value.id} key={index}>
                                                {value.name}
                                            </option>
                                        ))
                                    } {
                                        category.productClass &&
                                        <option value={ADD_NEW}>+ Add new</option>
                                    }
                                </Input>
                                <FormFeedback>Enter a valid category type.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {parentType ? parentType.name : "-"}
                            </div>
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
