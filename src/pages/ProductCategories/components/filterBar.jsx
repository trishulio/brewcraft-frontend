import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    FilterBar,
    stateToOptionsMultiple,
} from "../../../component/Layout/VerticalLayout/FilterBar";
import { useQuery } from "../../../helpers/utils";

function FilterBarProductCategories() {
    const [parentCategoryIds, setParentCategoryId] = useState(null);
    const [isFormChanged, setIsFormChanged] = useState(false);

    const query = useQuery();
    const history = useHistory();

    const categories = useSelector((state) => {
        return state.ProductCategories.data;
    });

    useEffect(() => {
        validationFilterFields();
        // eslint-disable-next-line
    }, [parentCategoryIds]);

    function validationFilterFields() {
        if (parentCategoryIds) {
            setIsFormChanged(true);
        } else {
            setIsFormChanged(false);
        }
    }

    const productCategoriesFilterData = [
        {
            id: 0,
            label: "Parent Category",
            options: stateToOptionsMultiple(categories),
            value: parentCategoryIds,
            type: "select-multiple",
            onChange: (e) => onCategoriesChange(e),
        },
    ];

    function onCategoriesChange(event) {
        if (event) {
            setParentCategoryId(event.map((x) => x));
        } else {
            setParentCategoryId(null);
        }
    }

    function clearFilter() {
        setParentCategoryId(null);

        history.push(history.location.pathname);
    }

    function saveFilter() {
        query.delete("parent");

        let queryData = {
            parent: parentCategoryIds?.map((pc) => pc.value),
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
                data={productCategoriesFilterData}
                onSubmitFilter={saveFilter}
                label="ProductsCategories"
                submitDisabled={!isFormChanged}
                clearFilter={clearFilter}
            />
        </React.Fragment>
    );
}

export default FilterBarProductCategories;
