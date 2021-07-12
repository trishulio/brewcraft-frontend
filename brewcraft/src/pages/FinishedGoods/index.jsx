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
        fetch();
        dispatch(fetchAllProducts());
    }, []);

    function fetch() {
        dispatch(
            fetchFinishedGoods({ pageIndex, pageSize })
        );
    }

    return (
        <FinishedGoodsInner fetchPage={fetch} />
    );
}