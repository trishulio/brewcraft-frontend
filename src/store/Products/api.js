import AxiosInstance from "../../helpers/axiosInstance";

async function fetchProducts(params) {
    const data = {
        params: {
            page: params.pageIndex || 0,
            size: params.pageSize || 100,
            category_ids: params.categoryId,
            sort: params.name || "name",
            order_asc: !params.order || params.order === "asc",
        },
    };
    if (params.categoryId) {
        data.params.category_ids = params.categoryId;
    }
    return await AxiosInstance.get("/api/v1/products", data).then((r) => r);
}

export const api = {
    fetchProducts,
};
