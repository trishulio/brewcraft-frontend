import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    fetchAllSkus,
    fetchAllBatches,
    fetchMixtures,
    fetchFinishedGoodsInventory,
    fetchMaterialStockQuantity,
} from "../../store/actions";
import Modal from "./modal";

export default function FinishedGoodModal({
    finishedGood,
    setFinishedGood,
    show,
    handleClose,
    handleSave,
}) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (finishedGood?.id) {
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
    }, [finishedGood?.id]);

    function onSave(finishedGood) {
        handleSave(finishedGood);
    }

    function onClose() {
        handleClose();
    }

    const props = {
        finishedGood,
        setFinishedGood,
        show,
        editable: true,
        repackage: false,
        onSave,
        onClose,
    };

    return <Modal {...props} />;
}
