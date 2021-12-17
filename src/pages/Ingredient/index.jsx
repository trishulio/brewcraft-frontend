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
    resetIngredientDetails,
    setIngredientInvalidName,
    setIngredientInvalidCategory,
    setIngredientInvalidBaseQuantityUnit,
    setIngredientInvalidUpc
} from "../../store/actions";
import {
    isValidName,
    useQuery,
    validId
} from "../../helpers/utils";
import IngredientInner from "./ingredient";
import DeleteGuard from "../../component/Prompt/DeleteGuard";
import RouteLeavingGuard from "../../component/Prompt/RouteLeavingGuard";

export default function Ingredient() {
    const [editable, setEditable] = useState(false);
    const [changed, setChanged] = useState(false);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const [showRouterPrompt, setShowRouterPrompt] = useState(false);

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

    useEffect(() => {
        if (id === "new" && !editMode) {
            history.replace("/products/new?edit=true");
        } else {
            if (id === "new") {
                dispatch(resetIngredientDetails());
            } else {
                dispatch(fetchIngredientById(id));
            }
            if (editMode) {
                dispatch(fetchAllMaterialCategories());
            }
            setEditable(!!editMode);
            setShowRouterPrompt(!!editMode);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, editMode]);

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
        if (!isValidName(ingredient.name) || !validId(ingredient.category?.id) || !ingredient.baseQuantityUnit || (ingredient.upc && ingredient.upc.length > 12)) {
            dispatch(setIngredientInvalidName(!isValidName(ingredient.name)));
            dispatch(setIngredientInvalidCategory(!validId(ingredient.category?.id)));
            dispatch(setIngredientInvalidBaseQuantityUnit(!ingredient.baseQuantityUnit))
            dispatch(setIngredientInvalidUpc(ingredient.upc))
            return
        }
        if (!isChanged()) {
            history.push("/materials/ingredients/" + id);

        } else if (ingredient.id) {
            dispatch(
                editIngredient({
                    id: ingredient.id,
                    form: {
                        name: ingredient.name.trim(),
                        description: ingredient.description,
                        categoryId: ingredient.category.id,
                        baseQuantityUnit: ingredient.baseQuantityUnit,
                        upc: ingredient.upc,
                        imageSrc: "https://media.giphy.com/media/13raYVIdU3Zu48/giphy.gif?cid=ecf05e47f0oz1g60305stwichysuopch345osbr07wf33sb0&rid=giphy.gif&ct=g",
                        version: ingredient.version
                    }
                })
            );
        } else {
            dispatch(
                saveIngredient({
                    form: {
                        name: ingredient.name.trim(),
                        description: ingredient.description,
                        categoryId: ingredient.category.id,
                        baseQuantityUnit: ingredient.baseQuantityUnit,
                        imageSrc: "https://media.giphy.com/media/13raYVIdU3Zu48/giphy.gif?cid=ecf05e47f0oz1g60305stwichysuopch345osbr07wf33sb0&rid=giphy.gif&ct=g",
                        upc: ingredient.upc
                    }
                })
            );
        }
    }

    function onDelete() {
        setShowDeletePrompt(!!ingredient.id);
    }

    return (
        <React.Fragment>
            <DeleteGuard
                when={showDeletePrompt}
                confirm={() => {
                    dispatch(deleteIngredient(ingredient.id));
                    setShowRouterPrompt(false);
                }}
                close={() => {
                    setShowDeletePrompt(false);
                }}
                content="This cannot be undone. Are you sure want to delete this ingredient?"
            />
            <RouteLeavingGuard
                when={showRouterPrompt}
                navigate={path => {
                    history.push(path);
                }}
                shouldBlockNavigation={() => editMode && isChanged()}
                content="There are unsaved changes. Are you sure want to leave this page?"
            />
            <IngredientInner {...{editable, changed, onSave, onDelete}} />
        </React.Fragment>
    );
}