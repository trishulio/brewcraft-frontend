import AxiosInstance from "../../helpers/axiosInstance";

async function fetchSupplierContactById(id) {
    return await AxiosInstance.get("/api/v1/suppliers/contacts/" + id)
    .then((r) => r)
}

async function patchSupplierContact(id, payload) {
    return await AxiosInstance.patch("/api/v1/suppliers/contacts/" + id, payload)
    .then((r) => r)
}

async function updateSupplierContact(id, supplierId, payload) {
    return await AxiosInstance.put("/api/v1/suppliers/" + supplierId + "/contacts/" + id, payload)
    .then((r) => r)
}

async function deleteSupplierContact(id) {
    return await AxiosInstance.delete("/api/v1/suppliers/contacts/" + id)
    .then((r) => r)
}

async function addSupplierContact(supplierId, payload) {
    return await AxiosInstance.post("/api/v1/suppliers/" + supplierId + "/contacts", payload)
    .then((r) => r)
}

export const api = {
    patchSupplierContact,
    updateSupplierContact,
    deleteSupplierContact,
    fetchSupplierContactById,
    addSupplierContact
};