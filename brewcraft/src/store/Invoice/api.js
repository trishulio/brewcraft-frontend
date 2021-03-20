import AxiosInstance from "../../helpers/axiosInstance";
import { INVOICES } from "../../helpers/url";

async function fetchInvoices() {
  return await AxiosInstance.get(INVOICES(),{params : {page:1}})
    .then((r) => r)
    .catch((error) => console.log(error));
}
async function fetchInvoiceById(id) {
  return await AxiosInstance.get(`${INVOICES()}/${id}`)
    .then((r) => r)
    .catch((error) => console.log(error));
}
async function addInvoice(purchaseId ,payload) {
  return await AxiosInstance.post(INVOICES(purchaseId), payload)
    .then((r) => r)
    .catch((error) => console.log(error));
}

async function updateInvoice(purchaseId ,id, payload) {
  return await AxiosInstance.put(`${INVOICES(purchaseId)}/${id}`, payload)
    .then((r) => r)
    .catch((error) => console.log(error));
}


async function deleteInvoice(id) {
  return await AxiosInstance.delete(`${INVOICES()}/${id}`)
    .then((r) => r)
    .catch((error) => console.log(error));
}


export const api = {
  fetchInvoices,
  fetchInvoiceById,
  addInvoice,
  updateInvoice,
  deleteInvoice,
};
