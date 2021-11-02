import React from "react";
import { Button } from "reactstrap";

export default function MixtureToolbar({ editable, setEditable, changed, onSave }) {
    return (
        <React.Fragment>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-2"
                onClick={() => {
                    setEditable(true);
                }}
                hidden={editable}
            >
                Edit
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2  mb-2"
                onClick={() => {
                    setEditable(false);
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
        </React.Fragment>
    );
}