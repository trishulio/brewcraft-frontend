import { useLocation } from "react-router-dom";

export function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export function isValidName(name) {
    return typeof name === "string"
        && name.length > 0;
}

export function isValidCountry(country) {
    return isValidName(country);
}