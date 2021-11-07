import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setBreadcrumbItems,
    fetchAllSkus,
    fetchAllProducts
} from "../../store/actions";
import SkusInner from "./skus";

export default function Skus() {
    const dispatch = useDispatch();

    const { pageIndex, pageSize } = useSelector(state => {
        return state.FinishedGoods;
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
        dispatch(fetchAllSkus({ pageIndex, pageSize }));
        dispatch(fetchAllProducts());
    }, [pageIndex, pageSize, dispatch]);

    return (
        <SkusInner />
    );
}