import React, { useState } from "react";
import Toolbar from "../../../component/Common/toolbar";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import Modal from "../../../component/FinishedGoods";
import { useDispatch } from "react-redux";
import { createFinishedGood, updateFinishedGood } from "../../../store/actions";

export default function FinishedGoodsInventoryToolbar() {
    const { id } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

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

    const modalProps = {
        finishedGoodId: id,
        show: show,
        handleClose,
        handleSave: (finishedGood) => {
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
        },
    };
    return (
        <Toolbar>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={() => {
                    history.push({
                        pathname: "/inventory/finished-goods/new",
                        search: "?edit=true",
                    });
                }}
            >
                New Finished Good
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={() => {
                    history.push({
                        pathname: "/inventory/finished-goods/new",
                        search: "?edit=true&repackage=true",
                    });
                }}
            >
                Repackage Finished Good
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={() => {
                    setShow(true);
                }}
            >
                Modal
            </Button>
            <Modal {...modalProps}></Modal>
        </Toolbar>
    );
}
