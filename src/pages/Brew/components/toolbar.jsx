import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
    Button
} from "reactstrap";
import { saveFermentStage } from "../../../store/BrewStages/actions";

export default function Toolbar({ editable, setEditable, changed, onSave, onDelete }) {
    const [completed, setCompleted] = useState(false);

    const history = useHistory();
    const dispatch = useDispatch();

    const batch = useSelector(state => {
        return state.Batch.Batch.data;
    });

    const fermentStage = useSelector(state => {
        return state.Batch.FermentStage.data;
    })

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