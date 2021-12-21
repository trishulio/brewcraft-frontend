import AxiosInstance from "../../helpers/axiosInstance";

async function fetchBatchById(id) {
    return await AxiosInstance.get(`/api/v1/brews/${id}`).then((r) => r);
}

async function addBatch(payload) {
    return await AxiosInstance.post("/api/v1/brews", payload).then((r) => r);
}

async function addBrewStage(payload) {
    return await AxiosInstance.post("/api/v1/brews/stages", payload).then(
        (r) => r
    );
}

async function addMixture(params) {
    return await AxiosInstance.post("/api/v1/brews/mixtures", params).then(
        (r) => r
    );
}

async function updateBatch(id, payload) {
    return await AxiosInstance.patch(`/api/v1/brews/${id}`, payload).then(
        (r) => r
    );
}

async function deleteBatch(id) {
    return await AxiosInstance.delete(`/api/v1/brews/${id}`).then((r) => r);
}

export const api = {
    fetchBatchById,
    addBatch,
    addBrewStage,
    addMixture,
    updateBatch,
    deleteBatch,
};
