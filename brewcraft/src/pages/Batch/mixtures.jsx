import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    editKettleMixture,
    editMashMixture,
    editTransferMixtureRecords,
    editWhirlpoolMixture,
    editTransferMixture,
    fetchMixturesByBrewId
} from "../../store/actions";

export default function Mixtures(props) {

    const dispatch = useDispatch();

    const { data: batch, save } = useSelector(state => {
        return state.Batch.Batch;
    })

    const { data: fermentMixture, initial: initialFermentMixture } = useSelector(state => {
        return state.Batch.FermentMixture;
    });

    const { data: conditionMixture, initial: initialConditionMixture } = useSelector(state => {
        return state.Batch.FermentMixture;
    });

    const { data: briteTankMixture, initial: initialBriteTankMixture } = useSelector(state => {
        return state.Batch.FermentMixture;
    });

    const { data: transferMixture, initial: initialTransferMixture } = useSelector(state => {
        return state.Batch.TransferMixture;
    });

    useEffect(() => {
        if (batch.id) {
            dispatch(fetchMixturesByBrewId(batch.id));
        }
    }, [batch.id]);

    useEffect(() => {
        props.setMixturesChanged(isChanged());
    }, [
        fermentMixture,
        conditionMixture,
        briteTankMixture,
        transferMixture
    ]);

    useEffect(() => {
        if (save && isMixtureChanged(fermentMixture, initialFermentMixture)) {
            dispatch(
                editMashMixture({
                    id: fermentMixture.id,
                    form: {
                        parentMixtureId: fermentMixture.parentMixtureId,
                        quantity: {
                            ...fermentMixture.quantity
                        },
                        brewStageId: fermentMixture.brewStage.id,
                        version: fermentMixture.version
                    }
                })
            );
        }
        if (save && isMixtureChanged(conditionMixture, initialConditionMixture)) {
            dispatch(
                editKettleMixture({
                    id: conditionMixture.id,
                    form: {
                        parentMixtureId: conditionMixture.parentMixtureId,
                        quantity: {
                            ...conditionMixture.quantity
                        },
                        brewStageId: conditionMixture.brewStage.id,
                        version: conditionMixture.version
                    }
                })
            );
        }
        if (save && isMixtureChanged(briteTankMixture, initialBriteTankMixture)) {
            dispatch(
                editWhirlpoolMixture({
                    id: briteTankMixture.id,
                    form: {
                        parentMixtureId: briteTankMixture.parentMixtureId,
                        quantity: {
                            ...briteTankMixture.quantity
                        },
                        brewStageId: briteTankMixture.brewStage.id,
                        version: briteTankMixture.version
                    }
                })
            );
        }
        if (save && isMixtureChanged(transferMixture, initialTransferMixture)) {
            dispatch(
                editTransferMixture({
                    id: transferMixture.id,
                    form: {
                        parentMixtureId: transferMixture.parentMixtureId,
                        quantity: {
                            ...transferMixture.quantity
                        },
                        brewStageId: transferMixture.brewStage.id,
                        version: transferMixture.version
                    }
                })
            );
        }
    }, [save]);

    function isMixtureChanged(mixture, initialMixture) {
        return JSON.stringify(
                (({ quantity }) => ({ quantity }))(initialMixture))
            !== JSON.stringify(
                (({ quantity }) => ({ quantity }))(mixture))
    }

    function isChanged() {
        return JSON.stringify(
                (({ quantity }) => ({ quantity }))(initialFermentMixture))
            !== JSON.stringify(
                (({ quantity }) => ({ quantity }))(fermentMixture))
            || JSON.stringify(
                (({ quantity }) => ({ quantity }))(initialConditionMixture))
            !== JSON.stringify(
                (({ quantity }) => ({ quantity }))(conditionMixture))
            || JSON.stringify(
                (({ quantity }) => ({ quantity }))(initialBriteTankMixture))
            !== JSON.stringify(
                (({ quantity }) => ({ quantity }))(briteTankMixture))
            || JSON.stringify(
                (({ quantity }) => ({ quantity }))(initialTransferMixture))
            !== JSON.stringify(
                (({ quantity }) => ({ quantity }))(transferMixture))
    }

    return (
        <React.Fragment>{console.log(fermentMixture)}{props.children}</React.Fragment>
    )
}