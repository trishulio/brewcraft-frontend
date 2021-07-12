import AxiosInstance from "../../helpers/axiosInstance";

async function fetchProductById(id) {
    return await AxiosInstance.get(`/api/v1/products/${id}`)
        .then((r) => r)
        .catch(() => {});
}

async function postProduct(data) {
    return await AxiosInstance.post("/api/v1/products", data)
    .then((r) => r);
}
async function patchProduct(id, data) {
    return await AxiosInstance.patch(`/api/v1/products/${id}`, data)
    .then((r) => r);
}

async function deleteProduct(id) {
    return await AxiosInstance.delete(`/api/v1/products/${id}`);
}

export const api = {
    fetchProductById,
    postProduct,
    patchProduct,
    deleteProduct
};
