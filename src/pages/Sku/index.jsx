import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
    setBreadcrumbItems,
    fetchSkuById,
    createSku,
    updateSku,
    deleteSku,
    resetSkuDetails,
    fetchAllProducts,
    setSkuInvalidNumber,
    setSkuInvalidName,
    setSkuInvalidProduct,
    setSkuInvalidVolume,
    setSkuInvalidBaseQuantityUnit,
} from "../../store/actions";
import { useQuery } from "../../helpers/utils";
import DeleteGuard from "../../component/Prompt/DeleteGuard";
import RouteLeavingGuard from "../../component/Prompt/RouteLeavingGuard";
import SkuInner from "./sku";

export default function Sku() {
    const [editable, setEditable] = useState(false);
    const [changed, setChanged] = useState(false);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const [showRouterPrompt, setShowRouterPrompt] = useState(false);

    const { id } = useParams();
    const query = useQuery();
    const editMode = query.get("edit");
    const history = useHistory();

    const dispatch = useDispatch();

    const sku = useSelector((state) => {
        return state.Sku.data;
    });

    const initialSku = useSelector((state) => {
        return state.Sku.initial;
    });

    useEffect(() => {
        dispatch(resetSkuDetails());

        if (!id || id === "new") {
            history.replace("/sku/new?edit=true");
        } else {
            dispatch(fetchSkuById({ id }));
        }
        if (editMode) {
            dispatch(fetchAllProducts());
        }

        setEditable(editMode && editMode !== "false");
        setShowRouterPrompt(!!editMode);
    }, [id, editMode, dispatch, history]);

    useEffect(() => {
        if (sku.id) {
            dispatch(
                setBreadcrumbItems(sku.name, [
                    { title: "Main", link: "#" },
                    { title: "Products", link: "#" },
                    { title: "SKU", link: "#" },
                ])
            );
        } else {
            dispatch(
                setBreadcrumbItems("New SKU", [
                    { title: "Main", link: "#" },
                    { title: "Products", link: "#" },
                    { title: "SKU", link: "#" },
                ])
            );
        }
        setChanged(isChanged());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sku]);

    function isChanged() {
        return (
            JSON.stringify(
                (({
                    id,
                    number,
                    name,
                    description,
                    product,
                    materials,
                    quantity,
                    isPackageable,
                }) => ({
                    id,
                    number,
                    name,
                    description,
                    product,
                    materials,
                    quantity,
                    isPackageable,
                }))(initialSku)
            ) !==
            JSON.stringify(
                (({
                    id,
                    number,
                    name,
                    description,
                    product,
                    materials,
                    quantity,
                    isPackageable,
                }) => ({
                    id,
                    number,
                    name,
                    description,
                    product,
                    materials,
                    quantity,
                    isPackageable,
                }))(sku)
            )
        );
    }

    function onSave() {
        if (
            !sku.number ||
            (sku.number && sku.number.length > 12) ||
            !sku.name ||
            !sku.product?.id ||
            !sku.quantity?.value ||
            !sku.quantity?.symbol
        ) {
            dispatch(setSkuInvalidNumber(sku.number));
            dispatch(setSkuInvalidName(!sku.name));
            dispatch(setSkuInvalidProduct(!sku.product?.id));
            dispatch(setSkuInvalidVolume(!sku.quantity.value));
            dispatch(setSkuInvalidBaseQuantityUnit(!sku.quantity.symbol));
            return;
        }

        if (!isChanged()) {
            history.push("/sku/" + id);
        } else if (sku.id) {
            dispatch(
                updateSku({
                    id: sku.id,
                    form: {
                        number: sku.number,
                        name: sku.name,
                        description: sku.description,
                        productId: sku.product.id,
                        quantity: {
                            value: parseFloat(sku.quantity.value),
                            symbol: sku.quantity.symbol,
                        },
                        materials: [],
                        isPackageable: sku.isPackageable,
                        version: sku.version,
                    },
                })
            );
        } else {
            dispatch(
                createSku({
                    form: {
                        number: sku.number,
                        name: sku.name,
                        description: sku.description,
                        productId: sku.product.id,
                        quantity: {
                            value: parseFloat(sku.quantity.value),
                            symbol: sku.quantity.symbol,
                        },
                        materials: [],
                        isPackageable: sku.isPackageable,
                    },
                })
            );
        }
    }

    function onEdit() {
        history.push({
            pathname: `/sku/${id}`,
            search: "?edit=true",
        });
    }

    function onDelete() {
        setShowDeletePrompt(!!sku.id);
    }

    return (
        <React.Fragment>
            <DeleteGuard
                when={showDeletePrompt}
                confirm={() => {
                    dispatch(deleteSku(sku.id));
                    setShowRouterPrompt(false);
                }}
                close={() => {
                    setShowDeletePrompt(false);
                }}
                content="This cannot be undone. Are you sure want to delete this sku?"
            />
            <RouteLeavingGuard
                when={showRouterPrompt}
                navigate={(path) => {
                    history.push(path);
                }}
                shouldBlockNavigation={() => editMode && isChanged()}
                content="There are unsaved changes. Are you sure want to leave this page?"
            />
            <SkuInner
                {...{ sku, editable, changed, onSave, onEdit, onDelete }}
            />
        </React.Fragment>
    );
}
