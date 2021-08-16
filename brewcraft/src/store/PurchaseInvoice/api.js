import AxiosInstance from "../../helpers/axiosInstance";

async function fetchPurchaseInvoiceById(id) {
  return await AxiosInstance.get(`/api/v1/purchases/invoices/${id}`)
    .then((r) => r)
}

async function postPurchaseInvoice(data) {
  return await AxiosInstance.post("/api/v1/procurements/", data)
    .then((r) => r);
}

async function patchPurchaseInvoice(id, data) {
  return await AxiosInstance.patch(`/api/v1/purchases/invoices/${id}`, data)
    .then((r) => r);
}

async function putPurchaseInvoice(id, data) {
  return await AxiosInstance.put(`/api/v1/purchases/invoices/${id}`, data)
    .then((r) => r);
}

async function deletePurchaseInvoice(id) {
    return await AxiosInstance.delete("/api/v1/purchases/invoices", { params: { ids: id }});
}

export const api = {
    fetchPurchaseInvoiceById,
    postPurchaseInvoice,
    patchPurchaseInvoice,
    putPurchaseInvoice,
    deletePurchaseInvoice
};
