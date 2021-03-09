import AxiosInstance from "../../helpers/axiosInstance";

export const fetchCompaniesRequest = async () => {
    // API refers to companies as suppliers
    return await AxiosInstance.get("/api/v1/suppliers");
};

export const fetchCompanyRequest = async (id) => {
    // API refers to companies as suppliers
    return await AxiosInstance.get("/api/v1/suppliers/" + id);
};

export const createCompanyRequest = async (data) => {
    // API refers to companies as suppliers
    return await AxiosInstance.post("/api/v1/suppliers", data);
};

export const updateCompanyRequest = async (id, data) => {
    // API refers to companies as suppliers
    return await AxiosInstance.put("/api/v1/suppliers/" + id, data);
};

export const deleteCompanyRequest = async (id) => {
    // API refers to companies as suppliers
    return await AxiosInstance.delete("/api/v1/suppliers/" + id);
};