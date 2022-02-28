import AxiosInstance from "../../helpers/axiosInstance";

async function fetchFinishedGoodById(id) {
    return await AxiosInstance.get(`/api/v1/finished-goods/${id}`).then(
        (r) => r
    );
}

async function createFinishedGood(payload) {
    return await AxiosInstance.post("/api/v1/finished-goods", [payload]).then(
        (r) => r
    );
}

async function updateFinishedGood(id, payload) {
    return await AxiosInstance.put(
        `/api/v1/finished-goods/${id}`,
        payload
    ).then((r) => r);
}

async function deleteFinishedGood(ids) {
    return await AxiosInstance.delete(`/api/v1/finished-goods`, {
        params: { ids: ids },
    }).then((r) => r);
}

export const api = {
    fetchFinishedGoodById,
    createFinishedGood,
    updateFinishedGood,
    deleteFinishedGood,
};
