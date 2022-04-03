import AxiosInstance from "../../helpers/axiosInstance";

async function fetchEquipmentItemById(id) {
    return await AxiosInstance.get(`/api/v1/equipment/${id}`).then((r) => r);
}

async function addEquipmentItem({ name, type, status, maxCapacity }) {
    return await AxiosInstance.post("/api/v1/facilities/1/equipment", {
        name,
        type,
        status,
        maxCapacity,
    });
}

async function updateEquipmentItem(id, payload) {
    return await AxiosInstance.patch(`/api/v1/equipment/${id}`, payload).then(
        (r) => r
    );
}

async function deleteEquipmentItem(id) {
    return await AxiosInstance.delete(`/api/v1/equipment/${id}`).then((r) => r);
}

export const api = {
    fetchEquipmentItemById,
    addEquipmentItem,
    updateEquipmentItem,
    deleteEquipmentItem,
};
