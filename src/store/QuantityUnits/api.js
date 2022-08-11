import AxiosInstance from "../../helpers/axiosInstance";

async function fetchQuantityUnits() {
    return await AxiosInstance.get("/api/v1/quantity/units").then((r) => r);
}

export const api = {
    fetchQuantityUnits,
};
