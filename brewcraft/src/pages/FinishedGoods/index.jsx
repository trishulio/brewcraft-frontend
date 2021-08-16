import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setBreadcrumbItems,
    fetchFinishedGoods,
    fetchAllProducts
} from "../../store/actions";
import FinishedGoodsInner from "./finished-goods";

export default function FinshedGoods() {
    const dispatch = useDispatch();

    const { pageIndex, pageSize } = useSelector(state => {
        return state.FinishedGoods;
    });

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Finished Goods", [
                { title: "Main", link: "#" },
                { title: "Batches", link: "#" },
            ])
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(fetchFinishedGoods({ pageIndex, pageSize }));
        dispatch(fetchAllProducts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize]);

    return (
        <FinishedGoodsInner />
    );
}