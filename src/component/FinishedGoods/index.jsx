import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isNotEmptyArray, validDate } from "../../helpers/utils";
import {
    fetchFinishedGoodById,
    fetchAllSkus,
    fetchAllBatches,
    fetchMixtures,
    fetchFinishedGoodsInventory,
    fetchMaterialStockQuantity,
    resetFinishedGoodDetails,
    setFinishedGoodInvalidSku,
    setFinishedGoodInvalidMixturePortions,
    setFinishedGoodInvalidMaterialPortions,
    setFinishedGoodInvalidPackagedOn,
    setFinishedGoodInvalidQuantity,
} from "../../store/actions";
import Modal from "./modal";

export default function FinishedGoodModal({
    finishedGoodId,
    show,
    handleClose,
    handleSave,
}) {
    const dispatch = useDispatch();

    const finishedGood = useSelector((state) => {
        return state.FinishedGood.data;
    });

    const initialFinishedGood = useSelector((state) => {
        return state.FinishedGood.initialFinishedGood;
    });

    useEffect(() => {
        dispatch(resetFinishedGoodDetails());

        if (!finishedGoodId || finishedGoodId === "new") {
            //do nothing
        } else {
            dispatch(fetchFinishedGoodById(finishedGoodId));
        }
        if (finishedGoodId) {
            dispatch(
                fetchMixtures({
                    brewIds:
                        finishedGood?.mixturePortions?.length > 0
                            ? finishedGood.mixturePortions[0].brewStage?.brew
                                  ?.id
                            : null,
                    stageTaskIds: "5,7,8", //FinishedGoods can only be packaged from Fermenter,Conditioner,Storage Tank stages
                })
            );
        }
        dispatch(fetchAllSkus());
        dispatch(fetchFinishedGoodsInventory());
        dispatch(fetchMaterialStockQuantity());
        dispatch(fetchAllBatches());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [finishedGoodId]);

    function isChanged() {
        return (
            JSON.stringify(
                (({
                    id,
                    sku,
                    mixturePortions,
                    materialPortions,
                    finishedGoodLotPortions,
                    quantity,
                    packagedOn,
                }) => ({
                    id,
                    sku,
                    mixturePortions,
                    materialPortions,
                    finishedGoodLotPortions,
                    quantity,
                    packagedOn,
                }))(initialFinishedGood)
            ) !==
            JSON.stringify(
                (({
                    id,
                    sku,
                    mixturePortions,
                    materialPortions,
                    finishedGoodLotPortions,
                    quantity,
                    packagedOn,
                }) => ({
                    id,
                    sku,
                    mixturePortions,
                    materialPortions,
                    finishedGoodLotPortions,
                    quantity,
                    packagedOn,
                }))(finishedGood)
            )
        );
    }

    function validateFinishedGoodInputs(finishedGood) {
        let result = true;

        if (!finishedGood.sku) {
            dispatch(setFinishedGoodInvalidSku(true));
            result = false;
        }
        if (
            !finishedGood.mixturePortions ||
            !isNotEmptyArray(finishedGood.mixturePortions)
        ) {
            dispatch(setFinishedGoodInvalidMixturePortions(true));
            result = false;
        }
        if (
            !finishedGood.materialPortions ||
            !isNotEmptyArray(finishedGood.materialPortions)
        ) {
            dispatch(setFinishedGoodInvalidMaterialPortions(true));
            result = false;
        }
        if (!finishedGood.quantity) {
            dispatch(setFinishedGoodInvalidQuantity(true));
            result = false;
        }
        if (!validDate(finishedGood.packagedOn)) {
            dispatch(setFinishedGoodInvalidPackagedOn(true));
            result = false;
        }

        return result;
    }

    function onSave() {
        if (!validateFinishedGoodInputs(finishedGood) || !isChanged()) {
            return;
        }
        handleSave(finishedGood);
    }

    function onClose() {
        dispatch(resetFinishedGoodDetails());
        handleClose();
    }

    const props = {
        show,
        editable: true,
        repackage: false,
        onSave,
        onClose,
    };

    return <Modal {...props} />;
}
