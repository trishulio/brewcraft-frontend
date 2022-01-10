import AxiosInstance from "../../helpers/axiosInstance";

async function fetchMixtureRecordingById(id) {
    return await AxiosInstance.get(`/api/v1/mixtures/recordings/${id}`).then(
        (r) => r
    );
}

async function fetchMixtureRecordingByBrewId(id) {
    const data = {
        params: {
            brew_ids: id,
            page: 0,
            size: 500,
            sort: "id",
            order_asc: true,
        },
    };
    return await AxiosInstance.get("/api/v1/mixtures/recordings", data).then(
        (r) => r
    );
}

async function fetchMixtureRecordingsByMixtureId(id) {
    const data = {
        params: {
            mixture_ids: id,
            page: 0,
            size: 500,
            sort: "id",
            order_asc: true,
        },
    };
    return await AxiosInstance.get("/api/v1/mixtures/recordings", data).then(
        (r) => r
    );
}

async function addMixtureRecording(payload) {
    return await AxiosInstance.post(
        "/api/v1/mixtures/recordings",
        payload
    ).then((r) => r);
}

async function updateMixtureRecording(payload) {
    return await AxiosInstance.put("/api/v1/mixtures/recordings", payload).then(
        (r) => r
    );
}

async function deleteMixtureRecording(ids) {
    return await AxiosInstance.delete("/api/v1/mixtures/recordings", {
        params: { ids: ids.toString() },
    }).then((r) => r);
}

export const api = {
    fetchMixtureRecordingById,
    fetchMixtureRecordingByBrewId,
    fetchMixtureRecordingsByMixtureId,
    addMixtureRecording,
    updateMixtureRecording,
    deleteMixtureRecording,
};
