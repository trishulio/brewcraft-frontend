import AxiosInstance from "../../helpers/axiosInstance";

async function fetchBrewStages({ batchId }) {
    const data = {
        params: {
            page: 0,
            size: 500,
            brew_ids: batchId,
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

async function createBatchStages(params) {
    return await AxiosInstance.post("/api/v1/brews/stages", params);
}

async function updateBatchStage({
    id,
    brew,
    status,
    task,
    startedAt,
    endedAt,
    version,
}) {
    return await AxiosInstance.patch(`/api/v1/brews/stages/${id}`, {
        brewId: brew.id,
        statusId: status.id,
        taskId: task.id,
        startedAt,
        endedAt,
        version,
    });
}

async function deleteBrewStage(id) {
    return await AxiosInstance.delete(`/api/v1/brews/stages/${id}`).then(
        (r) => r
    );
}

export const api = {
    fetchBrewStages,
    fetchBrewStageById,
    createBatchStages,
    updateBatchStage,
    deleteBrewStage,
};
