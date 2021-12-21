import AxiosInstance from "../../helpers/axiosInstance";

async function fetchIngredientById(id) {
    return await AxiosInstance.get(`/api/v1/materials/${id}`).then((r) => r);
}

async function addIngredient(payload) {
    return await AxiosInstance.post("/api/v1/materials", payload).then(
        (r) => r
    );
}

async function updateIngredient(id, payload) {
    return await AxiosInstance.patch(`/api/v1/materials/${id}`, payload).then(
        (r) => r
    );
}

async function deleteIngredient(id) {
    return await AxiosInstance.delete(`/api/v1/materials/${id}`).then((r) => r);
}

export const api = {
    fetchIngredientById,
    addIngredient,
    updateIngredient,
    deleteIngredient,
};
