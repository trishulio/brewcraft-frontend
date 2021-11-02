import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ingredients from "../mixture/ingredients";
import Details from "../mixture/details";
import {
    editKettleMixture,
    editKettleStage,
    setKettleMixtureDetails,
    setKettleStageDetails
} from "../../../../store/actions";
import MixtureToolbar from "../mixture/toolbar";

export default function BrewKettle() {
    const [changed, setChanged] = useState(false);
    const [materialPortionsChanged, setMaterialPortionsChanged] = useState(false);
    const dispatch = useDispatch();

    const { data: stage, editable } = useSelector(state => {
        return state.Batch.KettleStage;
    });

    const initialStage = useSelector(state => {
        return state.Batch.KettleStage.initial;
    });

    const mixture = useSelector(state => {
        return state.Batch.KettleMixture.data;
    });

    const initialMixture = useSelector(state => {
        return state.Batch.KettleMixture.initial;
    });

    // const { content: materialPortions, initial: initialMaterialPortions } = useSelector(state => {
    //     return state.Batch.KettleMaterialPortion;
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
            setKettleStageDetails({
                data: stage
            })
        )
    }

    function setMixture(mixture) {
        dispatch(
            setKettleMixtureDetails({
                data: mixture
            })
        )
    }

    function onSave() {
        dispatch(
            editKettleStage({
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
            editKettleMixture({
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
            setKettleStageDetails({
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