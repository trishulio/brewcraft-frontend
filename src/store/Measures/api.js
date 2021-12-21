import AxiosInstance from "../../helpers/axiosInstance";

async function fetchMeasures() {
    const data = {
        params: {
            sort: "id",
            order_asc: true,
            page: 0,
            size: 500,
        },
    };
    return await AxiosInstance.get("/api/v1/measures", data)
        .then((r) => r)
        .catch((error) => console.log(error));
}

export const api = {
    fetchMeasures,
};
