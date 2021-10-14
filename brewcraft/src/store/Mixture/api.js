import AxiosInstance from "../../helpers/axiosInstance";

async function fetchMixtureById(id) {
    return await AxiosInstance.get(`/api/v1/brews/mixtures/${id}`)
    .then((r) => r)
}

async function addMixture(payload) {
    return await AxiosInstance.post("/api/v1/brews/mixtures", payload)
    .then((r) => r)
}

async function updateMixture(id, payload) {
    return await AxiosInstance.patch(`/api/v1/brews/mixtures/${id}`, payload)
    .then((r) => r)
}

async function deleteMixture(id) {
    return await AxiosInstance.delete(`/api/v1/brews/mixtures/${id}`)
    .then((r) => r)
}

export const api = {
    fetchMixtureById,
    addMixture,
    updateMixture,
    deleteMixture
};