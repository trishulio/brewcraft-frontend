import AxiosInstance from "../../helpers/axiosInstance";

async function fetchMaterialPortions({ batchId }) {
    const data = {
        params: {
            brew_ids: batchId,
            // group_by: "ID",
            page: 0,
            size: 5000,
            // sort: "materialLot.invoiceItem.material.name",
            // order_asc: true,
        },
    };
    return await AxiosInstance.get(
        "/api/v1/brews/mixtures/portions",
        data
    ).then((r) => r);
}

async function addMixtureMaterialPortions(payload) {
    return await AxiosInstance.post(
        "/api/v1/brews/mixtures/portions",
        payload
    ).then((r) => r);
}

async function updateMaterialPortions(payload) {
    return await AxiosInstance.put(
        "/api/v1/brews/mixtures/portions",
        payload
    ).then((r) => r);
}

async function deleteMaterialPortions(ids) {
    return await AxiosInstance.delete(`/api/v1/brews/mixtures/portions`, {
        params: { ids: ids.toString() },
    }).then((r) => r);
}

export const api = {
    fetchMaterialPortions,
    addMixtureMaterialPortions,
    updateMaterialPortions,
    deleteMaterialPortions,
};
