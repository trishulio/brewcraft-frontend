import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Ingredients from "../mixture/ingredients";
import Details from "../mixture/details";
import {
    setMashMaterialPortionDetails,
    setMashMixtureDetails,
    setMashStageDetails
} from "../../../../store/actions";

export default function BrewMash() {

    const dispatch = useDispatch();

    const { editable } = useSelector(state => {
        return state.Batch.Batch;
    });

    const stage = useSelector(state => {
        return state.Batch.MashStage.data;
    });

    const mixture = useSelector(state => {
        return state.Batch.MashMixture.data;
    });

    const materialPortions = useSelector(state => {
        return state.Batch.MashMaterialPortion.content;
    });

    function setStage(stage) {
        dispatch(
            setMashStageDetails({
                data: stage
            })
        );
    }

    function setMixture(mixture) {
        dispatch(
            setMashMixtureDetails({
                data: mixture
            })
        );
    }

    function setMaterialPortions(materialPortions) {
        dispatch(
            setMashMaterialPortionDetails({
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
            <div
                className="px-2"
                style={{
                    maxWidth: "50rem"
                }}
            >
                <Ingredients {...ingredientsProps}/>
            </div>
        </React.Fragment>
    );
}