import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editMashMixture, fetchMixturesByBrewId } from "../../store/actions";

export default function Mixtures(props) {

    const dispatch = useDispatch();

    const { data: batch, save } = useSelector(state => {
        return state.Batch.details;
    })

    const { data: mashMixture, initial: initialMashMixture } = useSelector(state => {
        return state.Batch.MashMixture;
    });

    useEffect(() => {
        if (batch.id) {
            dispatch(fetchMixturesByBrewId(batch.id));
        }
    }, [batch.id]);

    useEffect(() => {
        props.setMixturesChanged(isChanged());

    }, [mashMixture]);

    useEffect(() => {
        if (save) {
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
    }, [save]);

    function isChanged() {
        return JSON.stringify(
                (({ quantity }) => ({ quantity }))(initialMashMixture))
            !== JSON.stringify(
                (({ quantity }) => ({ quantity }))(mashMixture))
    }

    return (
        <React.Fragment>{props.children}</React.Fragment>
    )
}