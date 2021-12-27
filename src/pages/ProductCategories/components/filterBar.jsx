import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col } from "reactstrap";
import { FilterBar } from "../../../component/Layout/VerticalLayout/FilterBar";
import { useQuery } from "../../../helpers/utils";

function FilterBarProductCategories() {
    const [parentCategoryId, setParentCategoryId] = useState("");

    const query = useQuery();
    const history = useHistory();

    const categories = useSelector((state) => {
        return state.ProductCategories.data;
    });

    let allProductCategories = categories.map((c, i) => {
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

    allProductCategories.unshift(placeHolder);

    const productCategoriesFilterData = [
        {
            id: 0,
            label: "Parent Category",
            options: allProductCategories,
            type: "input",
            inputType: "radio",
        },
    ];

    function saveFilter() {
        query.delete("parent");

        let queryData = {
            parent: parentCategoryId,
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
                    data={productCategoriesFilterData}
                    onSubmitFilter={saveFilter}
                    label="ProductsCategories"
                />
            </Col>
        </React.Fragment>
    );
}

export default FilterBarProductCategories;
