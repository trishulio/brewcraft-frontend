import AxiosInstance from "../../helpers/axiosInstance";

async function fetchSuppliers(params = {}) {
    const data = {
        params: {
            page: params.pageIndex || 0,
            size: params.pageSize || 500,
        }
    };
    if (params.companyId) {
        data.params.companyId = params.parentCategoryId
    }
    return await AxiosInstance.get("/api/v1/suppliers/contacts", data)
        .then((r) => r)
}

export const api = {
    fetchSuppliers
}