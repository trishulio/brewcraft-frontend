import AxiosInstance from "../../helpers/axiosInstance";

async function fetchProcurements(params = {}) {
    const data = {
        params: {
            shipment_ids: params.shipmentIds,
            shipment_exclude_ids: params.shipmentExcludeIds,
            supplier_ids:
                params.supplierId?.length > 0 ? params.supplierId : undefined,
            generated_on_from: params.invoiceFrom
                ? new Date(params.invoiceFrom).toISOString()
                : undefined,
            generated_on_to: params.invoiceTo
                ? new Date(params.invoiceTo).toISOString()
                : undefined,
            invoice_status_ids: params.status,
            payment_due_date_from: params.paymentFrom
                ? new Date(params.paymentFrom).toISOString()
                : undefined,
            payment_due_date_to: params.paymentTo
                ? new Date(params.paymentTo).toISOString()
                : undefined,
            amt_from: params.amountFrom ? Number(params.amountFrom) : undefined,
            amt_to: params.amountTo ? Number(params.amountTo) : undefined,
            material_ids:
                params.materialIds?.length > 0 ? params.materialIds : undefined,
            page: params.pageIndex || 0,
            size: params.pageSize || 500,
            sort: params.sort || "id",
            order_asc: !params.order || params.order === "asc",
        },
    };
    return await AxiosInstance.get("/api/v1/procurements/", data).then(
        (r) => r
    );
}

async function fetchCategories() {
    return await fetchProcurements(null);
}

export const api = {
    fetchProcurements,
    fetchCategories,
};
