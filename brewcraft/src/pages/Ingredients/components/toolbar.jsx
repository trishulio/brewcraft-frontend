import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    Button,
    Input
} from "reactstrap";
import Toolbar from "../../../component/Common/toolbar";
import { setIngredientsSelectedCategory } from "../../../store/actions";

export default function IngredientsToolbar() {
    const dispatch = useDispatch();
    const history = useHistory();

    const categories = useSelector(state => {
        return state.MaterialCategories.all
            .filter(c => c.parentCategoryId === 1);
    });

    const parentCategory = useSelector(state => {
        return state.MaterialCategories.all
            .find(c => c.id === 1);
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
                        pathname: "/materials/ingredients/new",
                        search: "?edit=true"
                    });
                }}
            >
                    New Ingredient
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                outline={true}
                onClick={() => {
                    history.push("/materials/categories");
                }}
            >
                    Material Categories
            </Button>
            <Input
                type="select"
                size="sm"
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 100 }}
                onChange={e => {
                    if (e.target.value) {
                        const category = categories.find(c => c.id === parseInt(e.target.value));
                        dispatch(setIngredientsSelectedCategory(category));
                    } else {
                        dispatch(setIngredientsSelectedCategory(parentCategory));
                    }
                }}
            >
                <option value="">Category</option>
                {
                    categories.map((value, index) => (
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