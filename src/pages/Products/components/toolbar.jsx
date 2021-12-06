import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { filter, map } from "lodash";
import {
    Button,
    Input
} from "reactstrap";
import Toolbar from "../../../component/Common/toolbar";
import { useQuery } from "../../../helpers/utils";

export default function ProductToolbar() {
    const history = useHistory();
    const query = useQuery();
    const productClass = query.get("class");
    const type = query.get("type");
    const style = query.get("style");

    const categories = useSelector(state => {
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
                    history.push("/products/new");
                }}
            >
                    New Product
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                outline={true}
                onClick={() => {
                    history.push("/products/categories");
                }}
            >
                    Categories
            </Button>
            <Input
                type="select"
                bsSize="sm"
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 100 }}
                value={style || ""}
                onChange={e => {
                    query.delete("style");
                    if (e.target.value) {
                        query.append("style", e.target.value);
                    }
                    history.push({search: query.toString()});
                }}
            >
                <option value="">Style</option>
                {
                    type &&
                    map(filter(categories, c => c.parentCategoryId === parseInt(type)), (value, index) => (
                        <option value={value.id} key={index}>
                            {value.name}
                        </option>
                    ))
                }
            </Input>
            <Input
                type="select"
                bsSize="sm"
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 100 }}
                value={type || ""}
                onChange={e => {
                    query.delete("type");
                    query.delete("style");
                    if (e.target.value) {
                        query.append("type", e.target.value);
                    }
                    history.push({search: query.toString()});
                }}
            >
                <option value="">Type</option>
                {
                    productClass &&
                    map(filter(categories, c => c.parentCategoryId === parseInt(productClass)), (value, index) => (
                        <option value={value.id} key={index}>
                            {value.name}
                        </option>
                    ))
                }
            </Input>
            <Input
                type="select"
                bsSize="sm"
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 100 }}
                value={productClass || ""}
                onChange={e => {
                    query.delete("class");
                    query.delete("type");
                    query.delete("style");
                    if (e.target.value) {
                        query.append("class", e.target.value);
                    }
                    history.push({search: query.toString()});
                }}
            >
                <option value="">Class</option>
                {
                    map(filter(categories, c => c.parentCategoryId === null), (value, index) => (
                        <option value={value.id} key={index}>
                            {value.name}
                        </option>
                    ))
                }
            </Input>
        </Toolbar>
    );
}