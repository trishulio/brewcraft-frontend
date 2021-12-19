import AxiosInstance from "../../helpers/axiosInstance";

async function fetchUserRoles(params) {
    const data = {
        params: {
            page: params.pageIndex || 0,
            size: params.pageSize || 500,
            ids: params.userRoleIds,
            sort: params.sort || "name",
            order_asc: !params.order || params.order === "asc",
        },
    };
    return await AxiosInstance.get("/api/v1/users/roles", data).then((r) => r);
}

export const api = {
    fetchUserRoles,
};
