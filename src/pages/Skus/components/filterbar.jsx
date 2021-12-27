import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col } from "reactstrap";
import { FilterBar } from "../../../component/Layout/VerticalLayout/FilterBar";
import { useQuery } from "../../../helpers/utils";

function FilterBarSkus() {
    const [productId, setProductId] = useState("");

    const query = useQuery();
    const history = useHistory();

    const products = useSelector((state) => {
        return state.Products.all.sort((e1, e2) =>
            e1.name.localeCompare(e2.name)
        );
    });

    let allProducts = products.map((c, i) => {
        return {
            id: i + 1,
            value: c.id,
            label: c.name,
            checked: Number(productId) === c.id,
            onChange: (e) => setProductId(e.target.value)
        }
    });

    const placeHolder = {
        id: 0,
        value: "",
        label: "All products",
        checked: !productId,
        onChange: (e) => setProductId("")
    }

    allProducts.unshift(placeHolder)

    const productCategoriesFilterData = [
        {
            id: 0,
            label: "Product",
            options: allProducts,
            type: "input",
            inputType: "radio",
        },
    ];

    function saveFilter() {
        query.delete("productId");

        let queryData = {
            productId,
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
                    label="ProductCategories"
                />
            </Col>
        </React.Fragment>
    );
}

export default FilterBarSkus;
