import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { filter, map } from "lodash";
import {
    Button,
    Input
} from "reactstrap";
import {
    setProductCategoriesSelectedClass,
    setProductCategoriesSelectedType,
} from "../../../store/actions";
import Toolbar from "../../../component/Common/toolbar";

export default function ProductCategoriesToolbar() {

    const dispatch = useDispatch();
    const history = useHistory();

    const { selectedClass, selectedType } = useSelector(state => {
        return state.ProductCategories;
    });

    const allCategories = useSelector(state => {
        return state.ProductCategories.data;
    });

    return (
        <Toolbar>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={() => {
                    history.push("/products/categories/new");
                }}
            >
                    New Category
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                outline={true}
                onClick={() => {
                    history.push("/products");
                }}
            >
                    Products
            </Button>
            <Input
                type="select"
                size="sm"
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 100 }}
                value={selectedType ? selectedType.id : ""}
                onChange={e => {
                    if (e.target.value) {
                        const category = allCategories.find(c => c.id === parseInt(e.target.value));
                        dispatch(setProductCategoriesSelectedType(category));
                    } else {
                        dispatch(setProductCategoriesSelectedType(""));
                    }
                }}
                disabled={!selectedClass}
            >
                <option value="">Type</option>
                {
                    selectedClass &&
                    map(filter(allCategories, c => c.parentCategoryId === selectedClass.id), (value, index) => (
                        <option value={value.id} key={index}>
                            {value.name}
                        </option>
                    ))
                }
            </Input>
            <Input
                type="select"
                size="sm"
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 100 }}
                value={selectedClass ? selectedClass.id : ""}
                onChange={e => {
                    if (e.target.value) {
                        const category = allCategories.find(c => c.id === parseInt(e.target.value));
                        dispatch(setProductCategoriesSelectedClass(category));
                    } else {
                        dispatch(setProductCategoriesSelectedClass(""));
                    }
                }}
            >
                <option value="">Class</option>
                {
                    map(filter(allCategories, c => c.parentCategoryId === null), (value, index) => (
                        <option value={value.id} key={index}>
                            {value.name}
                        </option>
                    ))
                }
            </Input>
            <Input
                size="sm"
                type="search"
                name="search"
                id="productCategoriesSearch"
                placeholder="Name"
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 170 }}
            />
        </Toolbar>
    );
}