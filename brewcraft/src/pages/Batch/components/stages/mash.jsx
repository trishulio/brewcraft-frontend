import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ingredients from "../mixture/ingredients";
import Details from "../mixture/details";
import {
    editMashMixture,
    editMashStage,
    setMashMixtureDetails,
    setMashStageDetails
} from "../../../../store/actions";
import MixtureToolbar from "../mixture/toolbar";

export default function BrewMash() {
    const [changed, setChanged] = useState(false);
    const [materialPortionsChanged, setMaterialPortionsChanged] = useState(false);
    const dispatch = useDispatch();

    const { data: stage, editable } = useSelector(state => {
        return state.Batch.MashStage;
    });

    const initialStage = useSelector(state => {
        return state.Batch.MashStage.initial;
    });

    const mixture = useSelector(state => {
        return state.Batch.MashMixture.data;
    });

    const initialMixture = useSelector(state => {
        return state.Batch.MashMixture.initial;
    });

    // const { content: materialPortions, initial: initialMaterialPortions } = useSelector(state => {
    //     return state.Batch.MashMaterialPortion;
    // });

    const [materialPortions, setMaterialPortions] = useState([]);
    const initialMaterialPortions = [];

    useEffect(() => {
        setChanged(isChanged());
    }, [stage, mixture, materialPortions, setChanged]);

    useEffect(() => {
        setMaterialPortionsChanged(isMaterialPortionsChanged())
    }, [materialPortions]);

    function isChanged() {
        return JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({ startedAt, endedAt, status, task }))(initialStage))
            !== JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({ startedAt, endedAt, status, task }))(stage))
            || JSON.stringify(
                    (({ quantity }) => ({ quantity }))(initialMixture))
            !== JSON.stringify(
                (({ quantity }) => ({ quantity }))(mixture))
            || isMaterialPortionsChanged()
    }

    function isMaterialPortionsChanged() {
        return JSON.stringify(materialPortions) !== JSON.stringify(initialMaterialPortions);
    }

    function setStage(stage) {
        dispatch(
            setMashStageDetails({
                data: stage
            })
        )
    }

    function setMixture(mixture) {
        dispatch(
            setMashMixtureDetails({
                data: mixture
            })
        )
    }

    function onSave() {
        dispatch(
            editMashStage({
                id: stage.id,
                form: {
                    statusId : stage.status.id,
                    taskId: stage.task.id,
                    startedAt: stage.startedAt,
                    endedAt: stage.endedAt,
                    version: stage.version
                }
            })
        );
        dispatch(
            editMashMixture({
                id: mixture.id,
                form: {
                    parentMixtureId: mixture.parentMixtureId,
                    quantity: {
                        ...mixture.quantity
                    },
                    brewStageId: mixture.brewStage.id,
                    version: mixture.version
                }
            })
        );
    }

    function setEditable(value) {
        dispatch(
            setMashStageDetails({
                editable: !!value
            })
        );
    }

    const detailsProps = {
        stage,
        initialStage,
        setStage,
        mixture,
        initialMixture,
        setMixture,
        editable
    };

    const ingredientsProps = {
        mixture,
        editable,
        changed,
        materialPortions,
        initialMaterialPortions,
        setMaterialPortions,
        materialPortionsChanged
    };

    const toolbarProps = {
        editable,
        setEditable,
        changed,
        onSave
    }

    return (
        <React.Fragment>
            <Details {...detailsProps}/>
            <Ingredients {...ingredientsProps}/>
            <div className="clearFix mb-3"></div>
            <MixtureToolbar {...toolbarProps}/>
        </React.Fragment>
    );
}