import AxiosInstance from "../../helpers/axiosInstance";

async function fetchFinishedGoodById(id) {
    return await AxiosInstance.get(`/api/v1/finished-goods/${id}`).then(
        (r) => r
    );
}

async function addFinishedGood(params) {
    return await AxiosInstance.post("/api/v1/finished-goods", params).then(
        (r) => r
    );
}

async function updateFinishedGood(id, payload) {
    return await AxiosInstance.patch(
        `/api/v1/finished-goods/${id}`,
        payload
    ).then((r) => r);
}

async function deleteFinishedGood(id) {
    return await AxiosInstance.delete(`/api/v1/finished-goods/${id}`).then(
        (r) => r
    );
}

export const api = {
    fetchFinishedGoodById,
    addFinishedGood,
    updateFinishedGood,
    deleteFinishedGood,
};
