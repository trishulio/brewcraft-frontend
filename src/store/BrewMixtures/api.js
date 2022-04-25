import AxiosInstance from "../../helpers/axiosInstance";

async function fetchMixtures(params) {
    const data = {
        params: {
            brew_ids: params.batchId,
            page: params.page || 0,
            size: params.size || 500,
            sort: params.sort || "id",
            order_asc: params.orderAsc || true,
        },
    };
    return await AxiosInstance.get("/api/v1/brews/mixtures", data);
}

async function createMixture({
    parentMixtureIds,
    quantity,
    equipment,
    brewStage,
}) {
    return await AxiosInstance.post("/api/v1/brews/mixtures", {
        parentMixtureIds,
        quantity,
        equipmentId: equipment?.id,
        brewStageId: brewStage.id,
    });
}

async function updateMixture({
    id,
    parentMixtureIds,
    quantity,
    equipment,
    brewStage,
    version,
}) {
    return await AxiosInstance.patch(`/api/v1/brews/mixtures/${id}`, {
        parentMixtureIds,
        quantity,
        equipmentId: equipment?.id,
        brewStageId: brewStage.id,
        version,
    });
}

async function deleteMixture(id) {
    return await AxiosInstance.delete(`/api/v1/brews/mixtures/${id}`);
}

export const api = {
    fetchMixtures,
    createMixture,
    updateMixture,
    deleteMixture,
};
