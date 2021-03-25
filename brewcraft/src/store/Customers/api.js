import AxiosInstance from "../../helpers/axiosInstance";

export const fetchContactsRequest = async () => {
    return await AxiosInstance.get("/api/v1/contacts");
};

export const fetchContactRequest = async (id) => {
    return await AxiosInstance.get("/api/v1/contacts/" + id);
};

export const createContactRequest = async (data) => {
    return await AxiosInstance.post("/api/v1/contacts", data);
};

export const updateContactRequest = async (id, data) => {
    return await AxiosInstance.put("/api/v1/contacts/" + id, data);
};

export const deleteContactRequest = async (id) => {
    return await AxiosInstance.delete("/api/v1/contacts/" + id);
};