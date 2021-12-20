import AxiosInstance from "../../helpers/axiosInstance";

async function fetchProcurementsQuantity(params = {}) {
    const data = {
        params: {
            page: params.pageIndex || 0,
            size: params.pageSize || 500,
            sort: params.sort || "material.name",
            order_asc: !params.order || params.order === "asc",
        },
    };
    return await AxiosInstance.get(
        "/api/v1/inventory/procurements/quantity",
        data
    ).then((r) => r);
}

async function fetchStockQuantity(params = {}) {
    const data = {
        params: {
            page: params.pageIndex || 0,
            size: params.pageSize || 5000,
            aggr_fn: "SUM",
            group_by: "LOT_NUMBER,MATERIAL",
            material_ids: params.materialId,
            sort: "", // params.sort || "material.name",
            order_asc: !params.order || params.order === "asc",
        },
    };
    return await AxiosInstance.get(
        "/api/v1/inventory/stock/quantity",
        data
    ).then((r) => r);
}

export const api = {
    fetchProcurementsQuantity,
    fetchStockQuantity,
};
