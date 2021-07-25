import AxiosInstance from "../../helpers/axiosInstance";
import { MATERIALS } from "../../helpers/url";

async function fetchPackagingItemById(id) {
    return await AxiosInstance.get(`${MATERIALS}/${id}`)
    .then((r) => r)
}

async function addPackagingItem(payload) {
    return await AxiosInstance.post(MATERIALS, payload)
    .then((r) => r)
}

async function updatePackagingItem(id, payload) {
    return await AxiosInstance.patch(`${MATERIALS}/${id}`, payload)
    .then((r) => r)
}

async function deletePackagingItem(id) {
    debugger;
    return await AxiosInstance.delete(`${MATERIALS}/${id}`)
    .then((r) => r)
}

export const api = {
    fetchPackagingItemById,
    addPackagingItem,
    updatePackagingItem,
    deletePackagingItem
};