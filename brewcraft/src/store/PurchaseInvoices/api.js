import AxiosInstance from "../../helpers/axiosInstance";

async function fetchPurchaseInvoices(params = {}) {
    const data = {
        params: {
            page: params.pageIndex || 0,
            size: params.pageSize || 500
        }
    };
    return await AxiosInstance.get("/api/v1/purchases/invoices", data)
        .then((r) => r)
        .catch((error) => console.log(error));
}

async function fetchAllPurchaseInvoices() {
    return (await fetchPurchaseInvoices(null))
}

export const api = {
    fetchPurchaseInvoices,
    fetchAllPurchaseInvoices
}