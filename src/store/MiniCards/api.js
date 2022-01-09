import AxiosInstance from "../../helpers/axiosInstance";

async function fetchBrewsMixtures(params) {
    const data = {
        params: {
            brew_ids: params.brewIds?.toString(),
            brew_stage_status_ids: params.stageStatusIds?.toString(),
            brew_stage_task_ids: params.stafeTaskIds?.toString(),
            page: params.page || 0,
            size: params.size || 500,
            sort: params.sort || "brewStage.task.id",
            order_asc: true,
        },
    };
    return await AxiosInstance.get("/api/v1/brews/mixtures", data).then(
        (r) => r
    );
}

export const api = {
    fetchBrewsMixtures,
};
