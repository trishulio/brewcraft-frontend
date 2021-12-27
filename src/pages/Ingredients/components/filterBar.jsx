import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col } from "reactstrap";
import { FilterBar } from "../../../component/Layout/VerticalLayout/FilterBar";
import { useQuery } from "../../../helpers/utils";

function FilterBarIngredients() {
    const query = useQuery();
    const history = useHistory();

    const [parentCategoryId, setParentCategoryId] = useState(
        query.get("category")
    );

    const categories = useSelector((state) => {
        return state.MaterialCategories.all.filter(
            (c) => c.parentCategoryId === 1
        );
    });

    let allMaterialtCategories = categories.map((c, i) => {
        return {
            id: i + 1,
            value: c.id,
            label: c.name,
            checked: Number(parentCategoryId) === c.id,
            onChange: (e) => setParentCategoryId(e.target.value),
        };
    });

    const placeHolder = {
        id: 0,
        value: "",
        label: "All",
        checked: !parentCategoryId,
        onChange: (e) => setParentCategoryId(""),
    };

    allMaterialtCategories.unshift(placeHolder);

    const MaterialPackagingFilterData = [
        {
            id: 0,
            label: "Category",
            options: allMaterialtCategories,
            type: "input",
            inputType: "radio",
        },
    ];

    function saveFilter() {
        query.delete("category");

        let queryData = {
            category: parentCategoryId,
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
                    data={MaterialPackagingFilterData}
                    onSubmitFilter={saveFilter}
                    label="MaterialIngredients"
                />
            </Col>
        </React.Fragment>
    );
}

export default FilterBarIngredients;
