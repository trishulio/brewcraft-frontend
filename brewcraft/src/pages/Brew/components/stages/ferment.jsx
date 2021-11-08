import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setFermentMaterialPortionDetails,
    setFermentMixtureDetails,
    setFermentStageDetails
} from "../../../../store/actions";
import Details from "../mixture/details";
import Ingredients from "../mixture/ingredients";
import Recordings from "../mixture/recording";

export default function BatchFerment() {

    const dispatch = useDispatch();

    const { editable } = useSelector(state => {
        return state.Batch.details;
    });

    const stage = useSelector(state => {
        return state.Batch.FermentStage.data;
    });

    const mixture = useSelector(state => {
        return state.Batch.FermentMixture.data;
    });

    const materialPortions = useSelector(state => {
        return state.Batch.FermentMaterialPortion.content;
    });

    const mixtureRecordings = useSelector(state => {
        return state.Batch.FermentMixtureRecordings.content;
    });

    function setStage(stage) {
        dispatch(
            setFermentStageDetails({
                data: stage
            })
        );
    }

    function setMixture(mixture) {
        dispatch(
            setFermentMixtureDetails({
                data: mixture
            })
        );
    }

    function setMaterialPortions(materialPortions) {
        dispatch(
            setFermentMaterialPortionDetails({
                content: materialPortions
            })
        );
    }

    function setMixtureRecordings(mixtureRecordings) {
        dispatch(
            setFermentMixtureRecordingsDetails({
                content: mixtureRecordings
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

    const recordingsProps = {
        mixture,
        editable,
        mixtureRecordings,
        setMixtureRecordings
    }

    return (
        <React.Fragment>
            <Details {...detailsProps}/>
            <div className="clearFix mb-3"></div>
            <div className="px-2">
                <Ingredients {...ingredientsProps}/>
            </div>
            <div className="px-2">
                <Recordings {...recordingsProps}/>
            </div>
        </React.Fragment>
    );
}