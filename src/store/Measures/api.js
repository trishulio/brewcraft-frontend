import AxiosInstance from "../../helpers/axiosInstance";

async function fetchMeasures(params) {
    const data = {
        params: {
            page: params.pageIndex || 0,
            size: params.pageSize || 500,
            sort: params.sort || "name",
            order_asc: !params.order || params.order === "asc",
        },
    };
    return await AxiosInstance.get("/api/v1/measures", data)
        .then((r) => r)
        .catch((error) => console.log(error));
}

export const api = {
    fetchMeasures,
};
