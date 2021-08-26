import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
    setBreadcrumbItems,
    fetchIngredientById,
    saveIngredient,
    editIngredient,
    deleteIngredient,
    fetchAllMaterialCategories,
    resetIngredientDetails
} from "../../store/actions";
import {
    useQuery
} from "../../helpers/utils";
import IngredientInner from "./ingredient";

export default function Ingredient() {
    const [editable, setEditable] = useState(false);
    const [changed, setChanged] = useState(false);

    const { id } = useParams();
    const history = useHistory();
    const query = useQuery();
    const editMode = query.get("edit");
    const dispatch = useDispatch();

    const ingredient = useSelector(state => {
        return state.Ingredient.data;
    });

    const initialIngredient = useSelector(state => {
        return state.Ingredient.initial;
    });

    const { invalidName } = useSelector(state => {
        return state.Ingredient
    });

    useEffect(() => {
        if (id === "new") {
            dispatch(resetIngredientDetails());
            history.replace("/materials/ingredients/new?edit=true");
        } else {
            dispatch(fetchIngredientById({ id }));
        }
        if (editMode) {
            dispatch(fetchAllMaterialCategories());
        }
        setEditable(editMode && editMode !== "false");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, editMode, ingredient]);

    useEffect(() => {
        if (ingredient.id) {
            dispatch(setBreadcrumbItems(ingredient.name, [
                { title: "Main", link: "#" },
                { title: "Ingredients", link: "#" }]
            ));
        } else {
            dispatch(setBreadcrumbItems("New Ingredient", [
                { title: "Main", link: "#" },
                { title: "Ingredients", link: "#" }]
            ));
        }
        setChanged(isChanged());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ingredient]);

    function isChanged() {
        return JSON.stringify(
                (({ id, name, description, category, baseQuantityUnit, upc }) => ({ id, name, description, category, baseQuantityUnit, upc }))(initialIngredient))
            !== JSON.stringify(
                (({ id, name, description, category, baseQuantityUnit, upc }) => ({ id, name, description, category, baseQuantityUnit, upc }))(ingredient))
    }

    function onSave() {
        if (invalidName) {
            return;
        }
        if (!isChanged()) {
            history.push("/materials/ingredients/" + id);

        } else if (ingredient.id) {
            dispatch(
                editIngredient({
                    id: ingredient.id,
                    form: {
                        name: ingredient.name,
                        description: ingredient.description,
                        categoryId: ingredient.category.id,
                        baseQuantityUnit: ingredient.baseQuantityUnit,
                        upc: ingredient.upc,
                        version: ingredient.version
                    },
                    success: ingredient => {
                        history.push("/materials/ingredients/" + ingredient.id);
                    }
                })
            );
        } else {
            dispatch(
                saveIngredient({
                    form: {
                        name: ingredient.name,
                        description: ingredient.description,
                        categoryId: ingredient.category.id,
                        baseQuantityUnit: ingredient.baseQuantityUnit,
                        upc: ingredient.upc
                    },
                    success: ingredient => {
                        history.push("/materials/ingredients/" + ingredient.id);
                    }
                })
            );
        }
    }

    function onDelete() {
        if (ingredient.id) {
            dispatch(deleteIngredient(id));
        }
    }

    return (
        <IngredientInner {...{editable, changed, onSave, onDelete}} />
    );
}