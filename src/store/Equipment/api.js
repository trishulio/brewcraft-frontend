import AxiosInstance from "../../helpers/axiosInstance";

async function fetchEquipmentItemById(id) {
    return await AxiosInstance.get(`/api/v1/equipment/${id}`);
}

async function addEquipmentItem({ name, type, status, maxCapacity }) {
    return await AxiosInstance.post("/api/v1/equipment", [
        {
            name,
            facilityId: 1,
            typeId: type.id,
            status,
            maxCapacity,
        },
    ]);
}

async function updateEquipmentItem({
    id,
    name,
    type,
    status,
    maxCapacity,
    version,
}) {
    return await AxiosInstance.put(`/api/v1/equipment`, [
        {
            id,
            name,
            facilityId: 1,
            typeId: type.id,
            status,
            maxCapacity,
            version,
        },
    ]).then((r) => r);
}

async function deleteEquipmentItem(id) {
    return await AxiosInstance.delete(`/api/v1/equipment`, {
        params: { ids: id },
    });
}

async function fetchEquipment({
    ids,
    typeIds,
    statuses,
    facilityIds,
    sort,
    order,
    pageIndex,
    pageSize,
} = {}) {
    return await AxiosInstance.get("/api/v1/equipment", {
        params: {
            ids,
            type_ids: typeIds,
            statuses,
            facility_ids: facilityIds,
            sort: sort || "name",
            order_asc: order ? order === "asc" : true,
            page: pageIndex || 0,
            size: pageSize || 500,
        },
    });
}

export const api = {
    fetchEquipmentItemById,
    addEquipmentItem,
    updateEquipmentItem,
    deleteEquipmentItem,
    fetchEquipment,
};
