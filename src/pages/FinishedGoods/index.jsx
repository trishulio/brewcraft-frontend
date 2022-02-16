import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "../../helpers/utils";
import {
    setBreadcrumbItems,
    fetchFinishedGoodsInventory,
    fetchAllProducts,
    fetchAllSkus,
    fetchAllBatches,
    resetFinishedGoodsInventory,
} from "../../store/actions";
import FinishedGoodsInner from "./finished-goods";

export default function FinshedGoods() {
    const dispatch = useDispatch();
    const query = useQuery();
    const skuIds = query.get("sku_ids");
    const productIds = query.get("product_ids");
    const brewBatchIds = query.get("brew_batch_ids");
    const sort = query.get("sort");
    const order = query.get("order");

    const { pageIndex, pageSize } = useSelector((state) => {
        return state.FinishedGoodsInventory;
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
        const props = {
            pageIndex,
            pageSize,
            skuIds,
            productIds,
            brewBatchIds,
            sort,
            order,
        };
        dispatch(resetFinishedGoodsInventory());
        dispatch(fetchFinishedGoodsInventory({ ...props }));
        dispatch(fetchAllSkus());
        dispatch(fetchAllProducts());
        dispatch(fetchAllBatches());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, skuIds, productIds, brewBatchIds, sort, order]);

    return <FinishedGoodsInner />;
}
