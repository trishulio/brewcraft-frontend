import AxiosInstance from "../../helpers/axiosInstance";

async function fetchProductCategoryById(id) {
    return await AxiosInstance.get(`/api/v1/products/categories/${id}`)
        .then((r) => r)
        .catch(() => {});
}

async function postProductCategory(data) {
    return await AxiosInstance.post("/api/v1/products/categories", data)
    .then((r) => r);
}
async function patchProductCategory(id, data) {
    return await AxiosInstance.patch(`/api/v1/products/categories/${id}`, data)
    .then((r) => r);
}

async function deleteProductCategory(id) {
    return await AxiosInstance.delete(`/api/v1/products/categories/${id}`);
}

export const api = {
    fetchProductCategoryById,
    postProductCategory,
    patchProductCategory,
    deleteProductCategory
};
