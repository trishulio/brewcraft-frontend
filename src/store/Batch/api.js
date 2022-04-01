import AxiosInstance from "../../helpers/axiosInstance";

async function fetchBatch({ batchId }) {
    return await AxiosInstance.get(`/api/v1/brews/${batchId}`);
}

async function createBatch(payload) {
    return await AxiosInstance.post("/api/v1/brews", payload);
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
    fetchBatch,
    createBatch,
    updateBatch,
    deleteBatch,
};
