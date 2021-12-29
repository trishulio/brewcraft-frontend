import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FilterBar } from "../../../component/Layout/VerticalLayout/FilterBar";
import { useQuery } from "../../../helpers/utils";

function FilterBarSupplierContacts() {
    const query = useQuery();
    const history = useHistory();

    const [supplierIds, setSupplier] = useState(null);

    const suppliers = useSelector((state) => {
        return state.Suppliers.all;
    });

    const SupplierFilterData = [
        {
            id: 0,
            label: "Supplier",
            type: "select-multiple",
            options: suppliers.map((s) => {
                return {
                    value: s.id,
                    label: s.name,
                };
            }),
            onChange: (e) => onSupplierChanges(e),
        },
    ];

    function onSupplierChanges(event) {
        if (event) {
            setSupplier(event.map((x) => x.value));
        } else {
            setSupplier(null);
        }
    }

    function saveFilter() {
        query.delete("supplier");

        let queryData = {
            supplier: supplierIds,
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
            <FilterBar
                data={SupplierFilterData}
                onSubmitFilter={saveFilter}
                label="Supplier"
            />
        </React.Fragment>
    );
}

export default FilterBarSupplierContacts;
