import AxiosInstance from "../../helpers/axiosInstance";
import { MATERIALS } from "../../helpers/url";

async function fetchMaterialCategoryById(id) {
    return await AxiosInstance.get(`${MATERIALS}/categories/${id}`)
    .then((r) => r)
    .catch((error) => console.log(error));
}
async function patchMaterialCategory(id, payload) {
    return await AxiosInstance.patch(`${MATERIALS}/categories/${id}`, payload)
    .then((r) => r)
    .catch((error) => console.log(error));
}
async function updateMaterialCategory(id, payload) {
    return await AxiosInstance.put(`${MATERIALS}/categories/${id}`, payload)
    .then((r) => r)
    .catch((error) => console.log(error));
}
async function deleteMaterialCategory(id) {
    return await AxiosInstance.delete(`${MATERIALS}/categories/${id}`)
    .then((r) => r)
    .catch((error) => console.log(error));
}

async function addMaterialCategory(payload) {
    debugger;
    return await AxiosInstance.post(`${MATERIALS}/categories`, payload)
    .then((r) => r)
}

export const api = {
    patchMaterialCategory,
    updateMaterialCategory,
    deleteMaterialCategory,
    fetchMaterialCategoryById,
    addMaterialCategory
};