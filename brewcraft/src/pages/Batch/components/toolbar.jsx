import React from "react";
import { useHistory } from "react-router";
import {
    Button
} from "reactstrap";

export default function Toolbar({ batch, editable, changed, onCancel, onSave, onEdit, onDelete }) {

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
                hidden={!batch.id || editable}
                onClick={() => {
                    history.push({
                        pathname: "/batches/" + batch.id,
                        search: "?edit=true"
                    });
                }}
            >
                Edit Batch
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                hidden={!batch.id || editable}
                onClick={() => {
                    history.push("/batch/new");
                }}
            >
                New Batch
            </Button>
            <Button
                type="button"
                color="danger"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={onDelete}
                hidden={!batch.id || !editable}
            >
                Delete Batch
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                disabled={editable}
                hidden={!batch.id || editable}
                outline={true}
                onClick={() => {
                    history.push("/batches");
                }}
            >
                Batches
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                hidden={!batch.id || editable}
                outline={true}
                onClick={() => {
                    history.push("/products");
                }}
            >
                Products
            </Button>
        </React.Fragment>
    );
}