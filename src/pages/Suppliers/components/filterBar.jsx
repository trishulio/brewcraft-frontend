import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { FilterBar } from "../../../component/Layout/VerticalLayout/FilterBar";
import { useQuery } from "../../../helpers/utils";

function FilterBarSupplier() {
    const [name, setName] = useState("");
    const query = useQuery();
    const history = useHistory();

    const SupplierFilterData = [
        {
            id: 0,
            label: "Name",
            type: "input",
            value: name,
            inputType: "text",
            onChange: (e) => setName(e.target.value),
        },
    ];

    function clearFilter() {
        setName("");

        history.push(history.location.pathname);
    }

    function saveFilter() {
        query.delete("category");
        query.delete("material");

        history.push({ search: query.toString() });
    }

    return (
        <React.Fragment>
            <FilterBar
                data={SupplierFilterData}
                onSubmitFilter={saveFilter}
                label="Supplier"
                clearFilter={clearFilter}
            />
        </React.Fragment>
    );
}

export default FilterBarSupplier;
