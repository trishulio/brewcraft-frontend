import AxiosInstance from "../../helpers/axiosInstance";

async function fetchSupplierById(id) {
    return await AxiosInstance.get("/api/v1/suppliers/" + id).then((r) => r);
}

async function addSupplier(payload) {
    return await AxiosInstance.post("/api/v1/suppliers", payload).then(
        (r) => r
    );
}

async function updateSupplier(id, payload) {
    return await AxiosInstance.patch("/api/v1/suppliers/" + id, payload).then(
        (r) => r
    );
}

async function deleteSupplier(id) {
    return await AxiosInstance.delete("/api/v1/suppliers/" + id).then((r) => r);
}

export const api = {
    fetchSupplierById,
    addSupplier,
    updateSupplier,
    deleteSupplier,
};
