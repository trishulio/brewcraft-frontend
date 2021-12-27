import AxiosInstance from "../../helpers/axiosInstance";

async function fetchPurchaseInvoices(params = {}) {
    const data = {
        params: {
            page: params.pageIndex || 0,
            size: params.pageSize || 500,
            sort: params.sort || "generatedOn",
            order_asc: !params.order || params.order === "asc",
        },
    };
    if (params.supplierId.length > 0) {
        data.params.supplier_ids = params.supplierId;
    }
    if (params.invoiceFrom) {
        data.params.generated_on_from = new Date(
            params.invoiceFrom
        ).toISOString();
    }
    if (params.invoiceTo) {
        data.params.generated_on_to = new Date(params.invoiceTo).toISOString();
    }
    if (params.status) {
        data.params.status_ids = params.status;
    }
    if (params.amountFrom) {
        data.params.amt_from = Number(params.amountFrom);
    }
    if (params.amountTo) {
        data.params.amt_to = Number(params.amountTo);
    }
    if (params.paymentFrom) {
        data.params.payment_due_date_from = new Date(params.paymentFrom).toISOString();
    }
    if (params.paymentTo) {
        data.params.payment_due_date_to = new Date(params.paymentTo).toISOString();
    }
    if (params.materialIds && params.materialIds.length > 0) {
        data.params.material_ids = params.materialIds;
    }
    return await AxiosInstance.get("/api/v1/purchases/invoices", data)
        .then((r) => r)
        .catch((error) => console.log(error));
}

export const api = {
    fetchPurchaseInvoices,
};
