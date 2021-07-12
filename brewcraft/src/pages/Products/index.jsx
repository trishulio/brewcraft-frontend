import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    // fetchProducts,
    fetchProductsByCategory,
    setBreadcrumbItems,
    fetchAllProductCategories
} from "../../store/actions";
import ProductsInner from "./products";

export default function Products() {
    const dispatch = useDispatch();

    const products = useSelector(state => {
        return state.Products.content;
    });

    const { pageIndex, pageSize } = useSelector(state => {
        return state.Products;
    });

    const { selectedClass, selectedType, selectedStyle } = useSelector(state => {
        return state.Products;
    });

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Products", [
                { title: "Main", link: "#" },
                { title: "Products", link: "#" }
            ]),
        );
        fetchProducts();
        dispatch(fetchAllProductCategories());
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [selectedClass, selectedType, selectedStyle]);

    function fetchProducts() {
        const props = {
            pageIndex, pageSize
        };
        if (selectedStyle) {
            props.categoryId = selectedStyle.id;
        } else if (selectedType) {
            props.categoryId = selectedType.id;
        } else if (selectedClass) {
            props.categoryId = selectedClass.id;
        }

        dispatch(fetchProductsByCategory({ ...props }));
    }

    return (
        <ProductsInner
            fetchProducts={fetchProducts}
        />
    );
}