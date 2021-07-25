import AxiosInstance from "../../helpers/axiosInstance";
import { MATERIALS } from "../../helpers/url";

async function fetchIngredients(params = {}) {
    const data = {
        params: {
            page: params.pageIndex || 0,
            size: params.pageSize || 500,
            categoryIds: params.parentCategoryId || "1"
        }
    };
    return await AxiosInstance.get(`${MATERIALS}`, data)
        .then((r) => r)
        .catch((error) => console.log(error));
}

async function fetchAllIngredients() {
    return (await fetchIngredients(null))
}

export const api = {
    fetchIngredients,
    fetchAllIngredients
}