import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Ingredients from "../mixture/ingredients";
import Details from "../mixture/details";
import {
    setKettleMaterialPortionDetails,
    setKettleMixtureDetails,
    setKettleStageDetails
} from "../../../../store/actions";

export default function BrewKettle() {

    const dispatch = useDispatch();

    const { editable } = useSelector(state => {
        return state.Batch.details;
    });

    const stage = useSelector(state => {
        return state.Batch.KettleStage.data;
    });

    const mixture = useSelector(state => {
        return state.Batch.KettleMixture.data;
    });

    const materialPortions = useSelector(state => {
        return state.Batch.KettleMaterialPortion.content;
    });

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
        setStage,
        mixture,
        setMixture,
        editable
    };

    const ingredientsProps = {
        mixture,
        editable,
        materialPortions,
        setMaterialPortions
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