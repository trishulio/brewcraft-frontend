import AxiosInstance from "../../helpers/axiosInstance";

async function fetchMaterialPortions({ batchId }) {
    const data = {
        params: {
            brew_ids: batchId,
            page: 0,
            size: 5000,
            // sort: "materialLot.invoiceItem.material.name",
            // order_asc: true,
        },
    };
    return await AxiosInstance.get("/api/v1/brews/mixtures/portions", data);
}

async function updateMaterialPortions(materialPortions) {
    return await AxiosInstance.put(
        "/api/v1/brews/mixtures/portions",
        materialPortions.map((mp) => ({
            id: mp.id,
            materialLotId: mp.materialLot.id,
            quantity: mp.quantity,
            mixtureId: mp.mixture.id,
            addedAt: mp.addedAt,
            version: mp.version,
        }))
    );
}

async function deleteMaterialPortions(ids) {
    return await AxiosInstance.delete(`/api/v1/brews/mixtures/portions`, {
        params: { ids: ids.toString() },
    });
}

export const api = {
    fetchMaterialPortions,
    updateMaterialPortions,
    deleteMaterialPortions,
};
