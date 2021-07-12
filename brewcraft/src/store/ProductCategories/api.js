import AxiosInstance from "../../helpers/axiosInstance";

async function fetchProductCategories(params) {
    const data = {
        params: {
            page: params.pageIndex || 0,
            size: params.pageSize || 500,
        }
    };
    if (params.parentCategoryId) {
        data.params.parent_category_ids = params.parentCategoryId
    }
    return await AxiosInstance.get("/api/v1/products/categories", data)
        .then((r) => r)
        .catch(() => {});
}

export const api = {
    fetchProductCategories
};
