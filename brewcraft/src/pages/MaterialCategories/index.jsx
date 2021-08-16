import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "../../helpers/utils";
import {
    fetchMaterialCategories,
    fetchAllMaterialCategories,
    setBreadcrumbItems
} from "../../store/actions";
import MaterialCategoriesInner from "./categories";

export default function MaterialCategories() {
    const dispatch = useDispatch();
    const query = useQuery();
    const parentCategoryId = query.get("category");
    const sort = query.get("sort");
    const order = query.get("order");

    const categories = useSelector(state => {
        return state.MaterialCategories.content;
    });

    const { pageIndex, pageSize } = useSelector(state => {
        return state.MaterialCategories;
    });

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Material Categories", [
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
        dispatch(fetchMaterialCategories({ ...props }))
        dispatch(fetchAllMaterialCategories());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, parentCategoryId, sort, order]);

    return (
        <MaterialCategoriesInner
            categories={categories}
        />
    );
}