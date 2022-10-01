import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    fetchAllSkus,
    fetchAllBatches,
    fetchMixtures,
    fetchFinishedGoodsInventory,
    fetchMaterialStockQuantity,
} from "../../../store/actions";
import { Modal, ModalBody, ModalFooter } from "../../../component/Common/modal";
import FinishedGoodDetails from "./details";
import { Button } from "reactstrap";

export default function FinishedGoodModal({
    finishedGood,
    setFinishedGood,
    showBatch,
    show,
    editable,
    repackage,
    handleClose,
    handleSave,
}) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (showBatch) {
            dispatch(fetchAllBatches());
            if (finishedGood?.id) {
                dispatch(
                    fetchMixtures({
                        brewIds:
                            finishedGood?.mixturePortions?.length > 0
                                ? finishedGood.mixturePortions[0].brewStage
                                      ?.brew?.id
                                : null,
                        stageTaskIds: "5,7,8", //FinishedGoods can only be packaged from Fermenter,Conditioner,Storage Tank stages
                    })
                );
            }
        }
        dispatch(fetchAllSkus());
        dispatch(fetchFinishedGoodsInventory());
        dispatch(fetchMaterialStockQuantity());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [finishedGood?.id]);

    function onSave(finishedGood) {
        handleSave(finishedGood);
    }

    function onClose() {
        handleClose();
    }

    return (
        <Modal
            title="Finished Good Lot Details"
            size="lg"
            show={show}
            close={onClose}
        >
            <ModalBody>
                <FinishedGoodDetails
                    finishedGood={finishedGood}
                    setFinishedGood={setFinishedGood}
                    showBatch={showBatch}
                    editable={editable}
                    repackage={repackage}
                ></FinishedGoodDetails>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={onSave}>
                    Save
                </Button>{" "}
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}
