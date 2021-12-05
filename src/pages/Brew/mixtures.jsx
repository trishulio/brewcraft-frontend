import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    editKettleMixture,
    editMashMixture,
    editWhirlpoolMixture,
    editTransferMixture,
    fetchMixturesByBrewId
} from "../../store/actions";

export default function Mixtures(props) {

    const dispatch = useDispatch();

    const { data: batch, save } = useSelector(state => {
        return state.Batch.Batch;
    })

    const { data: mashMixture, initial: initialMashMixture } = useSelector(state => {
        return state.Batch.MashMixture;
    });

    const { data: kettleMixture, initial: initialKettleMixture } = useSelector(state => {
        return state.Batch.KettleMixture;
    });

    const { data: whirlpoolMixture, initial: initialWhirlpoolMixture } = useSelector(state => {
        return state.Batch.WhirlpoolMixture;
    });

    const { data: transferMixture, initial: initialTransferMixture } = useSelector(state => {
        return state.Batch.TransferMixture;
    });

    const isChanged = useCallback(() => {
        return JSON.stringify(
                (({ quantity }) => ({ quantity }))(initialMashMixture))
            !== JSON.stringify(
                (({ quantity }) => ({ quantity }))(mashMixture))
            || JSON.stringify(
                (({ quantity }) => ({ quantity }))(initialKettleMixture))
            !== JSON.stringify(
                (({ quantity }) => ({ quantity }))(kettleMixture))
            || JSON.stringify(
                (({ quantity }) => ({ quantity }))(initialWhirlpoolMixture))
            !== JSON.stringify(
                (({ quantity }) => ({ quantity }))(whirlpoolMixture))
            || JSON.stringify(
                (({ quantity }) => ({ quantity }))(initialTransferMixture))
            !== JSON.stringify(
                (({ quantity }) => ({ quantity }))(transferMixture))
    }, [
        initialMashMixture,
        mashMixture,
        initialKettleMixture,
        kettleMixture,
        initialWhirlpoolMixture,
        whirlpoolMixture,
        initialTransferMixture,
        transferMixture
    ]);

    useEffect(() => {
        if (batch.id) {
            dispatch(fetchMixturesByBrewId(batch.id));
        }
    }, [batch.id, dispatch]);

    useEffect(() => {
        props.setMixturesChanged(isChanged());
    }, [
        mashMixture,
        kettleMixture,
        whirlpoolMixture,
        transferMixture,
        props,
        isChanged
    ]);

    useEffect(() => {
        if (save && isMixtureChanged(mashMixture, initialMashMixture)) {
            dispatch(
                editMashMixture({
                    id: mashMixture.id,
                    form: {
                        parentMixtureId: mashMixture.parentMixtureId,
                        quantity: {
                            ...mashMixture.quantity
                        },
                        brewStageId: mashMixture.brewStage.id,
                        version: mashMixture.version
                    }
                })
            );
        }
        if (save && isMixtureChanged(kettleMixture, initialKettleMixture)) {
            dispatch(
                editKettleMixture({
                    id: kettleMixture.id,
                    form: {
                        parentMixtureId: kettleMixture.parentMixtureId,
                        quantity: {
                            ...kettleMixture.quantity
                        },
                        brewStageId: kettleMixture.brewStage.id,
                        version: kettleMixture.version
                    }
                })
            );
        }
        if (save && isMixtureChanged(whirlpoolMixture, initialWhirlpoolMixture)) {
            dispatch(
                editWhirlpoolMixture({
                    id: whirlpoolMixture.id,
                    form: {
                        parentMixtureId: whirlpoolMixture.parentMixtureId,
                        quantity: {
                            ...whirlpoolMixture.quantity
                        },
                        brewStageId: whirlpoolMixture.brewStage.id,
                        version: whirlpoolMixture.version
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
        // eslint-disable-next-line
    }, [save]);

    function isMixtureChanged(mixture, initialMixture) {
        return JSON.stringify(
                (({ quantity }) => ({ quantity }))(initialMixture))
            !== JSON.stringify(
                (({ quantity }) => ({ quantity }))(mixture))
    }

    return (
        <React.Fragment>{props.children}</React.Fragment>
    )
}