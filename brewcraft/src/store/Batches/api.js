import AxiosInstance from "../../helpers/axiosInstance";

async function fetchBatches(params = {}) {
    let batchTo;
    if (params.batchTo) {
        // include last day in filter parameter
        batchTo = new Date(params.batchTo);
        batchTo.setDate(batchTo.getDate() + 1);
    }
    const data = {
        params: {
            page: params.pageIndex || 0,
            size: params.pageSize || 500,
            product_ids: params.product,
            stage_task_ids: params.stageTaskId,
            started_at_from: params.batchFrom ? new Date(params.batchFrom).toISOString() : undefined,
            started_at_to: batchTo ? new Date(batchTo).toISOString() : undefined,
            // ended_at_from: params.endedFrom,
            // ended_at_to: params.endedTo,
            sort: params.sort,
            order_asc: params.sort ? !params.order || params.order === "asc" : undefined
        }
    };
    return await AxiosInstance.get("/api/v1/brews", data)
        .then((r) => r)
        .catch((error) => console.log(error));
}

export const api = {
    fetchBatches
}