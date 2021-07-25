import AxiosInstance from "../../helpers/axiosInstance";

async function fetchSupplierById(id) {
    return await AxiosInstance.get("/api/v1/suppliers/contacts/" + id)
    .then((r) => r)
}

async function patchSupplier(id, payload) {
    return await AxiosInstance.patch("/api/v1/suppliers/contacts/" + id, payload)
    .then((r) => r)
}

async function updateSupplier(id, companyId, payload) {
    debugger;
    return await AxiosInstance.put("/api/v1/suppliers/" + companyId + "/contacts/" + id, payload)
    .then((r) => r)
}

async function deleteSupplier(id) {
    return await AxiosInstance.delete("/api/v1/suppliers/contacts/" + id)
    .then((r) => r)
}

async function addSupplier(supplierId, payload) {
    return await AxiosInstance.post("/api/v1/suppliers/" + supplierId + "/contacts", payload)
    .then((r) => r)
}

export const api = {
    patchSupplier,
    updateSupplier,
    deleteSupplier,
    fetchSupplierById,
    addSupplier
};