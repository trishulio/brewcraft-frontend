import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import Toolbar from "../../../component/Common/toolbar";

export default function ProductToolbar() {
    const history = useHistory();

    const categories = useSelector((state) => {
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
        </Toolbar>
    );
}
