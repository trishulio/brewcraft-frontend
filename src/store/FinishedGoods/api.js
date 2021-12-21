import AxiosInstance from "../../helpers/axiosInstance";

async function fetchFinishedGoods(params) {
    const data = {
        params: {
            exclude_ids: params?.exclude_ids,
            sku_ids: params?.skud_ids,
            sort: "sku.id",
            order_asc: true,
            page: 0,
            size: 500,
        },
    };
    return await AxiosInstance.get("/api/v1/finished-goods", data).then(
        (r) => r
    );
}

export const api = {
    fetchFinishedGoods,
};
