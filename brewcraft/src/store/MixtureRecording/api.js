import AxiosInstance from "../../helpers/axiosInstance";

async function fetchMixtureRecordingById(id) {
    return await AxiosInstance.get(`/api/v1/mixtures/recordings/${id}`)
    .then((r) => r)
}

async function addMixtureRecording(payload) {
    return await AxiosInstance.post("/api/v1/mixtures/recordings", payload)
    .then((r) => r)
}

async function updateMixtureRecording(id, payload) {
    return await AxiosInstance.patch(`/api/v1/mixtures/recordings/${id}`, payload)
    .then((r) => r)
}

async function deleteMixtureRecording(id) {
    return await AxiosInstance.delete(`/api/v1/mixtures/recordings/${id}`)
    .then((r) => r)
}

export const api = {
    fetchMixtureRecordingById,
    addMixtureRecording,
    updateMixtureRecording,
    deleteMixtureRecording
};