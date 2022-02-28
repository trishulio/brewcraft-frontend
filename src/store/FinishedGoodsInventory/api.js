import AxiosInstance from "../../helpers/axiosInstance";

async function fetchFinishedGoodsInventoryAggregation(params = {}) {
    const data = {
        params: {
            sku_ids: params.skuIds,
            aggr_fn: "SUM",
            group_by: params.groupBy,
            page: params.pageIndex || 0,
            size: params.pageSize || 500,
            sort: params.sort || "id",
            order_asc: !params.order || params.order === "asc",
        },
    };
    return await AxiosInstance.get(
        "/api/v1/inventory/finished-goods/stock/quantity",
        data
    ).then((r) => r);
}

async function fetchFinishedGoodsInventory(params = {}) {
    const data = {
        params: {
            sku_ids: params.skuIds,
            page: params.pageIndex || 0,
            size: params.pageSize || 500,
            sort: params.sort || "id",
            order_asc: !params.order || params.order === "asc",
        },
    };
    return await AxiosInstance.get(
        "/api/v1/inventory/finished-goods/stock",
        data
    ).then((r) => r);
}

export const api = {
    fetchFinishedGoodsInventoryAggregation:
        fetchFinishedGoodsInventoryAggregation,
    fetchFinishedGoodsInventory: fetchFinishedGoodsInventory,
};
