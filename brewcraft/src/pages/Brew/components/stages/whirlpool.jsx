import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Details from "../mixture/details";
import {
    setWhirlpoolMixtureDetails,
    setWhirlpoolStageDetails
} from "../../../../store/actions";

export default function BrewWhirlpool({ setChanged }) {
    const [materialPortionsChanged, setMaterialPortionsChanged] = useState(false);

    const dispatch = useDispatch();

    const { editable } = useSelector(state => {
        return state.Batch.details;
    });

    const stage = useSelector(state => {
        return state.Batch.WhirlpoolStage.data;
    });

    const initialStage = useSelector(state => {
        return state.Batch.WhirlpoolStage.initial;
    });

    const mixture = useSelector(state => {
        return state.Batch.WhirlpoolMixture.data;
    });

    const initialMixture = useSelector(state => {
        return state.Batch.WhirlpoolMixture.initial;
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
        initialStage,
        setStage,
        mixture,
        initialMixture,
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