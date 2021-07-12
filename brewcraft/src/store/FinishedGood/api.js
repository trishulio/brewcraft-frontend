import AxiosInstance from "../../helpers/axiosInstance";

async function fetchFinishedGoodById(id) {
    // return await AxiosInstance.get(`/api/v1/finished-goods/${id}`)
    //     .then((r) => r)
    //     .catch(() => {});

    return Promise.resolve({
        data: {
            id: id,
            name: "Finished Good " + id
        }
    });
}

async function postFinishedGood(data) {
    return await AxiosInstance.post("/api/v1/finished-goods", data)
    .then((r) => r);
}
async function patchFinishedGood(id, data) {
    return await AxiosInstance.patch(`/api/v1/finished-goods/${id}`, data)
    .then((r) => r);
}

async function deleteFinishedGood(id) {
    return await AxiosInstance.delete(`/api/v1/finished-goods/${id}`);
}

export const api = {
    fetchFinishedGoodById,
    postFinishedGood,
    patchFinishedGood,
    deleteFinishedGood
};
