import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchFinishedGoodsInventoryAggregation,
    fetchAllSkus,
    fetchAllProducts,
    resetFinishedGoodsInventory,
    setBreadcrumbItems,
} from "../../store/actions";
import { useQuery } from "../../helpers/utils";
import FinishedGoodsInventoryInner from "./finishedgoodsinventory";

export default function FinishedGoodsInventory() {
    const dispatch = useDispatch();
    const query = useQuery();
    const sort = query.get("sort") != null ? query.get("sort") : "sku.name";
    const order = query.get("order");
    const skuIds = query.get("sku_ids");
    const groupBy = "SKU";

    const { pageIndex, pageSize } = useSelector((state) => {
        return state.FinishedGoodsInventory;
    });

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Finished Goods Inventory", [
                { title: "Main", link: "#" },
                { title: "Finished Goods Inventory", link: "#" },
            ])
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const props = {
            skuIds,
            groupBy,
            pageIndex,
            pageSize,
            sort,
            order,
        };
        dispatch(resetFinishedGoodsInventory());
        dispatch(fetchFinishedGoodsInventoryAggregation({ ...props }));
        dispatch(fetchAllSkus());
        dispatch(fetchAllProducts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [skuIds, groupBy, pageIndex, pageSize, sort, order]);

    return <FinishedGoodsInventoryInner />;
}
