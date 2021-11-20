import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "../../helpers/utils";
import {
    fetchProductsByCategory,
    setBreadcrumbItems,
    fetchAllProductCategories
} from "../../store/actions";
import ProductsInner from "./products";

export default function Products() {
    const dispatch = useDispatch();
    const query = useQuery();
    const productClass = query.get("class");
    const type = query.get("type");
    const style = query.get("style");
    const sort = query.get("sort");
    const order = query.get("order");

    const { pageIndex, pageSize } = useSelector(state => {
        return state.Products;
    });

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Products", [
                { title: "Main", link: "#" },
                { title: "Products", link: "#" }
            ]),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const categoryId = style || type || productClass;
        const props = {
            pageIndex, pageSize, categoryId, type, style, sort, order
        };
        dispatch(fetchProductsByCategory({ ...props }));
        dispatch(fetchAllProductCategories());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, productClass, type, style, sort, order]);

    return (
        <ProductsInner />
    );
}