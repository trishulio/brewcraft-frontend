import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    Button,
    Input
} from "reactstrap";
import Toolbar from "../../../component/Common/toolbar";
import { useQuery } from "../../../helpers/utils";

export default function ProductCategoriesToolbar() {
    const history = useHistory();
    const query = useQuery();
    const parentCategoryId = query.get("category");

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
            <Input
                type="select"
                bsSize="sm"
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 100 }}
                value={parentCategoryId || ""}
                onChange={e => {
                    query.delete("category");
                    if (e.target.value && e.target.value !== "") {
                        query.append("category", e.target.value);
                    }
                    history.push({search: query.toString()});
                }}
            >
                <option value="">Parent Category</option>
                {
                    categories.map((value, index) => {
                        if (!value.parentCategoryId) {
                            return <option value={value.id} key={index}>{value.name}</option>
                        }
                    })
                }
            </Input>
        </Toolbar>
    );
}