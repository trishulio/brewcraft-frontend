import React from "react";
import { useHistory } from "react-router-dom";
import { Col } from "reactstrap";
import { FilterBar } from "../../../component/Layout/VerticalLayout/FilterBar";
import { useQuery } from "../../../helpers/utils";

function FilterBarSupplier() {
    const query = useQuery();
    const history = useHistory();

    const SupplierFilterData = [
        {
            id: 0,
            label: "Name",
            type: "input",
            inputType: "text",
        },
    ];

    function saveFilter() {
        query.delete("category");
        query.delete("material");

        history.push({ search: query.toString() });
    }

    return (
        <React.Fragment>
            <Col style={{ maxWidth: "280px" }}>
                <FilterBar
                    data={SupplierFilterData}
                    onSubmitFilter={saveFilter}
                    label="Supplier"
                />
            </Col>
        </React.Fragment>
    );
}

export default FilterBarSupplier;
