import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setFermentMaterialPortionDetails,
    setFermentMixtureDetails,
    setFermentMixtureRecords,
    setFermentStageDetails,
} from "../../../../store/actions";
import Details from "../mixture/details";
import Ingredients from "../mixture/ingredients";
import Recordings from "../mixture/mixture-recordings";
import MixturePortions from "../mixture/mixture-portions";
import { setFermentMixturePortions } from "../../../../store/MixturePortion/actions";

export default function BatchFerment() {
    const dispatch = useDispatch();

    const { editable } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const stage = useSelector((state) => {
        return state.Batch.FermentStage.data;
    });

    const mixture = useSelector((state) => {
        return state.Batch.FermentMixture.data;
    });

    const materialPortions = useSelector((state) => {
        return state.Batch.FermentMaterialPortion.content;
    });

    const mixtureRecordings = useSelector((state) => {
        return state.Batch.FermentMixtureRecordings.content;
    });

    const mixturePortions = useSelector((state) => {
        return state.Batch.FermentMixturePortions.content;
    });

    function setStage(stage) {
        dispatch(
            setFermentStageDetails({
                data: {
                    ...stage,
                },
            })
        );
    }

    function setMixture(mixture) {
        dispatch(
            setFermentMixtureDetails({
                data: {
                    ...mixture,
                },
            })
        );
    }

    function setMaterialPortions(materialPortions) {
        dispatch(
            setFermentMaterialPortionDetails({
                content: [...materialPortions],
            })
        );
    }

    function setMixtureRecordings(mixtureRecordings) {
        dispatch(
            setFermentMixtureRecords({
                content: [...mixtureRecordings],
            })
        );
    }

    function setMixturePortions(mixturePortions) {
        debugger;
        dispatch(
            setFermentMixturePortions({
                content: [...mixturePortions],
            })
        );
    }

    const detailsProps = {
        stage,
        setStage,
        mixture,
        setMixture,
        editable,
        showCompleteCheckbox: true,
        showOriginalGravityCheckbox: true,
    };

    const ingredientsProps = {
        mixture,
        editable,
        materialPortions,
        setMaterialPortions,
    };

    const recordingsProps = {
        mixture,
        editable,
        mixtureRecordings,
        setMixtureRecordings,
    };

    const mixturePortionsProps = {
        mixture,
        editable,
        mixturePortions,
        setMixturePortions,
    };

    return (
        <React.Fragment>
            <Details {...detailsProps} />
            <div className="clearFix mb-4"></div>
            <div className="px-2 mb-4">
                <Ingredients {...ingredientsProps} />
            </div>
            <div className="px-2 mb-4">
                <Recordings {...recordingsProps} />
            </div>
            <div className="px-2">
                <MixturePortions {...mixturePortionsProps} />
            </div>
        </React.Fragment>
    );
}
