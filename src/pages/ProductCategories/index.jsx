import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "../../helpers/utils";
import {
    fetchProductCategories,
    setBreadcrumbItems
} from "../../store/actions";
import ProductCategoriesInner from "./categories";

export default function ProductCategories() {
    const dispatch = useDispatch();
    const query = useQuery();
    const parentCategoryId = query.get("parent");
    const sort = query.get("sort");
    const order = query.get("order");

    const { pageIndex, pageSize } = useSelector(state => {
        return state.ProductCategories;
    });

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Product Categories", [
                { title: "Main", link: "#" },
                { title: "Products", link: "/products" }
            ])
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const props = {
            pageIndex, pageSize, parentCategoryId, sort, order
        };
        dispatch(fetchProductCategories({ ...props }));
        // dispatch(fetchAllProductCategories());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, parentCategoryId, sort, order]);

    return (
        <ProductCategoriesInner />
    );
}