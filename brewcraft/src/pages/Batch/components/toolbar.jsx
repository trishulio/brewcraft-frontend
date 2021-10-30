import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
    Button
} from "reactstrap";

export default function Toolbar({ editable, changed, onCancel, onSave, onEdit, onDelete }) {
    const history = useHistory();

    const batch = useSelector(state => {
        return state.Batch.details.data;
    });

    return (
        <React.Fragment>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-2"
                onClick={() => {
                    history.push({
                        pathname: "/batches/" + batch.id,
                        search: "?edit=true"
                    });
                }}
                hidden={editable}
            >
                Edit Details
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2  mb-2"
                hidden={editable}
            >
                    Start Ferment
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2  mb-2"
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
                className="waves-effect mr-2 mb-2"
                onClick={onSave}
                disabled={!changed}
                hidden={!editable}
            >
                    Save
            </Button>
            <div className="clearFix"></div>
            <Button
                type="button"
                color="danger"
                size="sm"
                className="waves-effect mr-2  mb-2"
                disabled={changed}
                onClick={onDelete}
                hidden={!batch.id || !editable}
            >
                Delete Batch
            </Button>
        </React.Fragment>
    );
}