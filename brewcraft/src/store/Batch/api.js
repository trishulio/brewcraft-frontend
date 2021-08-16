import AxiosInstance from "../../helpers/axiosInstance";

async function fetchBatchById(id) {
    return await AxiosInstance.get(`/api/v1/brews/${id}`)
        .then((r) => r)
}

async function addBatch(payload) {
    return await AxiosInstance.post("/api/v1/brews", payload)
        .then((r) => r)
}

async function updateBatch(id, payload) {
    return await AxiosInstance.put(`/api/v1/brews/${id}`, payload)
        .then((r) => r)
}

async function deleteBatch(id) {
    return await AxiosInstance.delete(`/api/v1/brews/${id}`)
        .then((r) => r)
}

export const api = {
    fetchBatchById,
    addBatch,
    updateBatch,
    deleteBatch
};