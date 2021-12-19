import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "reactstrap";

export default function Toolbar({ editable, changed, onSave, onDelete }) {
    const history = useHistory();

    const packagingItem = useSelector((state) => {
        return state.PackagingItem.data;
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
                disabled={editable}
                hidden={!packagingItem.id || editable}
                onClick={() => {
                    history.push({
                        pathname: "/materials/packaging/" + packagingItem.id,
                        search: "?edit=true",
                    });
                }}
            >
                Edit Item
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                hidden={!packagingItem.id || editable}
                onClick={() => {
                    history.push("/materials/packaging/new");
                }}
            >
                New Item
            </Button>
            <Button
                type="button"
                color="danger"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={onDelete}
                hidden={!packagingItem.id || !editable}
            >
                Delete Item
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                hidden={!packagingItem.id || editable}
                outline={true}
                onClick={() => {
                    history.push("/materials/packaging");
                }}
            >
                Packaging Items
            </Button>
        </React.Fragment>
    );
}
