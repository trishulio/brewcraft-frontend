import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { isFloat } from "./textUtils";

export function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export function isValidName(name) {
    return typeof name === "string" && name.trim().length > 0;
}

export function isValidCountry(country) {
    return isValidName(country);
}

export function validId(id) {
    return (
        id &&
        ((Number.isInteger(id) && id > 0) ||
            (typeof id === "string" && id.trim().length > 0))
    );
}
export function isValidPostalCode(code) {
    //eslint-disable-next-line
    return /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.exec(code) ? true : false;
}
export function validAmount(quantity) {
    return (
        (quantity || quantity === 0) &&
        (Number.isInteger(quantity) || isFloat(quantity)) &&
        quantity >= 0
    );
}

export function validInvoiceNumber(invoiceNumber) {
    return invoiceNumber && invoiceNumber.trim().length > 0;
}

export function validDate(date) {
    return !(!date || isNaN(Date.parse(date)));
}
export function isValidPhoneNumber(code) {
    return (
        isValidName(code) && //eslint-disable-next-line
        (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.exec(
            code
        )
            ? true
            : false)
    );
}
export function isValidSupplier(supplier) {
    return typeof supplier !== "string";
}
export function isValidEmail(email) {
    //eslint-disable-next-line
    return isValidName(email) && (/\S+@\S+\.\S+/.exec(email) ? true : false);
}
export function isNotEmptyArray(array) {
    return Array.isArray(array) && array.length > 0;
}
export function formatPhoneNumber(phoneNumberString) {
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    //eslint-disable-next-line
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        var intlCode = match[1] ? "+1 " : "";
        return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join(
            ""
        );
    }
    return phoneNumberString;
}

export function useKeyPress(targetKey) {
    const [keyPressed, setKeyPressed] = useState(false);
    function downHandler({ key }) {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    }
    const upHandler = ({ key }) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };
    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);
        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
        // eslint-disable-next-line
    }, []);
    return keyPressed;
}

export function arrayEquals(a, b) {
    const aSorted = a ? [...a].sort() : null;
    const bSorted = b ? [...b].sort() : null;
    return (
        Array.isArray(aSorted) &&
        Array.isArray(bSorted) &&
        aSorted.length === bSorted.length &&
        aSorted.every((val, index) => val === bSorted[index])
    );
}

export function calculatedTaxRate(qty, price, taxAmount) {
    let taxRate = 0;
    taxRate = taxAmount / (qty * price);
    return taxRate;
}
