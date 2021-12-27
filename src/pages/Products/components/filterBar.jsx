import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col } from "reactstrap";
import { FilterBar } from "../../../component/Layout/VerticalLayout/FilterBar";
import { useQuery } from "../../../helpers/utils";

function FilterBarProducts() {
    const query = useQuery();
    const history = useHistory();

    const [productClassId, setProductClass] = useState(query.get("class"));
    const [productTypeId, setProductType] = useState(query.get("type"));
    const [productStyleId, setProductStyle] = useState(query.get("style"));

    const categories = useSelector((state) => {
        return state.ProductCategories.data;
    });

    let produtClass = categories.filter((x) => x.parentCategoryId === null);
    let productType = productClassId
        ? categories.filter(
              (pc) => pc.parentCategoryId === Number(productClassId)
          )
        : [];
    let productStyle = productTypeId
        ? categories.filter((pc) => pc.parentCategoryId === productStyleId)
        : [];

    let allProductClass = produtClass.map((c, i) => {
        return {
            id: i + 1,
            value: c.id,
            label: c.name,
            checked: Number(productClassId) === c.id,
            onChange: (e) => setProductClass(e.target.value),
        };
    });

    let allProductType = productType.map((t, i) => {
        return {
            id: i + 1,
            value: t.id,
            label: t.name,
            checked: Number(productTypeId) === t.id,
            onChange: (e) => setProductType(e.target.value),
        };
    });

    let allProductStyle = productStyle.map((t, i) => {
        return {
            id: i + 1,
            value: t.id,
            label: t.name,
            checked: Number(productStyleId) === t.id,
            onChange: (e) => setProductStyle(e.target.value),
        };
    });

    const placeHolder = (label, value, setValue) => ({
        id: 0,
        value: "",
        label: `All ${label}`,
        checked: !value,
        onChange: () => {
            if (label === "Class") {
                setProductType("");
                setProductStyle("");
            } else if (label === "Type") {
                setProductStyle("");
            }
            setValue("");
        },
    });

    allProductClass.unshift(
        placeHolder("Class", productClassId, setProductClass)
    );
    allProductType.unshift(placeHolder("Type", productTypeId, setProductType));
    allProductStyle.unshift(
        placeHolder("Style", productStyleId, setProductStyle)
    );

    const productCategoriesFilterData = [
        {
            id: 0,
            label: "Class",
            options: allProductClass,
            type: "input",
            inputType: "radio",
        },
        {
            id: 1,
            label: "Type",
            options: allProductType,
            type: "input",
            inputType: "radio",
        },
        {
            id: 2,
            label: "Style",
            options: allProductStyle,
            type: "input",
            inputType: "radio",
        },
    ];

    function saveFilter() {
        query.delete("categoryId");
        query.delete("class");
        query.delete("type");
        query.delete("style");

        let queryData = {
            class: productClassId,
            type: productTypeId,
            style: productStyleId,
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

export default FilterBarProducts;
