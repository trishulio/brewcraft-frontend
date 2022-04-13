import AxiosInstance from "../../helpers/axiosInstance";

async function fetchUserById(id) {
    return await AxiosInstance.get(`/api/v1/users/${id}`)
        .then((r) => r)
        .catch(() => {});
}

async function postUser(data) {
    return await AxiosInstance.post("/api/v1/users", [data]).then((r) => r);
}
async function putUser(id, data) {
    return await AxiosInstance.put(`/api/v1/users/`, [data]).then((r) => r);
}

async function deleteUser(id) {
    return await AxiosInstance.delete(`/api/v1/users`, {
        params: { ids: id },
    });
}

export const api = {
    fetchUserById: fetchUserById,
    postUser: postUser,
    putUser: putUser,
    deleteUser: deleteUser,
};
