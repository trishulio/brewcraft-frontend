import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
    setBreadcrumbItems,
    fetchPackagingItemById,
    savePackagingItem,
    editPackagingItem,
    deletePackagingItem,
    fetchAllMaterialCategories,
    resetPackagingItemDetails,
    setPackagingItemInvalidName,
    setPackagingItemInvalidCategory,
    setPackagingItemInvalidBaseQuantityUnit,
    setInvalidPackagingUpc,
} from "../../store/actions";
import { isValidName, useQuery, validId } from "../../helpers/utils";
import PackagingItemInner from "./packaging-item";
import DeleteGuard from "../../component/Prompt/DeleteGuard";
import RouteLeavingGuard from "../../component/Prompt/RouteLeavingGuard";

export default function PackagingItem() {
    const [editable, setEditable] = useState(false);
    const [changed, setChanged] = useState(false);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const [showRouterPrompt, setShowRouterPrompt] = useState(false);

    const { id } = useParams();
    const history = useHistory();
    const query = useQuery();
    const editMode = query.get("edit");
    const dispatch = useDispatch();

    const packagingItem = useSelector((state) => {
        return state.PackagingItem.data;
    });

    const initialPackagingItem = useSelector((state) => {
        return state.PackagingItem.initial;
    });

    useEffect(() => {
        if (id === "new") {
            dispatch(resetPackagingItemDetails());
            history.replace("/materials/packaging/new?edit=true");
        } else {
            dispatch(fetchPackagingItemById({ id }));
        }
        if (editMode) {
            dispatch(fetchAllMaterialCategories());
        }
        setEditable(editMode && editMode !== "false");
        setShowRouterPrompt(!!editMode);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, editMode]);

    useEffect(() => {
        if (packagingItem.id) {
            dispatch(
                setBreadcrumbItems(packagingItem.name, [
                    { title: "Main", link: "#" },
                    { title: "Packaging", link: "#" },
                ])
            );
        } else {
            dispatch(
                setBreadcrumbItems("New Packaging Item", [
                    { title: "Main", link: "#" },
                    { title: "Packaging", link: "#" },
                ])
            );
        }
        setChanged(isChanged());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [packagingItem]);

    function isChanged() {
        return (
            JSON.stringify(
                (({
                    id,
                    name,
                    description,
                    category,
                    baseQuantityUnit,
                    upc,
                }) => ({
                    id,
                    name,
                    description,
                    category,
                    baseQuantityUnit,
                    upc,
                }))(initialPackagingItem)
            ) !==
            JSON.stringify(
                (({
                    id,
                    name,
                    description,
                    category,
                    baseQuantityUnit,
                    upc,
                }) => ({
                    id,
                    name,
                    description,
                    category,
                    baseQuantityUnit,
                    upc,
                }))(packagingItem)
            )
        );
    }

    function onSave() {
        if (
            !isValidName(packagingItem.name) ||
            !validId(packagingItem.category?.id) ||
            !packagingItem.baseQuantityUnit ||
            (packagingItem.upc && packagingItem.upc.length > 12)
        ) {
            dispatch(
                setPackagingItemInvalidName(!isValidName(packagingItem.name))
            );
            dispatch(
                setPackagingItemInvalidCategory(
                    !validId(packagingItem.category?.id)
                )
            );
            dispatch(
                setPackagingItemInvalidBaseQuantityUnit(
                    !packagingItem.baseQuantityUnit
                )
            );
            dispatch(setInvalidPackagingUpc(packagingItem.upc));
            return;
        }
        if (!isChanged()) {
            history.push("/materials/packaging/" + id);
        } else if (packagingItem.id) {
            dispatch(
                editPackagingItem({
                    id: packagingItem.id,
                    form: {
                        name: packagingItem.name.trim(),
                        description: packagingItem.description,
                        categoryId: packagingItem.category.id,
                        baseQuantityUnit: packagingItem.baseQuantityUnit,
                        upc: packagingItem.upc,
                        imageSrc:
                            "https://media.giphy.com/media/13raYVIdU3Zu48/giphy.gif?cid=ecf05e47f0oz1g60305stwichysuopch345osbr07wf33sb0&rid=giphy.gif&ct=g",
                        version: packagingItem.version,
                    },
                    success: (packagingItem) => {
                        history.push(
                            "/materials/packaging/" + packagingItem.id
                        );
                    },
                })
            );
        } else {
            dispatch(
                savePackagingItem({
                    form: {
                        name: packagingItem.name.trim(),
                        description: packagingItem.description,
                        categoryId: packagingItem.category.id,
                        baseQuantityUnit: packagingItem.baseQuantityUnit,
                        upc: packagingItem.upc,
                        imageSrc:
                            "https://media.giphy.com/media/13raYVIdU3Zu48/giphy.gif?cid=ecf05e47f0oz1g60305stwichysuopch345osbr07wf33sb0&rid=giphy.gif&ct=g",
                    },
                    success: (packagingItem) => {
                        history.push(
                            "/materials/packaging/" + packagingItem.id
                        );
                    },
                })
            );
        }
    }

    function onDelete() {
        setShowDeletePrompt(!!packagingItem.id);
    }

    return (
        <React.Fragment>
            <DeleteGuard
                when={showDeletePrompt}
                confirm={() => {
                    dispatch(deletePackagingItem(packagingItem.id));
                    setShowRouterPrompt(false);
                }}
                close={() => {
                    setShowDeletePrompt(false);
                }}
                content="This cannot be undone. Are you sure want to delete this item?"
            />
            <RouteLeavingGuard
                when={showRouterPrompt}
                navigate={(path) => {
                    history.push(path);
                }}
                shouldBlockNavigation={() => editMode && isChanged()}
                content="There are unsaved changes. Are you sure want to leave this page?"
            />
            <PackagingItemInner {...{ editable, changed, onSave, onDelete }} />
        </React.Fragment>
    );
}
