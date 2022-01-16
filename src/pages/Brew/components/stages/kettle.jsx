import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ingredients from "../mixture/ingredients";
import Details from "../mixture/details";
import {
    deleteKettleMaterialPortion,
    editKettleMaterialPortion,
    editKettleMixture,
    editKettleStage,
    setKettleMaterialPortionDetails,
    setKettleMixtureDetails,
    setKettleStageDetails,
} from "../../../../store/actions";
import BatchStage from "./stage";

export default function BrewKettle() {
    const dispatch = useDispatch();

    const {
        data: stage,
        initial: initialStage,
        changed,
        loading: stageLoading,
        editable,
        error: stageError,
    } = useSelector((state) => {
        return state.Batch.KettleStage;
    });

    const {
        data: mixture,
        initial: initialMixture,
        loading: mixtureLoading,
        error: mixtureError,
    } = useSelector((state) => {
        return state.Batch.KettleMixture;
    });

    const {
        content: materialPortions,
        initial: initialMaterialPortions,
        loading: materialPortionsLoading,
        error: materialPortionsError,
    } = useSelector((state) => {
        return state.Batch.KettleMaterialPortion;
    });

    useEffect(() => {
        dispatch(
            setKettleStageDetails({
                changed: isChanged(),
            })
        );
        // eslint-disable-next-line
    }, [stage, mixture, materialPortions]);

    function isChanged() {
        return (
            JSON.stringify(initialStage) !== JSON.stringify(stage) ||
            JSON.stringify(initialMixture) !== JSON.stringify(mixture) ||
            JSON.stringify(initialMaterialPortions) !==
                JSON.stringify(materialPortions)
        );
    }

    function setStage(stage) {
        dispatch(
            setKettleStageDetails({
                data: stage,
            })
        );
    }

    function setMixture(mixture) {
        dispatch(
            setKettleMixtureDetails({
                data: mixture,
            })
        );
    }

    function setMaterialPortions(materialPortions) {
        dispatch(
            setKettleMaterialPortionDetails({
                content: materialPortions,
            })
        );
    }

    function onSave() {
        if (changed) {
            dispatch(
                editKettleStage({
                    id: stage.id,
                    form: {
                        statusId: stage.status.id,
                        taskId: stage.task.id,
                        startedAt: stage.startedAt,
                        endedAt: stage.endedAt,
                        version: stage.version,
                    },
                })
            );
            dispatch(
                editKettleMixture({
                    id: mixture.id,
                    form: {
                        parentMixtureId: mixture.parentMixtureId,
                        quantity: {
                            ...mixture.quantity,
                        },
                        brewStageId: mixture.brewStage.id,
                        version: mixture.version,
                    },
                })
            );
            if (materialPortions.length) {
                dispatch(
                    editKettleMaterialPortion({
                        form: materialPortions.map((mp) => ({
                            id: mp.id,
                            materialLotId: mp.materialLot.id,
                            quantity: mp.quantity,
                            mixtureId: mp.mixture.id,
                            // addedAt: "2021-11-03T02:59:16.053Z",
                            version: mp.version,
                        })),
                    })
                );
            }
            // delete material portions
            const map = materialPortions.map((mp) => mp.id);
            const mp = initialMaterialPortions
                .filter((imp) => !map.includes(imp.id))
                .map((mp) => mp.id);
            if (mp.length) {
                dispatch(
                    deleteKettleMaterialPortion({
                        form: mp,
                    })
                );
            }
        }
    }

    const detailsProps = {
        stage,
        setStage,
        mixture,
        setMixture,
        editable,
    };

    const ingredientsProps = {
        mixture,
        editable,
        materialPortions,
        setMaterialPortions,
    };

    const stageProps = {
        title: "Kettle",
        editable,
        setEditable: () => {
            dispatch(
                setKettleStageDetails({
                    editable: true,
                })
            );
        },
        changed,
        initialStage,
        stage,
        stageLoading,
        mixtureLoading,
        materialPortionsLoading,
        stageError,
        mixtureError,
        materialPortionsError,
        onSave,
        onCancel: () => {
            dispatch(
                setKettleStageDetails({
                    data: {
                        ...initialStage,
                    },
                    editable: false,
                })
            );
        },
    };

    return (
        <React.Fragment>
            <BatchStage {...stageProps}>
                <Details {...detailsProps} />
                <div className="clearfix mb-1"></div>
                <Ingredients {...ingredientsProps} />
            </BatchStage>
        </React.Fragment>
    );
}
