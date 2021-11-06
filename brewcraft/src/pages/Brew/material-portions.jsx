import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMaterialPortionsByBrewId, saveMashMaterialPortion } from "../../store/actions";

export default function MaterialPortions(props) {

    const dispatch = useDispatch();

    const { data: batch, save } = useSelector(state => {
        return state.Batch.details;
    });

    const { content: mashMaterialPortions, initial: mashInitialMaterialPortions } = useSelector(state => {
        return state.Batch.MashMaterialPortion;
    });

    useEffect(() => {
        if (batch.id) {
            dispatch(fetchMaterialPortionsByBrewId(batch.id));
        }
    }, [batch.id]);

    useEffect(() => {
        props.setMaterialPortionsChanged(isChanged());
    }, [mashMaterialPortions]);

    useEffect(() => {
        if (save) {
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
    }, [save]);

    function isChanged() {
        return JSON.stringify(mashMaterialPortions) !== JSON.stringify(mashInitialMaterialPortions);
    }

    return (
        <React.Fragment>{props.children}</React.Fragment>
    );
}