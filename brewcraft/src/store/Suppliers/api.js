import AxiosInstance from "../../helpers/axiosInstance";

export const fetchSuppliersRequest = async () => {
    // API refers to companies as suppliers
    return await AxiosInstance.get("/api/v1/suppliers/contacts");
}

export const fetchSupplierRequest = async (id) => {
    // API refers to companies as suppliers
    return await AxiosInstance.get(`/api/v1/suppliers/contacts/${id}`);
};

export const createSupplierRequest = async (companyId, data) => {
    // API refers to companies as suppliers
    return await AxiosInstance.post(`/api/v1/suppliers/${companyId}/contacts`, data);
};

export const updateSupplierRequest = async (companyId, contactId, data) => {
    // API refers to companies as suppliers
    return await AxiosInstance.put(`/api/v1/suppliers/${companyId}/contacts/${contactId}`, data);
};

export const deleteSupplierRequest = async (contactId) => {
    // API refers to companies as suppliers
    return await AxiosInstance.delete("/api/v1/suppliers/contacts/" + contactId);
}