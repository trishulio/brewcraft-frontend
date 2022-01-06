import AxiosInstance from "../../helpers/axiosInstance";

async function fetchRawMaterials(params = {}) {
    const data = {
        params: {
            page: params.pageIndex || 0,
            size: params.pageSize || 500,
            aggr_fn: "SUM",
            group_by: "LOT_NUMBER",
            material_ids: params.materialId,
            sort: "", // params.sort || "material.name",
            order_asc: !params.order || params.order === "asc",
        },
    };
    if (params.materialId && params.materialId.length > 0) {
        data.params.material_ids = params.materialId;
    }
    if (params.category && params.category.length > 0) {
        data.params.material_category_ids = params.category;
    }
    return await AxiosInstance.get("/api/v1/inventory/stock/quantity", data)
        .then((r) => r)
        .catch((error) => console.log(error));
}

export const api = {
    fetchRawMaterials,
};
