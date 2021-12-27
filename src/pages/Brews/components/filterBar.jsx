import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col } from "reactstrap";
import { FilterBar } from "../../../component/Layout/VerticalLayout/FilterBar";
import { useQuery } from "../../../helpers/utils";

function FilterBarBrews() {
    const [productId, setProductId] = useState("");
    const [dates, setDates] = useState({
        startFrom: "",
        startTo: "",
        endFrom: "",
        endTo: "",
    });

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
            onChange: (e) => setProductId(e.target.value),
        };
    });

    const placeHolder = {
        id: 0,
        value: "",
        label: "All products",
        checked: !productId,
        onChange: (e) => setProductId(""),
    };

    allProducts.unshift(placeHolder);

    const productCategoriesFilterData = [
        {
            id: 0,
            label: "Product",
            options: allProducts,
            type: "input",
            inputType: "radio",
        },
        {
            id: 1,
            label: `Batches start`,
            valueFrom: dates.startFrom,
            valueTo: dates.startTo,
            onChangeFrom: (e) => onDateChanged(e.target.value, "startFrom"),
            onChangeTo: (e) => onDateChanged(e.target.value, "startTo"),
            type: "date",
            onReset: () => setDates({ ...dates, startFrom: "", startTo: "" }),
        },
        {
            id: 2,
            label: `Batches End`,
            valueFrom: dates.endFrom,
            valueTo: dates.endTo,
            onChangeFrom: (e) => onDateChanged(e.target.value, "endFrom"),
            onChangeTo: (e) => onDateChanged(e.target.value, "endTo"),
            type: "date",
            onReset: () => setDates({ ...dates, endFrom: "", endTo: "" }),
        },
    ];

    function onDateChanged(value, type) {
        let currentDates = { ...dates };
        currentDates[type] = value;

        setDates(currentDates);
    }

    function saveFilter() {
        query.delete("product");
        query.delete("startedFrom");
        query.delete("startedTo");
        query.delete("endedFrom");
        query.delete("endedTo");

        let queryData = {
            product: productId,
            startedFrom: dates.startFrom,
            startedTo: dates.startTo,
            endedFrom: dates.endFrom,
            endedTo: dates.endTo,
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
                    label="Brews"
                />
            </Col>
        </React.Fragment>
    );
}

export default FilterBarBrews;
