import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useLocation } from "react-router-dom";
import {
    setBreadcrumbItems,
    fetchPackagingItemById,
    savePackagingItem,
    editPackagingItem,
    deletePackagingItem,
    fetchAllMaterialCategories,
    resetPackagingItemDetails
} from "../../store/actions";
import PackagingItemInner from "./packaging-item";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function PackagingItem() {
    const [editable, setEditable] = useState(false);
    const [changed, setChanged] = useState(false);

    const { id } = useParams();
    const history = useHistory();
    const query = useQuery();
    const editMode = query.get("edit");
    const dispatch = useDispatch();

    const packagingItem = useSelector(state => {
        return state.PackagingItem.data;
    });

    const initialPackagingItem = useSelector(state => {
        return state.PackagingItem.initial;
    });

    const { invalidName } = useSelector(state => {
        return state.PackagingItem
    });

    useEffect(() => {
        if (id === "new") {
            dispatch(resetPackagingItemDetails());
            history.replace("/materials/packaging/new?edit=true");
        } else {
            fetch(id);
        }
        setEditable(editMode && editMode !== "false");
    }, [id, editMode]);

    useEffect(() => {
        dispatch(fetchAllMaterialCategories());
    }, [packagingItem]);

    useEffect(() => {
        if (packagingItem.id) {
            dispatch(setBreadcrumbItems(packagingItem.name, [
                { title: "Main", link: "#" },
                { title: "Packaging", link: "#" }]
            ));
        } else {
            dispatch(setBreadcrumbItems("New Packaging Item", [
                { title: "Main", link: "#" },
                { title: "Packaging", link: "#" }]
            ));
        }
        setChanged(isChanged());
    }, [packagingItem]);

    function isChanged() {
        return JSON.stringify(
                (({ id, name, description, category, baseQuantityUnit, upc }) => ({ id, name, description, category, baseQuantityUnit, upc }))(initialPackagingItem))
            !== JSON.stringify(
                (({ id, name, description, category, baseQuantityUnit, upc }) => ({ id, name, description, category, baseQuantityUnit, upc }))(packagingItem))
    }

    function onSave() {
        if (invalidName) {
            return;
        }
        if (!isChanged()) {
            history.push("/materials/packaging/" + id);

        } else if (packagingItem.id) {
            dispatch(
                editPackagingItem({
                    id: packagingItem.id,
                    form: {
                        name: packagingItem.name,
                        description: packagingItem.description,
                        categoryId: packagingItem.category.id,
                        baseQuantityUnit: packagingItem.baseQuantityUnit,
                        upc: packagingItem.upc,
                        version: packagingItem.version
                    },
                    success: packagingItem => {
                        history.push("/materials/packaging/" + packagingItem.id);
                    }
                })
            );
        } else {
            dispatch(
                savePackagingItem({
                    form: {
                        name: packagingItem.name,
                        description: packagingItem.description,
                        categoryId: packagingItem.category.id,
                        baseQuantityUnit: packagingItem.baseQuantityUnit,
                        upc: packagingItem.upc
                    },
                    success: packagingItem => {
                        history.push("/materials/packaging/" + packagingItem.id);
                    }
                })
            );
        }
    }

    function onDelete() {
        if (packagingItem.id) {
            dispatch(deletePackagingItem(id));
        }
    }

    function fetch(id) {
        dispatch(fetchPackagingItemById({ id } ));
    }

    return (
        <PackagingItemInner {...{editable, changed, onSave, onDelete}} />
    );
}