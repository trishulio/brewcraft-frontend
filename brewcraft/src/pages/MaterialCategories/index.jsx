import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchMaterialCategories,
    fetchAllMaterialCategories,
    setBreadcrumbItems
} from "../../store/actions";
import MaterialCategoriesInner from "./categories";

export default function MaterialCategories() {
    const dispatch = useDispatch();

    const categories = useSelector(state => {
        return state.MaterialCategories.content;
    });

    const { pageIndex, pageSize, selectedCategory } = useSelector(state => {
        return state.MaterialCategories;
    });

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Material Categories", [
                { title: "Main", link: "#" },
                { title: "Materials", link: "#" }
            ])
        );
        fetchPage();
    }, []);

    useEffect(() => {
        dispatch(fetchAllMaterialCategories());

    }, [categories]);

    useEffect(() => {
        fetchPage();

    }, [selectedCategory]);

    function fetchPage() {
        const props = {
            pageIndex, pageSize, parentCategoryId: selectedCategory.id
        };
        dispatch(fetchMaterialCategories({ ...props }))
    }

    return (
        <MaterialCategoriesInner
            categories={categories} fetchPage={fetchPage}
        />
    );
}