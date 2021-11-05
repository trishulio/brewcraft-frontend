import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ingredients from "../mixture/ingredients";
import Details from "../mixture/details";
import {
    setKettleMaterialPortionDetails,
    setKettleMixtureDetails,
    setKettleStageDetails
} from "../../../../store/actions";

export default function BrewKettle({ setChanged }) {
    const [materialPortionsChanged, setMaterialPortionsChanged] = useState(false);

    const dispatch = useDispatch();

    const { editable } = useSelector(state => {
        return state.Batch.details;
    });

    const stage = useSelector(state => {
        return state.Batch.KettleStage.data;
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

    const { content: materialPortions, initial: initialMaterialPortions } = useSelector(state => {
        return state.Batch.KettleMaterialPortion;
    });

    useEffect(() => {
        setChanged(isChanged());
    }, [stage, mixture, materialPortions]);

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

    function setMaterialPortions(materialPortions) {
        dispatch(
            setKettleMaterialPortionDetails({
                content: materialPortions
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
        materialPortions,
        initialMaterialPortions,
        setMaterialPortions,
        materialPortionsChanged
    };

    return (
        <React.Fragment>
            <Details {...detailsProps}/>
            <div className="clearFix mb-3"></div>
            <div className="px-2">
                <Ingredients {...ingredientsProps}/>
            </div>
        </React.Fragment>
    );
}