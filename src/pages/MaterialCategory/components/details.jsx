import React from "react";
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

export default function MaterialCategoryDetails({ editable }) {

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

    return (
        <React.Fragment>
            <Card>
                <CardHeader>Material Category Details</CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="2">
                            <Label className="mb-3">
                                ID
                            </Label>
                        </Col>
                        <Col xs="8">
                            <div hidden={false}>
                                {materialCategory.id ? materialCategory.id : "-"}
                            </div>
                        </Col>
                    </Row>
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
