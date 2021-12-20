import AxiosInstance from "../../helpers/axiosInstance";

async function fetchMixturePortionById(id) {
    return await AxiosInstance.get(`/api/v1/mixtures/recordings/${id}`).then(
        (r) => r
    );
}

async function fetchMixturePortionByBrewId(id) {
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

async function fetchMixturePortionsByMixtureId(id) {
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

async function addMixturePortion(payload) {
    return await AxiosInstance.post(
        "/api/v1/mixtures/recordings",
        payload
    ).then((r) => r);
}

async function updateMixturePortion(id, payload) {
    return await AxiosInstance.patch(
        `/api/v1/mixtures/recordings/${id}`,
        payload
    ).then((r) => r);
}

async function deleteMixturePortion(id) {
    return await AxiosInstance.delete(`/api/v1/mixtures/recordings/${id}`).then(
        (r) => r
    );
}

export const api = {
    fetchMixturePortionById,
    fetchMixturePortionByBrewId,
    fetchMixturePortionsByMixtureId,
    addMixturePortion,
    updateMixturePortion,
    deleteMixturePortion,
};
