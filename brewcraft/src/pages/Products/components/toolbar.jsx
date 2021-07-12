import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { filter, map } from "lodash";
import {
    Button,
    Input
} from "reactstrap";
import {
    setProductsSelectedClass,
    setProductsSelectedType,
    setProductsSelectedStyle
} from "../../../store/actions";
import Toolbar from "../../../component/Common/toolbar";

export default function ProductToolbar() {

    const dispatch = useDispatch();
    const history = useHistory();

    const allCategories = useSelector(state => {
        return state.ProductCategories.data;
    });

    const { selectedClass, selectedType, selectedStyle } = useSelector(state => {
        return state.Products;
    });

    return (
        <Toolbar>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={() => {
                    history.push({
                        pathname: "/products/new",
                        search: "?edit=true"
                    });
                }}
            >
                    New Product
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={() => {
                    history.push("/products/categories");
                }}
            >
                    Product Categories
            </Button>
            <Input
                type="select"
                size="sm"
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 100 }}
                value={selectedStyle ? selectedStyle.id : ""}
                onChange={e => {
                    if (e.target.value) {
                        const category = allCategories.find(c => c.id === parseInt(e.target.value));
                        dispatch(setProductsSelectedStyle(category));
                    } else {
                        dispatch(setProductsSelectedStyle(""));
                    }
                }}
                disabled={!selectedType}
            >
                <option value="">Style</option>
                {
                    selectedType &&
                    map(filter(allCategories, c => c.parentCategoryId === selectedType.id), (value, index) => (
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
                value={selectedType ? selectedType.id : ""}
                onChange={e => {
                    if (e.target.value) {
                        const category = allCategories.find(c => c.id === parseInt(e.target.value));
                        dispatch(setProductsSelectedType(category));
                    } else {
                        dispatch(setProductsSelectedType(""));
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
                        dispatch(setProductsSelectedClass(category));
                    } else {
                        dispatch(setProductsSelectedClass(""));
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
                id="exampleSearch"
                placeholder="Name"
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 170 }}
            />
        </Toolbar>
    );
}