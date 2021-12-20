import AxiosInstance from "../../helpers/axiosInstance";

async function fetchSupplierContacts(params = {}) {
    if (params.sort && params.sort === "supplierName") {
        params.sort = "supplier.name";
    }
    const data = {
        params: {
            page: params.pageIndex || 0,
            size: params.pageSize || 500,
            sort: params.sort || "firstName",
            order_asc: !params.order || params.order === "asc",
        },
    };
    if (params.supplierId) {
        data.params.supplier_ids = params.supplierId;
    }
    return await AxiosInstance.get("/api/v1/suppliers/contacts", data).then(
        (r) => r
    );
}

export const api = {
    fetchSupplierContacts,
};
