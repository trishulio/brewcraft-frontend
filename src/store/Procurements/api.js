import AxiosInstance from "../../helpers/axiosInstance";


async function fetchProcurements(params = {}) {
    const data = {
        params: {
            shipment_ids: params.shipmentIds,
            shipment_exclude_ids: params.shipmentExcludeIds,
            supplier_ids: params.supplierId,
            generated_on_from: params.invoiceFrom ? new Date(params.invoiceFrom).toISOString() : undefined,
            generated_on_to: params.invoiceTo ? new Date(params.invoiceTo).toISOString() : undefined,
            status_ids: params.status,
            page: params.pageIndex || 0,
            size: params.pageSize || 500,
            sort: params.sort || "id",
            order_asc: !params.order || params.order === "asc"
        }
    };
    return await AxiosInstance.get("/api/v1/procurements/", data)
        .then((r) => r);
}

async function fetchCategories() {
    return (await fetchProcurements(null))
}

export const api = {
    fetchProcurements,
    fetchCategories
}