import AxiosInstance from "../../helpers/axiosInstance";

async function fetchBrewStageById(id) {
    return await AxiosInstance.get(`/api/v1/brews/stages/${id}`)
    .then((r) => r)
}

async function addBrewStage(payload) {
    return await AxiosInstance.post("/api/v1/brews/stages", payload)
    .then((r) => r)
}

async function updateBrewStage(id, payload) {
    return await AxiosInstance.patch(`/api/v1/brews/stages/${id}`, payload)
    .then((r) => r)
}

async function deleteBrewStage(id) {
    return await AxiosInstance.delete(`/api/v1/brews/stages/${id}`)
    .then((r) => r)
}

export const api = {
    fetchBrewStageById,
    addBrewStage,
    updateBrewStage,
    deleteBrewStage
};