import AxiosInstance from "../../helpers/axiosInstance";
import { INGREDIENTS , PACKAGING , NOTNULL , ALL } from "../../helpers/constants";
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
async function fetchMaterialCategories(type) {
  const data=await AxiosInstance.get(`${MATERIALS}/categories`)
  .then((r) => type===ALL ?  r.data.content : type=== NOTNULL? r.data.content.filter(item => item.parentCategoryId !== null): r.data.content.filter(item => item.parentCategoryId === type))
  .catch((error) => console.log(error))

  return data

   
}

// retrieves basic ingredients with parentCategoryid===null
async function fetchCategories() {
  return (await fetchMaterialCategories(null))
}
// fetches packaging and ingredients materials
async function fetchPackagingMaterials() {
  return (await fetchMaterials()).data.content.filter(item => item.materialClass.id===PACKAGING)
}
async function fetchIngredients() {
  const data =(await fetchMaterials()).data.content.filter(item => item.materialClass.id===INGREDIENTS)
  return data
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
async function addIngredient(data) {
  return await addMaterial(data)

}
async function addPackagingMaterial(data) {
  return await addMaterial(data)

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
  fetchCategories,
  addMaterialCategory
};
