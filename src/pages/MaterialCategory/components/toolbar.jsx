import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "reactstrap";

export default function Toolbar({ editable, changed, onSave, onDelete }) {
    const history = useHistory();

    const materialCategory = useSelector((state) => {
        return state.MaterialCategory.data;
    });

    return (
        <React.Fragment>
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
                onClick={() => {
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
                disabled={editable || !materialCategory.parentCategory}
                hidden={!materialCategory.id || editable}
                onClick={() => {
                    history.push({
                        pathname:
                            "/materials/categories/" + materialCategory.id,
                        search: "?edit=true",
                    });
                }}
            >
                Edit Category
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                hidden={!materialCategory.id || editable}
                onClick={() => {
                    history.push({
                        pathname: "/materials/categories/new",
                        search: "?edit=true",
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
                hidden={!materialCategory.id || !editable}
            >
                Delete Category
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                hidden={!materialCategory.id || editable}
                outline={true}
                onClick={() => {
                    history.push("/materials/categories");
                }}
            >
                Material Categories
            </Button>
        </React.Fragment>
    );
}
