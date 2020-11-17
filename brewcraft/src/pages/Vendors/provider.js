import axios from "axios";
import { getLoggedInUser } from "../../helpers/authUtils";

export async function getSuppliers() {
    const user = getLoggedInUser();
    if (user) {
        const headers = {
            "Authorization": `Bearer ${user.accessToken.jwtToken}`
        };
        const response = await axios.get("/api/suppliers", { headers });
        return response.data;
    } else {
        return [];
    }
};