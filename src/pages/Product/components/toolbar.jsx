import React from "react";
import { useHistory } from "react-router";
import { Button } from "reactstrap";

export default function Toolbar({
    product,
    editable,
    changed,
    onSave,
    onDelete,
}) {
    const history = useHistory();

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
                onClick={async () => {
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
                disabled={editable}
                hidden={!product.id || editable}
                onClick={() => {
                    history.push({
                        pathname: "/products/" + product.id,
                        search: "?edit=true",
                    });
                }}
            >
                Edit Product
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                hidden={!product.id || editable}
                onClick={() => {
                    history.push({
                        pathname: "/products/new",
                        search: "?edit=true",
                    });
                }}
            >
                New Product
            </Button>
            <Button
                type="button"
                color="danger"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={onDelete}
                hidden={!product.id || !editable}
            >
                Delete Product
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                hidden={!product.id || editable}
                outline={true}
                onClick={() => {
                    history.push("/products");
                }}
            >
                All Products
            </Button>
        </React.Fragment>
    );
}
