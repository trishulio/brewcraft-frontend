import AxiosInstance from "../../helpers/axiosInstance";

async function fetchMixtureRecordingById(id) {
    return await AxiosInstance.get(`/api/v1/mixtures/recordings/${id}`)
        .then((r) => r)
}

async function fetchMixtureRecordingsByMixtureId(id) {
    const data = {
        params: {
            mixture_ids: id,
            page: 0,
            size: 500,
            sort: "id",
            order_asc: true
        }
    };
    return await AxiosInstance.get("/api/v1/mixtures/recordings", data)
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
    fetchMixtureRecordingsByMixtureId,
    addMixtureRecording,
    updateMixtureRecording,
    deleteMixtureRecording
};