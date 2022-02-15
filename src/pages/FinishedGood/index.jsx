import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
    setBreadcrumbItems,
    fetchFinishedGoodById,
    createFinishedGood,
    updateFinishedGood,
    deleteFinishedGood,
    fetchAllSkus,
    fetchAllBatches,
    fetchMixtures,
    fetchFinishedGoodsInventory,
    fetchMaterialStockQuantity,
    resetFinishedGoodDetails,
    setFinishedGoodInvalidSku,
    setFinishedGoodInvalidMixturePortions,
    setFinishedGoodInvalidMaterialPortions,
    setFinishedGoodInvalidFinishedGoodLotPortions,
    setFinishedGoodInvalidPackagedOn,
    setFinishedGoodInvalidQuantity,
} from "../../store/actions";
import { useQuery } from "../../helpers/utils";
import RouteLeavingGuard from "../../component/Prompt/RouteLeavingGuard";
import DeleteGuard from "../../component/Prompt/DeleteGuard";
import FinishedGoodInner from "./finished-good";
import { isNotEmptyArray, validAmount, validDate } from "../../helpers/utils";

export default function FinishedGood() {
    const [editable, setEditable] = useState(false);
    const [changed, setChanged] = useState(false);
    const [repackageMode, setRepackageMode] = useState(false);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const [showRouterPrompt, setShowRouterPrompt] = useState(false);

    const { id } = useParams();
    const history = useHistory();
    const query = useQuery();
    const editMode = query.get("edit");
    const repackage = query.get("repackage");
    const dispatch = useDispatch();

    const finishedGood = useSelector((state) => {
        return state.FinishedGood.data;
    });

    const initialFinishedGood = useSelector((state) => {
        return state.FinishedGood.initialFinishedGood;
    });

    const isRepackageMode =
        repackage || finishedGood?.finishedGoodLotPortions?.length > 0;

    //Set repackage query param if not already set
    if (isRepackageMode) {
        const query = new URLSearchParams(history.location.search);
        if (!query.get("repackage")) {
            query.set("repackage", isRepackageMode);
            history.replace({ ...history.location, search: query.toString() });
        }
    }

    useEffect(() => {
        dispatch(resetFinishedGoodDetails());

        if (!id || id === "new") {
            dispatch(resetFinishedGoodDetails());
            if (isRepackageMode) {
                history.replace("new?edit=true&repackage=true");
            } else {
                history.replace("new?edit=true");
            }
        } else {
            dispatch(fetchFinishedGoodById(id));
        }
        if (editMode) {
            if (id) {
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
            dispatch(fetchAllSkus());
            dispatch(fetchFinishedGoodsInventory());
            dispatch(fetchMaterialStockQuantity());
            dispatch(fetchAllBatches());
        }
        setEditable(editMode && editMode !== "false");
        setRepackageMode(isRepackageMode && isRepackageMode !== "false");
        setShowRouterPrompt(!!editMode);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, editMode, repackage]);

    useEffect(() => {
        if (finishedGood.id) {
            dispatch(
                setBreadcrumbItems(finishedGood.name, [
                    { title: "Main", link: "#" },
                    { title: "Finished Goods", link: "#" },
                ])
            );
        } else {
            dispatch(
                setBreadcrumbItems("New Finished Good", [
                    { title: "Main", link: "#" },
                    { title: "Finished Goods", link: "#" },
                ])
            );
        }
        setChanged(isChanged());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [finishedGood]);

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

    function getCreatePayload(finishedGood) {
        let finishedGoodCreatePayload = {};
        finishedGoodCreatePayload.id = null;
        finishedGoodCreatePayload.skuId = finishedGood.sku.id;
        finishedGoodCreatePayload.mixturePortions = !repackageMode
            ? finishedGood.mixturePortions?.map((portion) => {
                  return {
                      mixtureId: portion.mixture.id,
                      quantity: portion.quantity,
                  };
              })
            : [];
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
        let finishedGoodUpdatePayload = {};
        finishedGoodUpdatePayload.id = finishedGood.id;
        finishedGoodUpdatePayload.skuId = finishedGood.sku.id;
        finishedGoodUpdatePayload.mixturePortions = !repackageMode
            ? finishedGood.mixturePortions?.map((portion) => {
                  return {
                      id: portion.id,
                      mixtureId: portion.mixture.id,
                      quantity: portion.quantity,
                      version: portion.version,
                  };
              })
            : [];
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
        if (!validateFinishedGoodInputs(finishedGood)) {
            return;
        }
        setShowRouterPrompt(false);
        if (!isChanged()) {
            history.push("/inventory/finished-goods/" + id);
        } else if (finishedGood.id) {
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

    function onDelete() {
        setShowDeletePrompt(!!finishedGood.id);
    }

    function validateFinishedGoodInputs(finishedGood) {
        let result = true;

        if (!finishedGood.sku) {
            dispatch(setFinishedGoodInvalidSku(true));
            result = false;
        }
        if (
            !repackageMode &&
            (!finishedGood.mixturePortions ||
                !isNotEmptyArray(finishedGood.mixturePortions))
        ) {
            dispatch(setFinishedGoodInvalidMixturePortions(true));
            result = false;
        }
        if (
            !repackageMode &&
            (!finishedGood.materialPortions ||
                !isNotEmptyArray(finishedGood.materialPortions))
        ) {
            dispatch(setFinishedGoodInvalidMaterialPortions(true));
            result = false;
        }
        if (
            repackageMode &&
            (!finishedGood.finishedGoodLotPortions ||
                !isNotEmptyArray(finishedGood.finishedGoodLotPortions))
        ) {
            dispatch(setFinishedGoodInvalidFinishedGoodLotPortions(true));
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

    return (
        <React.Fragment>
            <DeleteGuard
                when={showDeletePrompt}
                confirm={() => {
                    dispatch(deleteFinishedGood(finishedGood.id));
                    setShowRouterPrompt(false);
                }}
                close={() => {
                    setShowDeletePrompt(false);
                }}
                content="This cannot be undone. Are you sure want to delete this finished good?"
            />
            <RouteLeavingGuard
                when={showRouterPrompt}
                navigate={(path) => {
                    history.push(path);
                }}
                shouldBlockNavigation={() => editMode && isChanged()}
                content="There are unsaved changes. Are you sure want to leave this page?"
            />
            <FinishedGoodInner
                {...{ editable, changed, onSave, onDelete, repackageMode }}
            />
            ;
        </React.Fragment>
    );
}
