import AxiosInstance from "../../helpers/axiosInstance";

async function fetchBatches(params = {}) {
    const data = {
        params: {
            page: params.pageIndex || 0,
            size: params.pageSize || 500,
            product_ids: params.product,
            stage_task_ids: params.stageTaskId,
            started_at_from: params.batchFrom
                ? new Date(params.batchFrom).toISOString()
                : undefined,
            started_at_to: params.batchTo
                ? new Date(params.batchTo).toISOString()
                : undefined,
            ended_at_from: params.endedFrom
                ? new Date(params.endedFrom).toISOString()
                : undefined,
            ended_at_to: params.endedTo
                ? new Date(params.endedTo).toISOString()
                : undefined,
            sort: params.sort,
            order_asc: params.sort
                ? !params.order || params.order === "asc"
                : undefined,
        },
    };
    return await AxiosInstance.get("/api/v1/brews", data)
        .then((r) => r)
        .catch((error) => console.log(error));
}

export const api = {
    fetchBatches,
};
