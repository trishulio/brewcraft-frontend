import AxiosInstance from "../../helpers/axiosInstance";
import { MATERIALS } from "../../helpers/url";

async function fetchMaterialCategories(params = {}) {
    const data = {
        params: {
            page: params.pageIndex || 0,
            size: params.pageSize || 500,
        }
    };
    if (params.parentCategoryId) {
        data.params.parentCategoryIds = params.parentCategoryId
    }
    return await AxiosInstance.get(`${MATERIALS}/categories`, data)
        .then((r) => r)
        .catch((error) => console.log(error));
}

async function fetchCategories() {
    return (await fetchMaterialCategories(null))
}

export const api = {
    fetchMaterialCategories,
    fetchCategories
}