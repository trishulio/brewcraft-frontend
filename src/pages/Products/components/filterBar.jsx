import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FilterBar, stateToOptionsMultiple } from "../../../component/Layout/VerticalLayout/FilterBar";
import { useQuery } from "../../../helpers/utils";

function FilterBarProducts() {
    const query = useQuery();
    const history = useHistory();

    const [productClassIds, setProductClass] = useState(query.get("class"));
    const [productTypeIds, setProductType] = useState(query.get("type"));
    const [productStyleIds, setProductStyle] = useState(query.get("style"));
    const [isFormChanged, setIsFormChanged] = useState(false);

    const categories = useSelector((state) => {
        return state.ProductCategories.data;
    });

    useEffect(() => {
        validationFilterFields();
        // eslint-disable-next-line
    }, [productClassIds, productTypeIds, productStyleIds])

    let produtClass = categories.filter((x) => x.parentCategoryId === null);
    let productType = productClassIds
        ? categories.filter(
              (pc) => productClassIds.includes(pc.parentCategoryId)
          )
        : [];
    let productStyle = productTypeIds
        ? categories.filter((pc) => productTypeIds.includes(pc.parentCategoryId))
        : [];

    const productCategoriesFilterData = [
        {
            id: 0,
            label: "Class",
            options: stateToOptionsMultiple(produtClass),
            type: "select-multiple",
            onChange: (e) => onProductClassChanges(e),
        },
        {
            id: 1,
            label: "Type",
            options: stateToOptionsMultiple(productType),
            type: "select-multiple",
            onChange: (e) => onProductTypeChanges(e),
        },
        {
            id: 2,
            label: "Style",
            options: stateToOptionsMultiple(productStyle),
            type: "select-multiple",
            onChange: (e) => onProductStyleChanges(e),
        },
    ];

    function onProductClassChanges(event) {
        if (event) {
            setProductClass(event.map((x) => x.value));
        } else {
            setProductClass(null);
        }
    }

    function onProductTypeChanges(event) {
        if (event) {
            setProductType(event.map((x) => x.value));
        } else {
            setProductType(null);
        }
    }

    function onProductStyleChanges(event) {
        if (event) {
            setProductStyle(event.map((x) => x.value));
        } else {
            setProductStyle(null);
        }
    }

    function validationFilterFields() {
        if (productClassIds || productTypeIds || productStyleIds) {
            setIsFormChanged(true);
        } else {
            setIsFormChanged(false)
        }
    }

    function saveFilter() {
        query.delete("categoryId");
        query.delete("class");
        query.delete("type");
        query.delete("style");

        let queryData = {
            class: productClassIds,
            type: productTypeIds,
            style: productStyleIds,
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
                data={productCategoriesFilterData}
                onSubmitFilter={saveFilter}
                label="ProductCategories"
                submitDisabled={!isFormChanged}
            />
        </React.Fragment>
    );
}

export default FilterBarProducts;
