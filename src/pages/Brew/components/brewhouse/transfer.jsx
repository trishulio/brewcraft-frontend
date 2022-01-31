import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTransferStageDetails } from "../../../../store/actions";

export default function BrewTransfer() {
    const dispatch = useDispatch();

    const { data: stage, initial: initialStage } = useSelector((state) => {
        return state.Batch.TransferStage;
    });

    const { data: mixture, initial: initialMixture } = useSelector((state) => {
        return state.Batch.TransferMixture;
    });

    const { content: mixtureRecords, initial: initialMixtureRecords } =
        useSelector((state) => {
            return state.Batch.TransferMixtureRecordings;
        });

    useEffect(() => {
        dispatch(
            setTransferStageDetails({
                changed:
                    JSON.stringify(stage) !== JSON.stringify(initialStage) ||
                    JSON.stringify(mixture) !==
                        JSON.stringify(initialMixture) ||
                    JSON.stringify(mixtureRecords) !==
                        JSON.stringify(initialMixtureRecords),
            })
        );
    }, [stage, mixture, mixtureRecords]);

    return <React.Fragment></React.Fragment>;
}
