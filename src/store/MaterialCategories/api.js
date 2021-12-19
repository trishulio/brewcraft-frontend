import AxiosInstance from "../../helpers/axiosInstance";

async function fetchMaterialCategories(params = {}) {
    const data = {
        params: {
            page: params.pageIndex || 0,
            size: params.pageSize || 500,
            parentCategoryIds: params.parentCategoryId,
            sort: params.sort || "name",
            order_asc: !params.order || params.order === "asc",
        },
    };
    return await AxiosInstance.get("/api/v1/materials/categories", data)
        .then((r) => r)
        .catch((error) => console.log(error));
}

async function fetchCategories() {
    return await fetchMaterialCategories(null);
}

export const api = {
    fetchMaterialCategories,
    fetchCategories,
};
