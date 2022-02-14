import AxiosInstance from "../../helpers/axiosInstance";

async function fetchMixtures(params = {}) {
    const data = {
        params: {
            brew_ids: params.brewIds,
            stage_task_ids: params.stageTaskIds,
            page: params.pageIndex || 0,
            size: params.pageSize || 500,
            sort: params.sort || "id",
            order_asc: !params.order || params.order === "asc",
        },
    };
    return await AxiosInstance.get("/api/v1/brews/mixtures", data).then(
        (r) => r
    );
}

export const api = {
    fetchMixtures,
};
