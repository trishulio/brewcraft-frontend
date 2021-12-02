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
export function isValidPostalCode(code){
    return (/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.exec(code) ? true : false)
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
export function validatePhoneNumber(code){
    return isValidName(code)  && (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.exec(code) ? true : false)
}
export function validateEmail(email){
    return  isValidName(email) && (/\S+@\S+\.\S+/.exec(email) ? true : false)
}
export function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = (match[1] ? '+1 ' : '');
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return phoneNumberString;
  }