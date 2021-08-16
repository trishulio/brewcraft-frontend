import AxiosInstance from "../../helpers/axiosInstance";

async function fetchMaterialCategoryById(id) {
    return await AxiosInstance.get(`/api/v1/materials/categories/${id}`)
    .then((r) => r)
    .catch((error) => console.log(error));
}
async function patchMaterialCategory(id, payload) {
    return await AxiosInstance.patch(`/api/v1/materials/categories/${id}`, payload)
    .then((r) => r)
    .catch((error) => console.log(error));
}
async function updateMaterialCategory(id, payload) {
    return await AxiosInstance.put(`/api/v1/materials/categories/${id}`, payload)
    .then((r) => r)
    .catch((error) => console.log(error));
}
async function deleteMaterialCategory(id) {
    return await AxiosInstance.delete(`/api/v1/materials/categories/${id}`)
    .then((r) => r)
    .catch((error) => console.log(error));
}

async function addMaterialCategory(payload) {
    return await AxiosInstance.post("/api/v1/materials/categories", payload)
    .then((r) => r)
}

export const api = {
    patchMaterialCategory,
    updateMaterialCategory,
    deleteMaterialCategory,
    fetchMaterialCategoryById,
    addMaterialCategory
};