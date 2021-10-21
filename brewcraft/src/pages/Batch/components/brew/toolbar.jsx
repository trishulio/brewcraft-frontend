import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
    Button
} from "reactstrap";

export default function BrewToolbar({ editable, changed, onCancel, onSave, onEdit, onDelete }) {
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
                className="waves-effect"
                disabled={editable}
                hidden={!batch.id || editable}
                onClick={() => {
                    history.push({
                        pathname: "/batches/" + batch.id,
                        search: "?edit=true"
                    });
                }}
            >
                Edit
            </Button>
        </React.Fragment>
    );
}