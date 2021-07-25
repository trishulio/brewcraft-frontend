import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { filter, map } from "lodash";
import {
    Button,
    Input
} from "reactstrap";
import {
    setMaterialCategoriesSelectedCategory
} from "../../../store/actions";
import Toolbar from "../../../component/Common/toolbar";

export default function ProductCategoriesToolbar() {

    const dispatch = useDispatch();
    const history = useHistory();

    const { selectedCategory } = useSelector(state => {
        return state.MaterialCategories;
    });

    const categories = useSelector(state => {
        return state.MaterialCategories.all;
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
                        pathname: "/materials/categories/new",
                        search: "?edit=true"
                    });
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
                    history.push("/materials/ingredients");
                }}
            >
                    Ingredients
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                outline={true}
                onClick={() => {
                    history.push("/materials/packaging");
                }}
            >
                    Packaging
            </Button>
            <Input
                type="select"
                size="sm"
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 100 }}
                value={selectedCategory.id}
                onChange={e => {
                    const category = categories.find(c => c.id === parseInt(e.target.value));
                    dispatch(setMaterialCategoriesSelectedCategory(category));
                }}
            >
                <option value="" disabled>Material Category</option>
                {
                    map(filter(categories, c => c.parentCategoryId === null), (value, index) => (
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