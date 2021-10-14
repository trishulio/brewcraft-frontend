import AxiosInstance from "../../helpers/axiosInstance";

async function fetchMaterialPortionById(id) {
    return await AxiosInstance.get(`/api/v1/brews/mixtures/portions/${id}`)
    .then((r) => r)
}

async function addMaterialPortion(payload) {
    return await AxiosInstance.post("/api/v1/brews/mixtures/portions", payload)
    .then((r) => r)
}

async function updateMaterialPortion(id, payload) {
    return await AxiosInstance.patch(`/api/v1/brews/mixtures/portions/${id}`, payload)
    .then((r) => r)
}

async function deleteMaterialPortion(id) {
    return await AxiosInstance.delete(`/api/v1/brews/mixtures/portions/${id}`)
    .then((r) => r)
}

export const api = {
    fetchMaterialPortionById,
    addMaterialPortion,
    updateMaterialPortion,
    deleteMaterialPortion
};