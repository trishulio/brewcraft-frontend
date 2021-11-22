import { useLocation } from "react-router-dom";
import { isFloat } from "./textUtils";

export function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export function isValidName(name) {
    return typeof name === "string"
        && name.trim().length > 0;
}

export function isValidCountry(country) {
    return isValidName(country);
}

export function validId(id) {
    return id
        && ((Number.isInteger(id) && id > 0)
            || (typeof id === "string" && id.trim().length > 0));
}

export function validAmount(quantity) {
    return (quantity || quantity === 0)
        && (Number.isInteger(quantity) || isFloat(quantity))
        && quantity >= 0
}

export function validInvoiceNumber(invoiceNumber) {
    return invoiceNumber && invoiceNumber.trim().length > 0;
}

export function validDate(date) {
    return !(!date || isNaN(Date.parse(date)));
}