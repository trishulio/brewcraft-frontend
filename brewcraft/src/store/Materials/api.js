import AxiosInstance from "../../helpers/axiosInstance";
import { MATERIALS } from "../../helpers/url";

async function fetchMaterials() {
  return await AxiosInstance.get(MATERIALS)
    .then((r) => r)
    .catch((error) => console.log(error));
}
async function fetchMaterialById(id) {
  return await AxiosInstance.get(`${MATERIALS}/${id}`)
    .then((r) => r)
    .catch((error) => console.log(error));
}
async function addMaterial(payload) {
  return await AxiosInstance.post(MATERIALS, payload)
    .then((r) => r)
    .catch((error) => console.log(error));
}

async function updateMaterial(id, payload) {
  return await AxiosInstance.put(`${MATERIALS}/${id}`, payload)
    .then((r) => r)
    .catch((error) => console.log(error));
}


async function deleteMaterial(id) {
  return await AxiosInstance.delete(`${MATERIALS}/${id}`)
    .then((r) => r)
    .catch((error) => console.log(error));
}
async function patchMaterial(id, payload) {
  return await AxiosInstance.patch(`${MATERIALS}/${id}`, payload)
    .then((r) => r)
    .catch((error) => console.log(error));
}
//Categories
async function fetchMaterialCategories() {
  return await AxiosInstance.get(`${MATERIALS}/categories`)
    .then((r) => r)
    .catch((error) => console.log(error));
}
async function fetchIngredients() {
  return (await fetchMaterialCategories()).data.content.filter(item => item.parentCategoryId === 1)
}
// retrieves basic ingredients with parentCategoryid===null
async function fetchCategories() {
  return (await fetchMaterialCategories()).data.content.filter(item => item.parentCategoryId === null)
}
async function fetchPackagingMaterials() {
  return (await fetchMaterialCategories()).data.content.filter(item => item.parentCategoryId === 2);
}
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

async function addMaterialCategory(name, parentCategoryId) {
  return await AxiosInstance.post(`${MATERIALS}/categories`, { name, parentCategoryId })
    .then((r) => r)
    .catch((error) => console.log(error));
}
async function addIngredient(name) {
  return await AxiosInstance.post(`${MATERIALS}/categories`, { name, parentCategoryId: 1 })
    .then((r) => r)
    .catch((error) => console.log(error));
}
async function addCategory(name) {
  return await AxiosInstance.post(`${MATERIALS}/categories`, { name, parentCategoryId: null })
    .then((r) => r)
    .catch((error) => console.log(error));
}
async function addPackagingMaterial(name) {
  return await AxiosInstance.post(`${MATERIALS}/categories`, { name, parentCategoryId: 2 })
    .then((r) => r)
    .catch((error) => console.log(error));
}


export const api = {
  fetchMaterials,
  addMaterial,
  fetchMaterialById,
  updateMaterial,
  deleteMaterial,
  patchMaterial,
  fetchMaterialCategories,
  fetchIngredients,
  fetchPackagingMaterials,
  patchMaterialCategory,
  updateMaterialCategory,
  deleteMaterialCategory,
  fetchMaterialCategoryById,
  addIngredient,
  addPackagingMaterial,
  addCategory,
  fetchCategories,
  addMaterialCategory
};
