import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchIngredients,
    setBreadcrumbItems,
    fetchAllMaterialCategories
} from "../../store/actions";
import IngredientsInner from "./ingredients";

export default function Ingredients() {
    const dispatch = useDispatch();

    const ingredients = useSelector(state => {
        return state.Ingredients.content;
    });

    const { pageIndex, pageSize, selectedCategory } = useSelector(state => {
        return state.Ingredients;
    });

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Ingredients", [
                { title: "Main", link: "#" },
                { title: "Materials", link: "#" }
            ])
        );
        fetchPage();
    }, []);

    useEffect(() => {
        dispatch(fetchAllMaterialCategories());

    }, [ingredients]);

    useEffect(() => {
        fetchPage();

    }, [selectedCategory]);

    function fetchPage() {
        const props = {
            pageIndex, pageSize, parentCategoryId: selectedCategory.id
        };
        dispatch(fetchIngredients({ ...props }));
    }

    return (
        <IngredientsInner
            ingredients={ingredients} fetchPage={fetchPage}
        />
    );
}