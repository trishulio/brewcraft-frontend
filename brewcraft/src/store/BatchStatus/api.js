import AxiosInstance from "../../helpers/axiosInstance";

async function fetchBatchStatuses(params = {}) {
    const data = {
        params: {
            ids: params.ids,
            names: params.names,
            sort: params.sort,
            order_asc: params.sort ? !params.order || params.order === "asc" : undefined,
            page: params.pageIndex || 0,
            size: params.pageSize || 50
        }
    };
    return await AxiosInstance.get("/api/v1/brews/stages/statuses", data)
        .then((r) => r)
        .catch((error) => console.log(error));
}

export const api = {
    fetchBatchStatuses
}