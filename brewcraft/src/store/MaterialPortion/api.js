import AxiosInstance from "../../helpers/axiosInstance";

async function fetchMaterialPortionById(id) {
    return await AxiosInstance.get(`/api/v1/brews/mixtures/portions/${id}`)
        .then((r) => r)
}

async function fetchMaterialPortionsByMixtureId(id) {
    const data = {
        params: {
            mixture_ids: id,
            page: 0,
            size: 500,
            sort: "materialLot.invoiceItem.material.name",
            order_asc: true
        }
    };
    return await AxiosInstance.get("/api/v1/brews/mixtures/portions", data)
        .then((r) => r)
}

async function fetchMaterialPortionsByBrewId(id) {
    const data = {
        params: {
            brew_ids: id,
            group_by: "ID",
            page: 0,
            size: 5000,
            sort: "materialLot.invoiceItem.material.name",
            order_asc: true
        }
    };
    return await AxiosInstance.get("/api/v1/brews/mixtures/portions", data)
        .then((r) => r)
}

async function addMaterialPortion(payload) {
    return await AxiosInstance.post("/api/v1/brews/mixtures/portions", payload)
        .then((r) => r)
}

async function updateMaterialPortion(id, payload) {
    return await AxiosInstance.patch(`/api/v1/brews/mixtures/portions/${id}`, payload)
        .then((r) => r)
}

async function deleteMaterialPortion(id) {
    return await AxiosInstance.delete(`/api/v1/brews/mixtures/portions/${id}`)
        .then((r) => r)
}

export const api = {
    fetchMaterialPortionById,
    fetchMaterialPortionsByBrewId,
    fetchMaterialPortionsByMixtureId,
    addMaterialPortion,
    updateMaterialPortion,
    deleteMaterialPortion
};