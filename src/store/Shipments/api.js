import AxiosInstance from "../../helpers/axiosInstance";

async function fetchShipmentById(id) {
    return await AxiosInstance.get(`/api/v1/purchases/shipments/${id}`).then(
        (r) => r
    );
}

async function postShipment(data) {
    return await AxiosInstance.post("/api/v1/purchases/shipments/", data).then(
        (r) => r
    );
}

async function patchShipment(id, data) {
    return await AxiosInstance.patch(
        `/api/v1/purchases/shipments/${id}`,
        data
    ).then((r) => r);
}

async function putShipment(id, data) {
    return await AxiosInstance.put(
        `/api/v1/purchases/shipments/${id}`,
        data
    ).then((r) => r);
}

async function deleteShipment(id) {
    return await AxiosInstance.delete("/api/v1/purchases/shipments", {
        params: { ids: id },
    });
}

export const api = {
    fetchShipmentById,
    postShipment,
    patchShipment,
    putShipment,
    deleteShipment,
};
