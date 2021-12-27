import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col } from "reactstrap";
import { FilterBar } from "../../../component/Layout/VerticalLayout/FilterBar";
import { useQuery } from "../../../helpers/utils";

function FilterBarInvoices() {
    const [status, setStatus] = useState("");
    const [supplierIds, setSupplierIds] = useState(null);
    const [dates, setDates] = useState({
        from: "",
        to: "",
    });
    const [amounts, setAmounts] = useState({
        from: "",
        to: "",
    });
    const [payments, setPayments] = useState({
        from: "",
        to: "",
    });
    const [materialIds, setMaterials] = useState(null);

    const query = useQuery();
    const history = useHistory();

    const suppliers = useSelector((state) => {
        return state.Suppliers.all;
    });

    const materials = useSelector((state) => {
        return state.Materials.all;
    });

    const invoicesFilterData = [
        {
            id: 0,
            label: "Status",
            options: [
                {
                    id: 0,
                    value: "allStatus",
                    label: "All Status",
                    checked: status === "allStatus",
                    onChange: (e) => setStatus(e.target.value),
                },
                {
                    id: 1,
                    value: "unpaid",
                    label: "Unpaid",
                    checked: status === "unpaid",
                    onChange: (e) => setStatus(e.target.value),
                },
                {
                    id: 2,
                    value: "paid",
                    label: "Paid",
                    checked: status === "paid",
                    onChange: (e) => setStatus(e.target.value),
                },
            ],
            type: "input",
            inputType: "radio",
        },
        {
            id: 2,
            label: "Supplier",
            options: suppliers.map((s) => {
                return {
                    value: s.id,
                    label: s.name,
                };
            }),
            type: "select-multiple",
            onChange: (e) => onSupplierChanges(e),
        },
        {
            id: 3,
            label: "Materials",
            options: materials.map((s) => {
                return {
                    value: s.id,
                    label: s.name,
                };
            }),
            type: "select-multiple",
            onChange: (e) => onMaterialChanges(e),
        },
        {
            id: 4,
            label: `Amount`,
            valueFrom: amounts.from,
            valueTo: amounts.to,
            onChangeFrom: (e) => onAmountChanges(e.target.value, "from"),
            onChangeTo: (e) => onAmountChanges(e.target.value, "to"),
            type: "input-range",
            inputType: "number",
        },
        {
            id: 5,
            label: `Invoices Date`,
            valueFrom: dates.from,
            valueTo: dates.to,
            onChangeFrom: (e) => onDateChanged(e.target.value, "from"),
            onChangeTo: (e) => onDateChanged(e.target.value, "to"),
            type: "date",
            onReset: () => setDates({ from: "", to: "" }),
        },
        {
            id: 6,
            label: `Payment Due`,
            valueFrom: payments.from,
            valueTo: payments.to,
            onChangeFrom: (e) => onPaymentChanges(e.target.value, "from"),
            onChangeTo: (e) => onPaymentChanges(e.target.value, "to"),
            type: "date",
            onReset: () => setPayments({ from: "", to: "" }),
        },
    ];

    function onDateChanged(value, type) {
        let currentDates = { ...dates };
        currentDates[type] = value;

        setDates(currentDates);
    }

    function onPaymentChanges(value, type) {
        let currentPayments = { ...payments };
        currentPayments[type] = value;

        setPayments(currentPayments);
    }

    function onAmountChanges(value, type) {
        let currentDates = { ...amounts };
        currentDates[type] = value;

        setAmounts(currentDates);
    }

    function onMaterialChanges(event) {
        if (event) {
            setMaterials(event.map((x) => x.value));
        } else {
            setMaterials(null);
        }
    }

    function onSupplierChanges(event) {
        if (event) {
            setSupplierIds(event.map((x) => x.value));
        } else {
            setSupplierIds(null);
        }
    }

    function saveFilter() {
        query.delete("invoiceFrom");
        query.delete("invoiceTo");
        query.delete("supplierId");
        query.delete("status");
        query.delete("amountFrom");
        query.delete("amountTo");
        query.delete("paymentFrom");
        query.delete("paymentTo");
        query.delete("materialIds");

        let queryData = {
            status: status,
            invoiceFrom: dates.from,
            invoiceTo: dates.to,
            supplierId: supplierIds,
            amountFrom: amounts.from,
            amountTo: amounts.to,
            paymentFrom: payments.from,
            paymentTo: payments.to,
            materialIds: materialIds,
        };

        for (const key in queryData) {
            if (queryData[key]) {
                query.append([key], queryData[key]);
            }
        }

        history.push({ search: query.toString() });
    }

    return (
        <React.Fragment>
            <Col style={{ maxWidth: "280px" }}>
                <FilterBar
                    data={invoicesFilterData}
                    onSubmitFilter={saveFilter}
                />
            </Col>
        </React.Fragment>
    );
}

export default FilterBarInvoices;
