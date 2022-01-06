import AxiosInstance from "../../helpers/axiosInstance";

async function fetchFinishedGoods(params) {
    const data = {
        params: {
            exclude_ids: params?.exclude_ids,
            sku_ids: params?.skud_ids,
            brew_ids: params.brewId,
            brew_stage_ids: params.stageId,
            mixture_ids: params.mixtureId,
            page: params.pageIndex || 0,
            size: params.pageSize || 500,
            sort: "sku.id",
            order_asc: true,
        },
    };
    return await AxiosInstance.get("/api/v1/finished-goods", data).then(
        (r) => r
    );
}

async function postFinishedGoods(data) {
    return await AxiosInstance.post("/api/v1/finished-goods", data).then(
        (r) => r
    );
}

export const api = {
    fetchFinishedGoods,
    postFinishedGoods,
};
