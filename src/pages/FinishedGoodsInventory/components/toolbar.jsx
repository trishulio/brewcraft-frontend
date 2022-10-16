import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Toolbar from "../../../component/Common/toolbar";
import { Button } from "reactstrap";
import Modal from "./modal";
import {
    createFinishedGood,
    fetchFinishedGoodById,
    resetFinishedGoodDetails,
    setFinishedGoodDetails,
    setFinishedGoodInvalidMaterialPortions,
    setFinishedGoodInvalidMixturePortions,
    setFinishedGoodInvalidPackagedOn,
    setFinishedGoodInvalidQuantity,
    setFinishedGoodInvalidSku,
    updateFinishedGood,
} from "../../../store/actions";
import { useEffect } from "react";
import { isNotEmptyArray, validDate } from "../../../helpers/utils";

export default function FinishedGoodsInventoryToolbar() {
    const [show, setShow] = useState(false);
    const { id } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();

    const { data: finishedGood, initial: initialFinishedGood } = useSelector(
        (state) => {
            return state.FinishedGood;
        }
    );

    useEffect(() => {
        if (id && id !== "new") {
            dispatch(fetchFinishedGoodById(id));
        } else {
            dispatch(resetFinishedGoodDetails());
        }
        // eslint-disable-next-line
    }, [id]);

    const handleClose = () => {
        dispatch(resetFinishedGoodDetails());
        setShow(false);
    };

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

    function setFinishedGood(finishedGood) {
        dispatch(
            setFinishedGoodDetails({
                data: {
                    ...finishedGood,
                },
            })
        );
    }

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

    const modalProps = {
        finishedGood,
        setFinishedGood,
        showBatch: true,
        show: show,
        handleClose,
        handleSave: () => {
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
