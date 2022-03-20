import AxiosInstance from "../../helpers/axiosInstance";

async function fetchMixtureRecordings({ batchId }) {
    const data = {
        params: {
            brew_ids: batchId,
            page: 0,
            size: 500,
            sort: "id",
            order_asc: true,
        },
    };
    return await AxiosInstance.get("/api/v1/mixtures/recordings", data);
}

async function addMixtureRecordings(payload) {
    return await AxiosInstance.post("/api/v1/mixtures/recordings", payload);
}

async function updateMixtureRecordings(payload) {
    return await AxiosInstance.put("/api/v1/mixtures/recordings", payload);
}

async function deleteMixtureRecording(ids) {
    return await AxiosInstance.delete("/api/v1/mixtures/recordings", {
        params: { ids: ids.toString() },
    });
}

export const api = {
    fetchMixtureRecordings,
    addMixtureRecordings,
    updateMixtureRecordings,
    deleteMixtureRecording,
};
