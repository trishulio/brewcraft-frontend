import AxiosInstance from "../../helpers/axiosInstance";

async function fetchCompanies(params = {}) {
    const data = {
        params: {
            page: params.pageIndex || 0,
            size: params.pageSize || 500,
        }
    };
    return await AxiosInstance.get("/api/v1/suppliers", data)
        .then((r) => r)
}

async function fetchAllCompanies() {
    return (await fetchCompanies(null))
}

export const api = {
    fetchCompanies,
    fetchAllCompanies
}