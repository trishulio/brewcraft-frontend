import React, { useEffect } from "react";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import FinishedGoodDetails from "./components/details";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    fetchFinishedGoodById,
    createFinishedGood,
    updateFinishedGood,
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
import { isNotEmptyArray, validDate } from "../../helpers/utils";

export default function FinishedGoodModal({ show, handleClose }) {
    const { id } = useParams();

    const dispatch = useDispatch();

    const finishedGood = useSelector((state) => {
        return state.FinishedGood.data;
    });

    const initialFinishedGood = useSelector((state) => {
        return state.FinishedGood.initialFinishedGood;
    });

    useEffect(() => {
        dispatch(resetFinishedGoodDetails());

        if (!id || id === "new") {
            //do nothing
        } else {
            dispatch(fetchFinishedGoodById(id));
        }
        if (id) {
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
    }, [id]);

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

    function getCreatePayload(finishedGood) {
        const finishedGoodCreatePayload = {};
        finishedGoodCreatePayload.id = null;
        finishedGoodCreatePayload.skuId = finishedGood.sku.id;
        finishedGoodCreatePayload.mixturePortions =
            finishedGood.mixturePortions?.map((portion) => {
                return {
                    mixtureId: portion.mixture.id,
                    quantity: portion.quantity,
                };
            });
        finishedGoodCreatePayload.materialPortions =
            finishedGood.materialPortions?.map((portion) => {
                return {
                    materialLotId: portion.materialLot.id,
                    quantity: portion.quantity,
                };
            });
        finishedGoodCreatePayload.finishedGoodLotPortions =
            finishedGood.finishedGoodLotPortions?.map((portion) => {
                return {
                    finishedGoodLotId: portion.finishedGoodLot.id,
                    quantity: portion.quantity,
                };
            });
        finishedGoodCreatePayload.quantity = finishedGood.quantity;
        finishedGoodCreatePayload.packagedOn = finishedGood.packagedOn;
        finishedGoodCreatePayload.version = null;

        return finishedGoodCreatePayload;
    }

    function getUpdatePayload(finishedGood) {
        const finishedGoodUpdatePayload = {};
        finishedGoodUpdatePayload.id = finishedGood.id;
        finishedGoodUpdatePayload.skuId = finishedGood.sku.id;
        finishedGoodUpdatePayload.mixturePortions =
            finishedGood.mixturePortions?.map((portion) => {
                return {
                    id: portion.id,
                    mixtureId: portion.mixture.id,
                    quantity: portion.quantity,
                    version: portion.version,
                };
            });
        finishedGoodUpdatePayload.materialPortions =
            finishedGood.materialPortions?.map((portion) => {
                return {
                    id: portion.id,
                    materialLotId: portion.materialLot.id,
                    quantity: portion.quantity,
                    version: portion.version,
                };
            });
        finishedGoodUpdatePayload.finishedGoodLotPortions =
            finishedGood.finishedGoodLotPortions?.map((portion) => {
                return {
                    id: portion.id,
                    finishedGoodLotId: portion.finishedGoodLot.id,
                    quantity: portion.quantity,
                    version: portion.version,
                };
            });
        finishedGoodUpdatePayload.quantity = finishedGood.quantity;
        finishedGoodUpdatePayload.packagedOn = finishedGood.packagedOn;
        finishedGoodUpdatePayload.version = finishedGood.version;

        return finishedGoodUpdatePayload;
    }

    function onSave() {
        if (!validateFinishedGoodInputs(finishedGood) || !isChanged()) {
            return;
        }

        if (finishedGood.id) {
            dispatch(
                updateFinishedGood({
                    id: finishedGood.id,
                    form: getUpdatePayload(finishedGood),
                })
            );
        } else {
            dispatch(
                createFinishedGood({
                    form: getCreatePayload(finishedGood),
                })
            );
        }
    }

    function onClose() {
        dispatch(resetFinishedGoodDetails());
        handleClose();
    }

    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            size="lg"
            style={{ width: "45%" }}
            isOpen={show}
        >
            <ModalBody>
                <FinishedGoodDetails
                    editable={true}
                    repackage={false}
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
