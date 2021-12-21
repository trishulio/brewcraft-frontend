import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Details from "../mixture/details";
import {
    setTransferMixtureRecords,
    setWhirlpoolMixtureDetails,
    setWhirlpoolStageDetails,
} from "../../../../store/actions";

export default function BrewWhirlpool() {
    const dispatch = useDispatch();

    const { editable } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const stage = useSelector((state) => {
        return state.Batch.WhirlpoolStage.data;
    });

    const mixture = useSelector((state) => {
        return state.Batch.WhirlpoolMixture.data;
    });

    const mixtureRecords = useSelector((state) => {
        return state.Batch.TransferMixtureRecordings.content;
    });

    function setStage(stage) {
        debugger;
        dispatch(
            setWhirlpoolStageDetails({
                data: stage,
            })
        );
    }

    function setMixture(mixture) {
        dispatch(
            setWhirlpoolMixtureDetails({
                data: mixture,
            })
        );
    }

    function setMixtureRecords(mixtureRecords) {
        dispatch(setTransferMixtureRecords(mixtureRecords));
    }

    const detailsProps = {
        stage,
        setStage,
        mixture,
        setMixture,
        mixtureRecords,
        setMixtureRecords,
        editable,
        showSkipCheckbox: true,
    };

    return (
        <React.Fragment>
            <Details {...detailsProps} />
        </React.Fragment>
    );
}
