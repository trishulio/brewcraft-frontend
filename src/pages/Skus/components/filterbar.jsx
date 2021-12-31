import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    FilterBar,
    stateToOptionsMultiple,
} from "../../../component/Layout/VerticalLayout/FilterBar";
import { useQuery } from "../../../helpers/utils";

function FilterBarSkus() {
    const [productIds, setProductIds] = useState(null);
    const [isFormChanged, setIsFormChanged] = useState(false);

    const query = useQuery();
    const history = useHistory();

    const products = useSelector((state) => {
        return state.Products.all.sort((e1, e2) =>
            e1.name.localeCompare(e2.name)
        );
    });

    useEffect(() => {
        validationFilterFields();
        // eslint-disable-next-line
    }, [productIds]);

    const productCategoriesFilterData = [
        {
            id: 0,
            label: "Product",
            options: stateToOptionsMultiple(products),
            value: productIds,
            type: "select-multiple",
            onChange: (e) => onProductChanges(e),
        },
    ];

    function onProductChanges(event) {
        if (event) {
            setProductIds(event.map((x) => x));
        } else {
            setProductIds(null);
        }
    }

    function validationFilterFields() {
        if (productIds) {
            setIsFormChanged(true);
        } else {
            setIsFormChanged(false);
        }
    }

    function clearFilter() {
        setProductIds(null);

        history.push(history.location.pathname);
    }

    function saveFilter() {
        query.delete("product");

        let queryData = {
            product: productIds?.map((p) => p.value),
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
                label="ProductSkus"
                submitDisabled={!isFormChanged}
                clearFilter={clearFilter}
            />
        </React.Fragment>
    );
}

export default FilterBarSkus;
