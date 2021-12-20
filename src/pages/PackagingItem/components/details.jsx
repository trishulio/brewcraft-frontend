import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import {
    Row,
    Col,
    FormGroup,
    FormFeedback,
    Input,
    Label
} from "reactstrap";
import {
    setPackagingItemDetails,
    setPackagingItemInvalidName,
    setPackagingItemInvalidBaseQuantityUnit,
    setPackagingItemInvalidCategory,
    setInvalidPackagingUpc
} from "../../../store/actions";
import {
    Card,
    CardBody,
    CardHeader
} from "../../../component/Common/Card";
import MaterialCategoriesModal from "../../../component/MaterialCategories/modal";
import { useKeyPress } from "../../../helpers/utils";

const ADD_NEW = "ADD_NEW";
const PACKAGING_CATEGORY = "packaging";
const ENTER_KEY = "Enter"

export default function PackagingItemDetails({ editable, onSave, changed }) {
    const [showPackageCategoryModal, setShowPackageCategoryModal] = useState(false);
    const [modalPackageType, setModalPackageType] = useState(null);
    const [modalParentCategoryId, setModalParentCategoryId] = useState(null);

    const { invalidName, invalidCategory, invalidBaseQuantityUnit, invalidUpc } = useSelector(state => {
        return state.PackagingItem
    });

    const categories = useSelector(state => {
        return state.MaterialCategories.all
            .filter(c => c.parentCategoryId === 2);
    });

    const packagingItem = useSelector(state => {
        return state.PackagingItem.data;
    });

    const dispatch = useDispatch();

    const enterKeyPressed = useKeyPress(ENTER_KEY);

    function onFormInputChange(e) {
        switch(e.target.name) {
            case "packagingItemName":
                if (packagingItem.name !== e.target.value) {
                    dispatch(setPackagingItemInvalidName(!e.target.value));
                    dispatch(setPackagingItemDetails({
                        data: {
                            ...packagingItem,
                            name: e.target.value
                        }
                    }));
                }
                break;
            case "packagingItemCategory":
                dispatch(setPackagingItemInvalidCategory(!e.target.value));
                dispatch(setPackagingItemDetails({
                    data: {
                        ...packagingItem,
                        category: categories.find(c => c.id === parseInt(e.target.value))
                    }
                }));
                break;
            case "packagingItemBaseQuantityUnit":
                dispatch(setPackagingItemInvalidBaseQuantityUnit(!e.target.value));
                dispatch(setPackagingItemDetails({
                    data: {
                        ...packagingItem,
                        baseQuantityUnit: e.target.value
                    }
                }));
                break;
            case "packagingItemUpc":
                dispatch(setInvalidPackagingUpc(e.target.value))
                dispatch(setPackagingItemDetails({
                    data: {
                        ...packagingItem,
                        upc: e.target.value
                    }
                }));
                break;
            case "packagingItemDescription":
                dispatch(setPackagingItemDetails({
                    data: {
                        ...packagingItem,
                        description: e.target.value
                    }
                }));
                break;
            default:
                break;
        }
    }

    function onKeyUp() {
        if (enterKeyPressed && changed) {
            onSave();
            return;
        }
    }

    return (
        <React.Fragment>
            <Card>
                <CardHeader>Item Details</CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="packagingItemName"
                                className="mb-3"
                            >
                                *Name
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
                                    value={packagingItem.name}
                                    placeholder="Enter"
                                    name="packagingItemName"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidName}
                                    onKeyUp={onKeyUp}
                                    style={{ width: "16rem" }}
                                    data-testid="packagingNname"
                                />
                                <FormFeedback>Enter a valid packagingItem name.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {packagingItem.name ? packagingItem.name : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="packagingItemCategory"
                                className="mb-3"
                            >
                                *Category
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
                                    name="packagingItemCategory"
                                    style={{ width: "8rem" }}
                                    disabled={!editable}
                                    invalid={invalidCategory}
                                    value={packagingItem.category.id || ""}
                                    onKeyUp={onKeyUp}
                                    onChange={e => {
                                        if (e.target.value !== ADD_NEW) {
                                            onFormInputChange(e);
                                        }
                                        else {
                                            setModalPackageType(PACKAGING_CATEGORY);
                                            setModalParentCategoryId(2);
                                            setShowPackageCategoryModal(true);
                                        }
                                    }}
                                    data-testid="packagingCategory"
                                >
                                    <option value="">Select</option>
                                    {
                                        map(categories, (value, index) => (
                                            <option value={value.id} key={index}>
                                                {value.name}
                                            </option>
                                        ))
                                    }
                                    <option key={categories.length} value={ADD_NEW}>+ Add new</option>
                                </Input>
                                <FormFeedback>Enter a valid packagingItem category.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {packagingItem.category ? packagingItem.category.name : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="packagingItemBaseQuantityUnit"
                                className="mb-3"
                            >
                                *Measure
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
                                    name="packagingItemBaseQuantityUnit"
                                    style={{ width: "8rem" }}
                                    disabled={!editable}
                                    invalid={invalidBaseQuantityUnit}
                                    value={packagingItem.baseQuantityUnit || ""}
                                    onKeyUp={onKeyUp}
                                    onChange={e => {
                                        onFormInputChange(e);
                                    }}
                                    data-testid="packagingMeasure"
                                >
                                    <option value="">Select</option>
                                    <option value="kg">kg</option>
                                    <option value="g">g</option>
                                    <option value="hl">hl</option>
                                    <option value="l">l</option>
                                    <option value="ml">ml</option>
                                    {/* <option value={ADD_NEW}>+ Add new</option> */}
                                </Input>
                                <FormFeedback>Enter a valid unit of measure.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {packagingItem.baseQuantityUnit ? packagingItem.baseQuantityUnit : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="packagingItemUpc"
                                className="mb-3"
                            >
                                UPC
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
                                    value={packagingItem.upc}
                                    placeholder="Enter"
                                    name="packagingItemUpc"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidUpc}
                                    onKeyUp={onKeyUp}
                                    style={{ width: "16rem" }}
                                    data-testid="packagingUpc"
                                />
                                <FormFeedback>Enter a valid upc.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {packagingItem.upc ? packagingItem.upc : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="packagingItemDescription"
                            >
                                Description
                            </Label>
                        </Col>
                        <Col xs="10">
                            <Input
                                type="textarea"
                                className="waves-effect mb-2"
                                value={packagingItem.description}
                                rows={4}
                                name="packagingItemDescription"
                                disabled={!editable}
                                onChange={onFormInputChange}
                                autoComplete="false"
                                data-testid="packagingDescription"
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <MaterialCategoriesModal
                show={showPackageCategoryModal}
                parentCategoryId={modalParentCategoryId}
                setShow={setShowPackageCategoryModal}
                type={modalPackageType}
            />
        </React.Fragment>
    );
}
