import AxiosInstance from "../../helpers/axiosInstance";

async function fetchRawMaterials(params = {}) {
    const data = {
        params: {
            page: params.pageIndex || 0,
            size: params.pageSize || 500,
            aggr_fn: "SUM",
            group_by: "MATERIAL",
            material_ids: params.materialId,
            sort: params.sort || "material.name",
            order_asc: !params.order || params.order === "asc"
        }
    };
    if (params.materialId) {
        data.params.material_ids = parseInt(params.materialId);
    }
    return await AxiosInstance.get("/api/v1/inventory/stock/quantity", data)
        .then((r) => r)
        .catch((error) => console.log(error));
}

export const api = {
    fetchRawMaterials
}