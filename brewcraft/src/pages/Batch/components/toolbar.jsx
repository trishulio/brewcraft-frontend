import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
    Button
} from "reactstrap";

export default function Toolbar({ editable, changed, onCancel, onSave, onEdit, onDelete }) {
    const history = useHistory();
    const batch = useSelector(state => {
        return state.Batch.data;
    });

    return (
        <React.Fragment>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-1"
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
                className="waves-effect mr-2 mb-1"
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
                className="waves-effect mr-2 mb-1"
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
                color="danger"
                size="sm"
                className="waves-effect mr-2 mb-1"
                onClick={onDelete}
                hidden={!batch.id || !editable}
            >
                Delete Batch
            </Button>
        </React.Fragment>
    );
}