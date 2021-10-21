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
                disabled={true}
                className="waves-effect mr-2"
                hidden={editable}
            >
                    Brew
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2"
                hidden={editable}
            >
                    Tanks
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2"
                hidden={editable}
            >
                    Finished Goods
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2"
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
                className="waves-effect mr-2"
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
                className="waves-effect mr-2"
                hidden={!batch.id || !editable}
            >
                Split Batch
            </Button>
            <Button
                type="button"
                color="danger"
                size="sm"
                className="waves-effect mr-2"
                onClick={onDelete}
                hidden={!batch.id || !editable}
            >
                Delete Batch
            </Button>
        </React.Fragment>
    );
}