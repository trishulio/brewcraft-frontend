import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
    setBreadcrumbItems,
    fetchMaterialCategoryById,
    saveMaterialCategory,
    editMaterialCategory,
    deleteMaterialCategory,
    fetchAllMaterialCategories,
    resetMaterialCategoryDetails
} from "../../store/actions";
import {
    useQuery
} from "../../helpers/utils";
import MaterialCategoryInner from "./material-category";

export default function MaterialCategory() {
    const [editable, setEditable] = useState(false);
    const [changed, setChanged] = useState(false);

    const { id } = useParams();
    const history = useHistory();
    const query = useQuery();
    const editMode = query.get("edit");
    const dispatch = useDispatch();

    const materialCategory = useSelector(state => {
        return state.MaterialCategory.data;
    });

    const initialMaterialCategory = useSelector(state => {
        return state.MaterialCategory.initial;
    });

    const { invalidName } = useSelector(state => {
        return state.MaterialCategory
    });

    useEffect(() => {
        if (id === "new") {
            dispatch(resetMaterialCategoryDetails());
            history.replace("/materials/categories/new?edit=true");
        } else {
            dispatch(fetchMaterialCategoryById({ id }));
        }
        setEditable(editMode && editMode !== "false");
        dispatch(fetchAllMaterialCategories());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, editMode]);

    useEffect(() => {
        if (materialCategory.id) {
            dispatch(setBreadcrumbItems(materialCategory.name, [
                { title: "Main", link: "#" },
                { title: "Material Categories", link: "#" }]
            ));
        } else {
            dispatch(setBreadcrumbItems("New Material Category", [
                { title: "Main", link: "#" },
                { title: "Material Categories", link: "#" }]
            ));
        }
        setChanged(isChanged());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [materialCategory]);

    function isChanged() {
        return JSON.stringify(
                (({ id, name, parentCategory }) => ({ id, name, parentCategory }))(initialMaterialCategory))
            !== JSON.stringify(
                (({ id, name, parentCategory }) => ({ id, name, parentCategory }))(materialCategory))
    }

    function onSave() {
        if (invalidName) {
            return;
        }
        if (!isChanged()) {
            history.push("/materials/categories/" + id);

        } else if (materialCategory.id) {
            dispatch(
                editMaterialCategory({
                    id: materialCategory.id,
                    form: {
                        name: materialCategory.name,
                        parentCategoryId: materialCategory.parentCategory.id,
                        version: materialCategory.version
                    },
                    success: materialCategory => {
                        history.push("/materials/categories/" + materialCategory.id);
                    }
                })
            );
        } else {
            dispatch(
                saveMaterialCategory({
                    form: {
                        name: materialCategory.name,
                        parentCategoryId: materialCategory.parentCategory.id
                    },
                    success: materialCategory => {
                        history.push("/materials/categories/" + materialCategory.id);
                    }
                })
            );
        }
    }

    function onDelete() {
        if (materialCategory.id) {
            dispatch(deleteMaterialCategory({
                id: materialCategory.id,
                success: () => {
                    history.push("/materials/categories");
                }
            }));
        }
    }

    return (
        <MaterialCategoryInner {...{editable, changed, onSave, onDelete}} />
    );
}