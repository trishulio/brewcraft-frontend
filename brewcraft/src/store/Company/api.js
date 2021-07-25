import AxiosInstance from "../../helpers/axiosInstance";
import { MATERIALS } from "../../helpers/url";

async function fetchCompanyById(id) {
    return await AxiosInstance.get("/api/v1/suppliers/" + id)
        .then((r) => r)
}

async function addCompany(payload) {
    return await AxiosInstance.post("/api/v1/suppliers", payload)
        .then((r) => r)
}

async function updateCompany(id, payload) {
    return await AxiosInstance.patch("/api/v1/suppliers/" + id, payload)
        .then((r) => r)
}

async function deleteCompany(id) {
    debugger;
    return await AxiosInstance.delete("/api/v1/suppliers/" + id)
        .then((r) => r)
}

export const api = {
    fetchCompanyById,
    addCompany,
    updateCompany,
    deleteCompany
};