import AxiosInstance from "../../helpers/axiosInstance";

async function fetchFinishedGoods(params = {}) {
    const data = {
        params: {
            exclude_ids: params?.exclude_ids,
            sku_ids: params?.skuIds,
            brew_ids: params.brewIds,
            brew_stage_ids: params.stageId,
            mixture_ids: params.mixtureId,
            product_ids: params?.productIds,
            brew_batch_ids: params?.batchIds,
            page: params.pageIndex || 0,
            size: params.pageSize || 500,
            sort: "packagedOn",
            order_asc: true,
        },
    };
    return await AxiosInstance.get("/api/v1/finished-goods", data);
}

async function postFinishedGoods(data) {
    return await AxiosInstance.post("/api/v1/finished-goods", data);
}

async function updateFinishedGoods(finishedGoods) {
    return await AxiosInstance.put(
        "/api/v1/finished-goods",
        finishedGoods.map((fg) => ({
            id: fg.id,
            skuId: fg.sku.id,
            mixturePortions: fg.mixturePortions.map((mp) => ({
                id: mp.id,
                mixtureId: mp.mixture.id,
                quantity: mp.quantity,
                version: mp.version,
            })),
            materialPortions: fg.materialPortions.map((mp) => ({
                id: mp.id,
                materialLotId: mp.materialLot.id,
                quantity: mp.quantity,
                addedAt: mp.addedAt,
                version: mp.version,
            })),
            finishedGoodLotPortions: fg.finishedGoodLotPortions.map((lp) => ({
                id: lp.id,
                finishedGoodLotId: lp.id,
                quantity: lp.quantity,
                version: lp.version,
            })),
            quantity: fg.quantity,
            packagedOn: fg.packagedOn,
            version: fg.version,
        }))
    );
}

async function deleteFinishedGoods(ids) {
    return await AxiosInstance.delete("/api/v1/finished-goods", {
        params: {
            ids: ids.toString(),
        },
    });
}

export const api = {
    fetchFinishedGoods,
    postFinishedGoods,
    updateFinishedGoods,
    deleteFinishedGoods,
};
