import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Details from "../mixture/details";
import {
    setWhirlpoolMixtureDetails,
    setWhirlpoolStageDetails
} from "../../../../store/actions";

export default function BrewWhirlpool() {

    const dispatch = useDispatch();

    const { editable } = useSelector(state => {
        return state.Batch.details;
    });

    const stage = useSelector(state => {
        return state.Batch.WhirlpoolStage.data;
    });

    const mixture = useSelector(state => {
        return state.Batch.WhirlpoolMixture.data;
    });

    function setStage(stage) {
        dispatch(
            setWhirlpoolStageDetails({
                data: stage
            })
        )
    }

    function setMixture(mixture) {
        dispatch(
            setWhirlpoolMixtureDetails({
                data: mixture
            })
        )
    }

    const detailsProps = {
        stage,
        setStage,
        mixture,
        setMixture,
        editable,
        showSkipCheckbox: true
    };

    return (
        <React.Fragment>
            <Details {...detailsProps}/>
        </React.Fragment>
    );
}