import { filter, map } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    setIngredientDetails,
    setInvalidName,
    setIngredientInvalidBaseQuantityUnit,
    setIngredientInvalidCategory
} from "../../../store/actions";

const ADD_NEW = "ADD_NEW";

export default function IngredientDetails({ editable }) {

    const { invalidName, invalidCategory, invalidBaseQuantityUnit, invalidUpc } = useSelector(state => {
        return state.Ingredient
    });

    const categories = useSelector(state => {
        return state.MaterialCategories.all
            .filter(c => c.parentCategoryId === 1);
    });

    const ingredient = useSelector(state => {
        return state.Ingredient.data;
    });

    const dispatch = useDispatch();

    function onFormInputChange(e) {
        switch(e.target.name) {
            case "ingredientName":
                if (ingredient.name !== e.target.value) {
                    dispatch(setInvalidName(!e.target.value));
                    dispatch(setIngredientDetails({
                        data: {
                            ...ingredient,
                            name: e.target.value
                        }
                    }));
                }
                break;
            case "ingredientCategory":
                dispatch(setIngredientInvalidCategory(!e.target.value));
                dispatch(setIngredientDetails({
                    data: {
                        ...ingredient,
                        category: categories.find(c => c.id === parseInt(e.target.value))
                    }
                }));
                break;
            case "ingredientBaseQuantityUnit":
                dispatch(setIngredientInvalidBaseQuantityUnit(!e.target.value));
                dispatch(setIngredientDetails({
                    data: {
                        ...ingredient,
                        baseQuantityUnit: e.target.value
                    }
                }));
                break;
            case "ingredientUpc":
                // dispatch(setInvalidUpc(!e.target.value))
                dispatch(setIngredientDetails({
                    data: {
                        ...ingredient,
                        upc: e.target.value
                    }
                }));
                break;
            case "ingredientDescription":
                dispatch(setIngredientDetails({
                    data: {
                        ...ingredient,
                        description: e.target.value
                    }
                }));
                break;
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <h4 className="card-title mb-4">Ingredient Details</h4>
                    <Row>
                        <Col xs="2">
                            <Label className="mb-3">
                                ID
                            </Label>
                        </Col>
                        <Col xs="8">
                            <div hidden={false}>
                                {ingredient.id ? ingredient.id : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="ingredientName"
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
                                    size="sm"
                                    value={ingredient.name}
                                    placeholder="Enter"
                                    name="ingredientName"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidName}
                                />
                                <FormFeedback>Enter a valid ingredient name.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {ingredient.name ? ingredient.name : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="ingredientCategory"
                                className="mb-3"
                            >
                                Category
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup
                                hidden={!editable}
                            >
                                <Input
                                    type="select"
                                    className="waves-effect"
                                    size="sm"
                                    name="ingredientCategory"
                                    style={{ width: "8rem" }}
                                    disabled={!editable}
                                    invalid={invalidCategory}
                                    value={ingredient.category?.id || ""}
                                    onChange={e => {
                                        onFormInputChange(e);
                                    }}
                                >
                                    <option value="">Select</option>
                                    {
                                        map(categories, (value, index) => (
                                            <option value={value.id} key={index}>
                                                {value.name}
                                            </option>
                                        ))
                                    }
                                    <option value={ADD_NEW}>+ Add new</option>
                                </Input>
                                <FormFeedback>Enter a valid ingredient category.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {ingredient.category ? ingredient.category.name : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="ingredientBaseQuantityUnit"
                                className="mb-3"
                            >
                                Measure
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup
                                hidden={!editable}
                            >
                                <Input
                                    type="select"
                                    className="waves-effect"
                                    size="sm"
                                    name="ingredientBaseQuantityUnit"
                                    style={{ width: "8rem" }}
                                    disabled={!editable}
                                    invalid={invalidBaseQuantityUnit}
                                    value={ingredient.baseQuantityUnit || ""}
                                    onChange={e => {
                                        onFormInputChange(e);
                                    }}
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
                                {ingredient.baseQuantityUnit ? ingredient.baseQuantityUnit : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="ingredientUpc"
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
                                    size="sm"
                                    value={ingredient.upc}
                                    placeholder="Enter"
                                    name="ingredientUpc"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidUpc}
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
                            <Label
                                for="ingredientDescription"
                            >
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
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}
