import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "reactstrap";

export default function Toolbar({
    editable,
    setEditable,
    changed,
    onSave,
    onDelete,
}) {
    const history = useHistory();

    const batch = useSelector((state) => {
        return state.Batch.Batch.data;
    });

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
                color="primary"
                size="sm"
                className="waves-effect mr-2 mb-2"
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
                className="waves-effect mr-2  mb-2"
                onClick={() => {
                    history.goBack();
                }}
                hidden={!editable || !batch.id}
            >
                Cancel
            </Button>
            <Button
                type="button"
                color="danger"
                size="sm"
                className="waves-effect mr-2  mb-2"
                onClick={onDelete}
                hidden={!batch.id || !editable}
            >
                Delete Brew
            </Button>
            {/* <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-2"
                hidden={editable || fermentStage.id}
                disabled={!completed}
                onClick={() => {
                    dispatch(saveFermentStage({
                        form: [{
                            brewId: batch.id,
                            statusId: 1,
                            taskId: 8 // ferment
                        }]
                    }));
                }}
            >
                    Start Batch
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2  mb-2"
                hidden={editable || fermentStage.id}
                disabled={true} // not supported yet
            >
                    Add to Batch
            </Button> */}
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2  mb-2"
                hidden={editable}
                disabled={true} // not supported yet
            >
                Print Batch
            </Button>
        </React.Fragment>
    );
}
