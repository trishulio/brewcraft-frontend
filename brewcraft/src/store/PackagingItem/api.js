import AxiosInstance from "../../helpers/axiosInstance";


async function fetchPackagingItemById(id) {
    return await AxiosInstance.get(`/api/v1/materials/${id}`)
    .then((r) => r)
}

async function addPackagingItem(payload) {
    return await AxiosInstance.post("/api/v1/materials", payload)
    .then((r) => r)
}

async function updatePackagingItem(id, payload) {
    return await AxiosInstance.patch(`/api/v1/materials/${id}`, payload)
    .then((r) => r)
}

async function deletePackagingItem(id) {
    return await AxiosInstance.delete(`/api/v1/materials/${id}`)
    .then((r) => r)
}

export const api = {
    fetchPackagingItemById,
    addPackagingItem,
    updatePackagingItem,
    deletePackagingItem
};