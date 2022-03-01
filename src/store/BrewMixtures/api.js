import AxiosInstance from "../../helpers/axiosInstance";

async function fetchMixtureById(id) {
    return await AxiosInstance.get(`/api/v1/brews/mixtures/${id}`).then(
        (r) => r
    );
}

async function fetchMixturesByBrewId(id) {
    const data = {
        params: {
            brew_ids: id,
            page: 0,
            size: 500,
            sort: "id",
            order_asc: true,
        },
    };
    return await AxiosInstance.get("/api/v1/brews/mixtures", data).then(
        (r) => r
    );
}

async function fetchMaterialPortionsByMixtureId(id) {
    const data = {
        params: {
            mixture: id,
            page: 0,
            size: 500,
            sort: "id",
            order_asc: true,
        },
    };
    return await AxiosInstance.get(
        "/api/v1/brews/mixtures/portions",
        data
    ).then((r) => r);
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

async function addMixture(params) {
    return await AxiosInstance.post("/api/v1/brews/mixtures", params).then(
        (r) => r
    );
}

async function updateMixture(id, payload) {
    return await AxiosInstance.patch(
        `/api/v1/brews/mixtures/${id}`,
        payload
    ).then((r) => r);
}

async function deleteMixture(id) {
    return await AxiosInstance.delete(`/api/v1/brews/mixtures/${id}`).then(
        (r) => r
    );
}

export const api = {
    fetchMixtureById,
    fetchMixturesByBrewId,
    fetchMaterialPortionsByMixtureId,
    fetchMixtureRecordingsByMixtureId,
    addMixture,
    updateMixture,
    deleteMixture,
};
