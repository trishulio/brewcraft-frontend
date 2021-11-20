import AxiosInstance from "../../helpers/axiosInstance";


async function fetchMaterials(params = {}) {
    const data = {
        params: {
            page: params.pageIndex || 0,
            size: params.pageSize || 500
        }
    };
    return await AxiosInstance.get("/api/v1/materials", data)
        .then((r) => r)
        .catch((error) => console.log(error));
}

export const api = {
    fetchMaterials
}