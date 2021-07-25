import AxiosInstance from "../../helpers/axiosInstance";
import { MATERIALS } from "../../helpers/url";

async function fetchPackaging(params = {}) {
    const data = {
        params: {
            page: params.pageIndex || 0,
            size: params.pageSize || 500,
            categoryIds: params.parentCategoryId || "2"
        }
    };
    return await AxiosInstance.get(`${MATERIALS}`, data)
        .then((r) => r)
        .catch((error) => console.log(error));
}

async function fetchAllPackaging() {
    return (await fetchPackaging(null))
}

export const api = {
    fetchPackaging,
    fetchAllPackaging
}