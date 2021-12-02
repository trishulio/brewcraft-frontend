import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchMaterialPortionsByBrewId,
    saveKettleMaterialPortion,
    saveMashMaterialPortion
} from "../../store/actions";

export default function MaterialPortions(props) {

    const dispatch = useDispatch();

    const { data: batch, save } = useSelector(state => {
        return state.Batch.Batch;
    });

    const { content: mashMaterialPortions, initial: mashInitialMaterialPortions } = useSelector(state => {
        return state.Batch.MashMaterialPortion;
    });

    const { content: kettleMaterialPortions, initial: kettleInitialMaterialPortions } = useSelector(state => {
        return state.Batch.KettleMaterialPortion;
    });

    const isChanged = useCallback(() => {
        return JSON.stringify(mashMaterialPortions) !== JSON.stringify(mashInitialMaterialPortions)
            || JSON.stringify(kettleMaterialPortions) !== JSON.stringify(kettleInitialMaterialPortions);
    }, [
        mashInitialMaterialPortions,
        mashMaterialPortions,
        kettleInitialMaterialPortions,
        kettleMaterialPortions
    ]);

    useEffect(() => {
        if (batch.id) {
            dispatch(fetchMaterialPortionsByBrewId(batch.id));
        }
    }, [batch.id, dispatch]);

    useEffect(() => {
        props.setMaterialPortionsChanged(isChanged());
    }, [
        mashMaterialPortions,
        kettleMaterialPortions,
        props,
        isChanged
    ]);

    useEffect(() => {
        if (save && isMaterialPortionsChanged(mashMaterialPortions, mashInitialMaterialPortions)) {
            dispatch(
                saveMashMaterialPortion({
                    brewId: batch.id,
                    form: mashMaterialPortions
                        .filter(mp => !mashInitialMaterialPortions.map(imp => imp.materialLot.id).includes(mp.materialLot.id))
                        .map(mp => ({
                            materialLotId: mp.materialLot.id,
                            quantity: mp.quantity,
                            mixtureId: mp.mixture.id,
                            // addedAt: "2021-11-03T02:59:16.053Z"
                        }))
                })
            );
        }
        if (save && isMaterialPortionsChanged(kettleMaterialPortions, kettleInitialMaterialPortions)) {
            dispatch(
                saveKettleMaterialPortion({
                    brewId: batch.id,
                    form: kettleMaterialPortions
                        .filter(mp => !kettleInitialMaterialPortions.map(imp => imp.materialLot.id).includes(mp.materialLot.id))
                        .map(mp => ({
                            materialLotId: mp.materialLot.id,
                            quantity: mp.quantity,
                            mixtureId: mp.mixture.id,
                            // addedAt: "2021-11-03T02:59:16.053Z"
                        }))
                })
            );
        }
        // eslint-disable-next-line
    }, [save]);

    function isMaterialPortionsChanged(materialPortion, intialMaterialPortion) {
        return JSON.stringify(materialPortion) !== JSON.stringify(intialMaterialPortion)
    }

    return (
        <React.Fragment>{props.children}</React.Fragment>
    );
}