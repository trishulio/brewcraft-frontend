import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "../../helpers/utils";
import {
    setBreadcrumbItems,
    fetchAllProducts,
    fetchSkus
} from "../../store/actions";
import SkusInner from "./skus";

export default function Skus() {
    const dispatch = useDispatch();

    const query = useQuery();
    const sort = query.get("sort");
    const order = query.get("order");

    const { pageIndex, pageSize } = useSelector(state => {
        return state.Skus;
    });

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("SKU", [
                { title: "Main", link: "#" },
                { title: "Products", link: "#" },
            ])
        );
    }, [dispatch]);

    useEffect(() => {
        const params = {
            pageIndex, pageSize, sort, order
        };
        dispatch(fetchSkus(params));
        dispatch(fetchAllProducts());
    }, [
        pageIndex,
        pageSize,
        order,
        sort,
        dispatch
    ]);

    return (
        <SkusInner />
    );
}