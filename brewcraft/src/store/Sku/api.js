import AxiosInstance from "../../helpers/axiosInstance";

async function fetchSkuById(id) {
    return await AxiosInstance.get(`/api/v1/skus/${id}`)
        .then((r) => r)
        .catch(() => {});
}

async function postSku(data) {
    return await AxiosInstance.post("/api/v1/skus", data)
    .then((r) => r);
}
async function patchSku(id, data) {
    return await AxiosInstance.patch(`/api/v1/skus/${id}`, data)
    .then((r) => r);
}

async function deleteSku(id) {
    return await AxiosInstance.delete(`/api/v1/skus/${id}`);
}

export const api = {
    fetchSkuById,
    postSku,
    patchSku,
    deleteSku
};
