import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
    Button
} from "reactstrap";

export default function Toolbar({ editable, setEditable, changed, onSave, onDelete }) {
    const [completed, setCompleted] = useState(false);
    const history = useHistory();

    const batch = useSelector(state => {
        return state.Batch.details.data;
    });

    const kettleMixture = useSelector(state => {
        return state.Batch.KettleMixture.data;
    })

    const whirlpoolMixture = useSelector(state => {
        return state.Batch.WhirlpoolMixture.data;
    })

    useEffect(() => {
        if (whirlpoolMixture.brewStage.status?.id === 2) {
            setCompleted(!!kettleMixture.quantity.value);
        } else {
            setCompleted(!!whirlpoolMixture.quantity.value);
        }
    }, [kettleMixture, whirlpoolMixture]);

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
                    history.push({
                        search: ""
                    });
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
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-2"
                hidden={editable}
                disabled={!completed}
            >
                    Start Batch
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2  mb-2"
                hidden={editable}
                disabled={!completed}
            >
                    Add to Batch
            </Button>
        </React.Fragment>
    );
}