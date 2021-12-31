import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FilterBar } from "../../../component/Layout/VerticalLayout/FilterBar";
import { useQuery } from "../../../helpers/utils";

function FilterBarInvoices() {
    const [status, setStatus] = useState(["paid", "unpaid"]);
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
    const [isFormChanged, setIsFormChanged] = useState(false);

    const query = useQuery();
    const history = useHistory();

    const suppliers = useSelector((state) => {
        return state.Suppliers.all;
    });

    const materials = useSelector((state) => {
        return state.Materials.all;
    });

    useEffect(() => {
        validationFilterFields();
        // eslint-disable-next-line
    }, [status, supplierIds, dates, amounts, payments, materialIds]);

    function validationFilterFields() {
        if (
            status ||
            supplierIds ||
            dates.from ||
            dates.to ||
            amounts.from ||
            amounts.to ||
            payments.from ||
            payments.to ||
            materialIds
        ) {
            setIsFormChanged(true);
        } else {
            setIsFormChanged(false);
        }
    }

    const invoicesFilterData = [
        {
            id: 0,
            label: "Status",
            options: [
                {
                    id: 0,
                    value: "unpaid",
                    label: "Unpaid",
                    checked: status.includes("unpaid"),
                    onChange: (e) => onChangeStatus(e.target.value),
                },
                {
                    id: 1,
                    value: "paid",
                    label: "Paid",
                    checked: status.includes("paid"),
                    onChange: (e) => onChangeStatus(e.target.value),
                },
            ],
            type: "input",
            inputType: "checkbox",
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
            value: supplierIds,
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
            value: materialIds,
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

    function onChangeStatus(value) {
        let currentState = [...status];
        if (currentState.includes(value)) {
            currentState = currentState.filter((s) => s !== value);
        } else {
            currentState.push(value);
        }
        setStatus(currentState);
    }

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
            setMaterials(event.map((x) => x));
        } else {
            setMaterials(null);
        }
    }

    function onSupplierChanges(event) {
        if (event) {
            setSupplierIds(event.map((x) => x));
        } else {
            setSupplierIds(null);
        }
    }

    function clearFilter() {
        setStatus(["paid", "unpaid"]);
        setDates({
            from: "",
            to: "",
        });
        setAmounts({
            from: "",
            to: "",
        });
        setPayments({
            from: "",
            to: "",
        });
        setSupplierIds(null);
        setMaterials(null);

        history.push(history.location.pathname);
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
            status: status && status.length > 0 && status,
            invoiceFrom: dates.from,
            invoiceTo: dates.to,
            supplierId: supplierIds?.map((s) => s.value),
            amountFrom: amounts.from,
            amountTo: amounts.to,
            paymentFrom: payments.from,
            paymentTo: payments.to,
            materialIds: materialIds?.map((m) => m.value),
        };

        for (const key in queryData) {
            if (queryData[key]) {
                query.append([key], queryData[key]);
            }
        }

        history.push({ search: decodeURIComponent(query.toString()) });
    }

    return (
        <React.Fragment>
            <FilterBar
                data={invoicesFilterData}
                onSubmitFilter={saveFilter}
                submitDisabled={!isFormChanged}
                clearFilter={clearFilter}
            />
        </React.Fragment>
    );
}

export default FilterBarInvoices;
