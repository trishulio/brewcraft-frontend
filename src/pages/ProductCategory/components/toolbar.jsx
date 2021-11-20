import React from "react";
import { useHistory } from "react-router";
import {
    Button
} from "reactstrap";
import Toolbar from "../../../component/Common/toolbar";

export default function ProductCategoryToolbar({ category, editable, changed, onSave, onEdit, onDelete }) {
    const history = useHistory();

    return (
        <React.Fragment>
            <Toolbar>
                <Button
                    type="button"
                    color="secondary"
                    size="sm"
                    className="waves-effect mr-2 mb-3"
                    onClick={onSave}
                    disabled={!changed}
                    hidden={!editable}
                >
                        Save
                </Button>
                <Button
                    type="button"
                    color="secondary"
                    size="sm"
                    className="waves-effect mr-2 mb-3"
                    onClick={e => {
                        history.goBack();
                    }}
                    hidden={!editable}
                >
                    Cancel
                </Button>
                <Button
                    type="button"
                    color="secondary"
                    size="sm"
                    className="waves-effect mr-2 mb-3"
                    onClick={onEdit}
                    disabled={editable}
                    hidden={!category.id || editable}
                >
                    Edit Category
                </Button>
                <Button
                    type="button"
                    color="secondary"
                    size="sm"
                    className="waves-effect mr-2 mb-3"
                    hidden={!category.id || editable}
                    onClick={() => {
                        history.push({
                            pathname: "/products/categories/new",
                            search: "?edit=true"
                        });
                    }}
                >
                    New Category
                </Button>
                <Button
                    type="button"
                    color="danger"
                    size="sm"
                    className="waves-effect mr-2 mb-3"
                    onClick={onDelete}
                    hidden={!category.id || !editable}
                >
                    Delete Category
                </Button>
                <Button
                    type="button"
                    color="secondary"
                    size="sm"
                    className="waves-effect mr-2 mb-3"
                    hidden={!category.id || editable}
                    outline={true}
                    onClick={() => {
                        history.push("/products/categories");
                    }}
                >
                    Product Categories
                </Button>
            </Toolbar>
        </React.Fragment>
    );
}