import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import { Row, Col, FormGroup, FormFeedback, Input, Label } from "reactstrap";
import {
    setIngredientDetails,
    setIngredientInvalidName,
    setIngredientInvalidBaseQuantityUnit,
    setIngredientInvalidCategory,
    setIngredientInvalidUpc,
} from "../../../store/actions";
import { Card, CardBody, CardHeader } from "../../../component/Common/Card";
import MaterialCategoriesModal from "../../../component/MaterialCategories/modal";
import { isValidName, useKeyPress, validId } from "../../../helpers/utils";

const ADD_NEW = "ADD_NEW";
const INGREDIENT_CATEGORY = "ingredient";
const ENTER_KEY = "Enter";

export default function IngredientDetails({ editable, onSave, changed }) {
    const [showPackageCategoryModal, setShowPackageCategoryModal] =
        useState(false);
    const [modalPackageType, setModalPackageType] = useState(null);
    const [modalParentCategoryId, setModalParentCategoryId] = useState(null);

    const {
        invalidName,
        invalidCategory,
        invalidBaseQuantityUnit,
        invalidUpc,
    } = useSelector((state) => {
        return state.Ingredient;
    });
    const enterKeyPressed = useKeyPress(ENTER_KEY);

    const categories = useSelector((state) => {
        return state.MaterialCategories.all.filter(
            (c) => c.parentCategoryId === 1
        );
    });

    const ingredient = useSelector((state) => {
        return state.Ingredient.data;
    });

    const dispatch = useDispatch();

    function onFormInputChange(e) {
        switch (e.target.name) {
            case "ingredientName":
                if (ingredient.name !== e.target.value) {
                    dispatch(
                        setIngredientInvalidName(!isValidName(e.target.value))
                    );
                    dispatch(
                        setIngredientDetails({
                            data: {
                                ...ingredient,
                                name: e.target.value,
                            },
                        })
                    );
                }
                break;
            case "ingredientCategory":
                dispatch(
                    setIngredientInvalidCategory(!validId(e.target.value))
                );
                dispatch(
                    setIngredientDetails({
                        data: {
                            ...ingredient,
                            category: categories.find(
                                (c) => c.id === parseInt(e.target.value)
                            ),
                        },
                    })
                );
                break;
            case "ingredientBaseQuantityUnit":
                dispatch(setIngredientInvalidBaseQuantityUnit(!e.target.value));
                dispatch(
                    setIngredientDetails({
                        data: {
                            ...ingredient,
                            baseQuantityUnit: e.target.value,
                        },
                    })
                );
                break;
            case "ingredientUpc":
                dispatch(setIngredientInvalidUpc(e.target.value));
                dispatch(
                    setIngredientDetails({
                        data: {
                            ...ingredient,
                            upc: e.target.value,
                        },
                    })
                );
                break;
            case "ingredientDescription":
                dispatch(
                    setIngredientDetails({
                        data: {
                            ...ingredient,
                            description: e.target.value,
                        },
                    })
                );
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
                <CardHeader>Ingredient Details</CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="2">
                            <Label for="ingredientName" className="mb-3">
                                *Name
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup hidden={!editable}>
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    bsSize="sm"
                                    value={ingredient.name}
                                    placeholder="Enter"
                                    name="ingredientName"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidName}
                                    onKeyUp={onKeyUp}
                                    style={{ width: "16rem" }}
                                    data-testid="ingredient-name"
                                />
                                <FormFeedback>
                                    Enter a valid ingredient name.
                                </FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {ingredient.name ? ingredient.name : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label for="ingredientCategory" className="mb-3">
                                *Category
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup hidden={!editable}>
                                <Input
                                    type="select"
                                    className="waves-effect"
                                    bsSize="sm"
                                    name="ingredientCategory"
                                    style={{ width: "8rem" }}
                                    disabled={!editable}
                                    invalid={invalidCategory}
                                    value={ingredient.category?.id || ""}
                                    onKeyUp={onKeyUp}
                                    onChange={(e) => {
                                        if (e.target.value !== ADD_NEW) {
                                            onFormInputChange(e);
                                        } else {
                                            setModalPackageType(
                                                INGREDIENT_CATEGORY
                                            );
                                            setModalParentCategoryId(1);
                                            setShowPackageCategoryModal(true);
                                        }
                                    }}
                                    data-testid="ingredient-category"
                                >
                                    <option value="">Select</option>
                                    {map(categories, (value, index) => (
                                        <option value={value.id} key={index}>
                                            {value.name}
                                        </option>
                                    ))}
                                    <option
                                        key={categories.length}
                                        value={ADD_NEW}
                                    >
                                        + Add new
                                    </option>
                                </Input>
                                <FormFeedback>
                                    Enter a valid ingredient category.
                                </FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {ingredient.category
                                    ? ingredient.category.name
                                    : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="ingredientBaseQuantityUnit"
                                className="mb-3"
                            >
                                *Measure
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup hidden={!editable}>
                                <Input
                                    type="select"
                                    className="waves-effect"
                                    bsSize="sm"
                                    name="ingredientBaseQuantityUnit"
                                    style={{ width: "8rem" }}
                                    disabled={!editable}
                                    invalid={invalidBaseQuantityUnit}
                                    value={ingredient.baseQuantityUnit || ""}
                                    onKeyUp={onKeyUp}
                                    onChange={(e) => {
                                        onFormInputChange(e);
                                    }}
                                    data-testid="ingredient-measure"
                                >
                                    <option value="">Select</option>
                                    <option value="each">each</option>
                                    <option value="kg">kg</option>
                                    <option value="g">g</option>
                                    <option value="hl">hl</option>
                                    <option value="l">l</option>
                                    <option value="ml">ml</option>
                                    {/* <option value={ADD_NEW}>+ Add new</option> */}
                                </Input>
                                <FormFeedback>
                                    Enter a valid unit of measure.
                                </FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {ingredient.baseQuantityUnit
                                    ? ingredient.baseQuantityUnit
                                    : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label for="ingredientUpc" className="mb-3">
                                UPC
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup hidden={!editable}>
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    bsSize="sm"
                                    onKeyUp={onKeyUp}
                                    value={ingredient.upc}
                                    placeholder="Enter"
                                    name="ingredientUpc"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidUpc}
                                    style={{ width: "16rem" }}
                                    data-testid="ingredient-upc"
                                />
                                <FormFeedback>Enter a valid upc.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {ingredient.upc ? ingredient.upc : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label for="ingredientDescription">
                                Description
                            </Label>
                        </Col>
                        <Col xs="10">
                            <Input
                                type="textarea"
                                className="waves-effect mb-2"
                                value={ingredient.description}
                                rows={4}
                                name="ingredientDescription"
                                disabled={!editable}
                                onChange={onFormInputChange}
                                autoComplete="false"
                                data-testid="ingredient-description"
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
