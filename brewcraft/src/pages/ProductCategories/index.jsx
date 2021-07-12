import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchProductCategories,
    fetchAllProductCategories,
    setBreadcrumbItems
} from "../../store/actions";
import ProductCategoriesInner from "./categories";

export default function ProductCategories() {
    const dispatch = useDispatch();

    const categories = useSelector(state => {
        return state.ProductCategories.content;
    });

    const { pageIndex, pageSize } = useSelector(state => {
        return state.ProductCategories;
    });

    const { selectedClass, selectedType, selectedStyle } = useSelector(state => {
        return state.ProductCategories;
    });

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Product Categories", [
                { title: "Main", link: "#" },
                { title: "Products", link: "#" }
            ])
        );
        fetchPage();
    }, []);

    useEffect(() => {
        dispatch(fetchAllProductCategories());
    }, [categories]);

    useEffect(() => {
        fetchPage();
    }, [selectedClass, selectedType, selectedStyle]);

    function fetchPage() {
        const props = {
            pageIndex, pageSize
        };

        if (selectedStyle) {
            props.parentCategoryId = selectedStyle.id;
        } else if (selectedType) {
            props.parentCategoryId = selectedType.id;
        } else if (selectedClass) {
            props.parentCategoryId = selectedClass.id;
        }

        dispatch(fetchProductCategories({ ...props }))
    }

    return (
        <ProductCategoriesInner
            categories={categories} fetchPage={fetchPage}
        />
    );
}