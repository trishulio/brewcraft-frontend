import AxiosInstance from "../../helpers/axiosInstance";

async function fetchProcurement(shipmentId, invoiceId) {
    return await AxiosInstance.get(`/api/v1/procurements/${shipmentId}/${invoiceId}`)
        .then((r) => r)
}

async function postProcurements(data) {
    return await AxiosInstance.post("/api/v1/procurements/", data)
        .then((r) => r);
}

async function putProcurements(data) {
    return await AxiosInstance.put("/api/v1/procurements/", data)
        .then((r) => r);
}

async function deleteProcurement(shipmentId, invoiceId) {
    return await AxiosInstance.delete(`/api/v1/procurements/${shipmentId}/${invoiceId}`)
        .then(r => r);
}

async function fetchPurchaseInvoiceById(id) {
    return await AxiosInstance.get(`/api/v1/purchases/invoices/${id}`)
        .then((r) => r)
}

async function patchPurchaseInvoice(id, data) {
    return await AxiosInstance.patch(`/api/v1/purchases/invoices/${id}`, data)
        .then((r) => r);
}

async function putPurchaseInvoice(data) {
    return await AxiosInstance.put(`/api/v1/purchases/invoices/`, data)
        .then((r) => r);
}

async function deletePurchaseInvoice(id) {
    return await AxiosInstance.delete("/api/v1/purchases/invoices", { params: { ids: id }});
}

async function postPurchaseOrders(data) {
    return await AxiosInstance.post("/api/v1/purchases/orders", data)
        .then((r) => r);
}

async function putPurchaseOrders(data) {
    return await AxiosInstance.put("/api/v1/purchases/orders", data)
        .then((r) => r);
}

export const api = {
    fetchProcurement,
    postProcurements,
    putProcurements,
    deleteProcurement,
    fetchPurchaseInvoiceById,
    patchPurchaseInvoice,
    putPurchaseInvoice,
    deletePurchaseInvoice,
    postPurchaseOrders,
    putPurchaseOrders
};
