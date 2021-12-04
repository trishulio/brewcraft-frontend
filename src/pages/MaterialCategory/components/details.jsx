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
    setMaterialCategoryDetails,
    setInvalidMaterialCategoryName,
    setInvalidMaterialCategoryParentCategory
} from "../../../store/actions";
import {
    Card,
    CardBody,
    CardHeader
} from "../../../component/Common/Card";
import { useKeyPress } from "../../../helpers/utils";

const ENTER_KEY = "Enter";

export default function MaterialCategoryDetails({ editable, onSave }) {

    const [inputFocused, setInputFocused] = useState(false);

    const { invalidName, invalidParentCategory } = useSelector(state => {
        return state.MaterialCategory
    });

    const categories = useSelector(state => {
        return state.MaterialCategories.all
            .filter(c => c.parentCategoryId === null);
    });

    const materialCategory = useSelector(state => {
        return state.MaterialCategory.data;
    });

    const dispatch = useDispatch();

    const enterKeyPressed = useKeyPress(ENTER_KEY);

    function onKeyUp() {
        if (enterKeyPressed) {
            onSave();
            return;
        }
    }

    function onFormInputChange(e) {
        switch(e.target.name) {
            case "materialCategoryName":
                if (materialCategory.name !== e.target.value) {
                    dispatch(setInvalidMaterialCategoryName(!e.target.value));
                    dispatch(setMaterialCategoryDetails({
                        data: {
                            ...materialCategory,
                            name: e.target.value
                        }
                    }));
                }
                break;
            case "materialCategoryParentCategory":
                dispatch(setInvalidMaterialCategoryParentCategory(!e.target.value));
                dispatch(setMaterialCategoryDetails({
                    data: {
                        ...materialCategory,
                        parentCategory: categories.find(c => c.id === parseInt(e.target.value))
                    }
                }));
                break;
            default:
                break;
        }
    }

    function toggleFocus() {
        setInputFocused(!inputFocused)
    }

    return (
        <React.Fragment>
            <Card>
                <CardHeader>Material Category Details</CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="materialCategoryName"
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
                                    value={materialCategory.name}
                                    placeholder="Enter"
                                    name="materialCategoryName"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidName}
                                    onFocus={toggleFocus}
                                    onBlur={toggleFocus}
                                    onKeyUp={onKeyUp}
                                />
                                <FormFeedback>Enter a valid material category name.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {materialCategory.name ? materialCategory.name : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="materialCategoryParentCategory"
                                className="mb-3"
                            >
                                *Parent Category
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
                                    name="materialCategoryParentCategory"
                                    style={{ width: "8rem" }}
                                    disabled={!editable}
                                    invalid={invalidParentCategory}
                                    value={materialCategory.parentCategory?.id || ""}
                                    onFocus={toggleFocus}
                                    onBlur={toggleFocus}
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
                                </Input>
                                <FormFeedback>Enter a valid material category.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {materialCategory.parentCategory ? materialCategory.parentCategory.name : "-"}
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}
