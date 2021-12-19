import React from "react";
import NumberFormat from "react-number-format";

const MS_PER_WEEK = 1000 * 60 * 60 * 24 * 7;

export function formatAddress(address) {
    let fAddress = "";
    if (address.addressLine1) {
        fAddress += address.addressLine1 + " ";
    }
    if (address.addressLine2) {
        fAddress += address.addressLine2 + " ";
    }
    if (address.city) {
        fAddress += address.city + " ";
    }
    if (address.province) {
        fAddress += address.province + " ";
    }
    if (address.postalCode) {
        fAddress += address.postalCode + " ";
    }
    if (address.country) {
        fAddress += address.country + " ";
    }
    return fAddress.trim();
}

export function formatCurrency(value, decimalScale = 2) {
    return (
        <NumberFormat
            value={value}
            displayType="text"
            isNumericString={true}
            prefix="$"
            thousandSeparator=","
            decimalScale={decimalScale}
            fixedDecimalScale={true}
        />
    );
}

export function formatDate(date) {
    const d = new Date(date);
    return d.toDateString().replace(/^\S+\s/, "");
}

function isLastWeek(date) {
    const now = new Date();
    return now - date <= MS_PER_WEEK;
}

export function formatDatetime(date) {
    const d = new Date(date);
    let options;
    if (isLastWeek(d)) {
        options = {
            weekday: "long",
            hour: "2-digit",
            minute: "2-digit",
        };
    } else {
        options = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
    }
    return d.toLocaleString([], options);
}

export function formatPercent(value) {
    return (
        <NumberFormat
            value={value}
            displayType="text"
            isNumericString={true}
            suffix="%"
            decimalScale={1}
            fixedDecimalScale={true}
        />
    );
}

export function formatWeightKG(value) {
    return (
        <NumberFormat
            value={value}
            displayType="text"
            isNumericString={true}
            suffix="kg"
            thousandSeparator=","
            decimalScale={1}
            fixedDecimalScale={true}
        />
    );
}

export function formatWeightG(value) {
    return (
        <NumberFormat
            value={value}
            displayType="text"
            isNumericString={true}
            suffix="g"
            thousandSeparator=","
            decimalScale={1}
            fixedDecimalScale={true}
        />
    );
}

export function formatVolumeHL(value) {
    return (
        <NumberFormat
            value={value}
            displayType="text"
            isNumericString={true}
            suffix="hl"
            thousandSeparator=","
            decimalScale={1}
            fixedDecimalScale={true}
        />
    );
}

export function formatVolumeL(value) {
    return (
        <NumberFormat
            value={value}
            displayType="text"
            isNumericString={true}
            suffix="l"
            thousandSeparator=","
            decimalScale={1}
            fixedDecimalScale={true}
        />
    );
}

export function formatVolumeML(value) {
    return (
        <NumberFormat
            value={value}
            displayType="text"
            isNumericString={true}
            suffix="ml"
            thousandSeparator=","
            decimalScale={1}
            fixedDecimalScale={true}
        />
    );
}

export function formatKeyAsLabel(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}
/**
 *
 * @author Anuj Gupta
 * @param {number} value is required  number
 * @param {any} children is required any
 */
export function Notzero(props) {
    if (props.value !== 0) {
        return props.children;
    } else {
        return null;
    }
}
/**
 *
 * @author Anuj Gupta
 * @param {number} value is required  number
 * @param {any} children is required any
 */
export function NotMinusoneNun(props) {
    if (props.value != null && props.value !== -1) {
        return props.children;
    } else {
        return <div>not found</div>;
    }
}

export function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}
