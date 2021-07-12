import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
    Button
} from "reactstrap";

export default function Toolbar({ editable, changed, onSave, onDelete }) {
    const history = useHistory();

    const finishedGood = useSelector(state => {
        return state.FinishedGood.data;
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
                disabled={true}
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
                hidden={!finishedGood.id || editable}
                onClick={() => {
                    history.push({
                        pathname: "/finished-goods/" + finishedGood.id,
                        search: "?edit=true"
                    });
                }}
            >
                Edit Finished Good
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={onDelete}
                hidden={!finishedGood.id || !editable}
                disabled={true}
            >
                Delete Finished Good
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                disabled={editable}
                hidden={!finishedGood.id || editable}
            >
                Batches
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                hidden={!finishedGood.id || editable}
                onClick={() => {
                    history.push("/finished-goods");
                }}
            >
                Finished Goods
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                hidden={!finishedGood.id || editable}
                onClick={() => {
                    history.push({
                        pathname: "/finished-goods/new",
                        search: "?edit=true"
                    });
                }}
            >
                New Finished Good
            </Button>
        </React.Fragment>
    );
}