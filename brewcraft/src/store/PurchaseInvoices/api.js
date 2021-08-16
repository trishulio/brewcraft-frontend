import AxiosInstance from "../../helpers/axiosInstance";

async function fetchPurchaseInvoices(params = {}) {
    const data = {
        params: {
            page: params.pageIndex || 0,
            size: params.pageSize || 500
        }
    };
    if (params.supplierId) {
        data.params.supplier_ids = params.supplierId;
    }
    if (params.invoiceFrom) {
        data.params.generated_on_from = new Date(params.invoiceFrom).toISOString();
    }
    if (params.invoiceTo) {
        data.params.generated_on_to = new Date(params.invoiceTo).toISOString();
    }
    if (params.status) {
        data.params.status_ids = params.status;
    }
    return await AxiosInstance.get("/api/v1/purchases/invoices", data)
        .then((r) => r)
        .catch((error) => console.log(error));
}

export const api = {
    fetchPurchaseInvoices
}