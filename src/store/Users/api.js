import AxiosInstance from "../../helpers/axiosInstance";

async function fetchUsers(params = {}) {
    const data = {
        params: {
            page: params.pageIndex || 0,
            size: params.pageSize || 500,
            sort: params.sort || "id",
            order_asc: !params.order || params.order === "asc",
        },
    };
    return await AxiosInstance.get("/api/v1/users", data).then((r) => r);
}

export const api = {
    fetchUsers,
};
