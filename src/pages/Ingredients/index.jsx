import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "../../helpers/utils";
import {
    fetchIngredients,
    setBreadcrumbItems,
    fetchAllMaterialCategories
} from "../../store/actions";
import IngredientsInner from "./ingredients";

export default function Ingredients() {
    const dispatch = useDispatch();
    const query = useQuery();
    const parentCategoryId = query.get("category");
    const sort = query.get("sort");
    const order = query.get("order");

    const ingredients = useSelector(state => {
        return state.Ingredients.content;
    });

    const { pageIndex, pageSize } = useSelector(state => {
        return state.Ingredients;
    });

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Ingredients", [
                { title: "Main", link: "#" },
                { title: "Materials", link: "#" }
            ])
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const props = {
            pageIndex, pageSize, parentCategoryId, sort, order
        };
        dispatch(fetchIngredients({ ...props }));
        dispatch(fetchAllMaterialCategories());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, parentCategoryId, sort, order]);

    return (
        <IngredientsInner
            ingredients={ingredients}
        />
    );
}