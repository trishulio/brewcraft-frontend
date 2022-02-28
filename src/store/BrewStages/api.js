import AxiosInstance from "../../helpers/axiosInstance";

async function fetchBrewStages(brewId) {
    const data = {
        params: {
            page: 0,
            size: 500,
            brew_ids: brewId,
            sort: "id",
            order_asc: true,
            // sort: params.sort || "name",
            // order_asc: !params.order || params.order === "asc"
        },
    };
    return await AxiosInstance.get(`/api/v1/brews/stages`, data).then((r) => r);
}

async function fetchBrewStageById(id) {
    return await AxiosInstance.get(`/api/v1/brews/stages/${id}`).then((r) => r);
}

async function addBrewStage(payload) {
    return await AxiosInstance.post("/api/v1/brews/stages", payload).then(
        (r) => r
    );
}

async function addMixture(params) {
    return await AxiosInstance.post("/api/v1/brews/mixtures", params).then(
        (r) => r
    );
}

async function updateBrewStage(id, payload) {
    return await AxiosInstance.patch(
        `/api/v1/brews/stages/${id}`,
        payload
    ).then((r) => r);
}

async function deleteBrewStage(id) {
    return await AxiosInstance.delete(`/api/v1/brews/stages/${id}`).then(
        (r) => r
    );
}

async function deleteBrewMixture(id) {
    return await AxiosInstance.delete(`/api/v1/brews/mixtures/${id}`).then(
        (r) => r
    );
}

export const api = {
    fetchBrewStages,
    fetchBrewStageById,
    addBrewStage,
    addMixture,
    updateBrewStage,
    deleteBrewStage,
    deleteBrewMixture,
};
