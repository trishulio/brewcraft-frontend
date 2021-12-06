import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Ingredients from "../mixture/ingredients";
import Details from "../mixture/details";
import {
    setKettleMaterialPortionDetails,
    setKettleMixtureDetails,
    setKettleMixtureRecords,
    setKettleStageDetails
} from "../../../../store/actions";

export default function BrewKettle() {

    const dispatch = useDispatch();

    const { editable } = useSelector(state => {
        return state.Batch.Batch;
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

    const mixtureRecords = useSelector(state => {
        return state.Batch.KettleMixtureRecordings.content;
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

    function setMixtureRecords(mixtureRecords) {
        dispatch(
            setKettleMixtureRecords(mixtureRecords)
        );
    }

    const detailsProps = {
        stage,
        setStage,
        mixture,
        setMixture,
        mixtureRecords,
        setMixtureRecords,
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