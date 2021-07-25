import AxiosInstance from "../../helpers/axiosInstance";
import { MATERIALS } from "../../helpers/url";

async function fetchIngredientById(id) {
    return await AxiosInstance.get(`${MATERIALS}/${id}`)
    .then((r) => r)
}

async function addIngredient(payload) {
    return await AxiosInstance.post(MATERIALS, payload)
    .then((r) => r)
}

async function updateIngredient(id, payload) {
    return await AxiosInstance.patch(`${MATERIALS}/${id}`, payload)
    .then((r) => r)
}

async function deleteIngredient(id) {
    return await AxiosInstance.delete(`${MATERIALS}/${id}`)
    .then((r) => r)
}

export const api = {
    fetchIngredientById,
    addIngredient,
    updateIngredient,
    deleteIngredient
};