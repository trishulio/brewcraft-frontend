import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    FilterBar,
    stateToOptionsMultiple,
} from "../../../component/Layout/VerticalLayout/FilterBar";
import { useQuery } from "../../../helpers/utils";

function FilterBarBrews() {
    const [productIds, setProductIds] = useState(null);
    const [dates, setDates] = useState({
        startFrom: "",
        startTo: "",
        endFrom: "",
        endTo: "",
    });
    const [isFormChanged, setIsFormChanged] = useState(false);

    const query = useQuery();
    const history = useHistory();

    useEffect(() => {
        validationFilterFields();
        // eslint-disable-next-line
    }, [productIds, dates]);

    let products = useSelector((state) => {
        return state.Products.all.sort((e1, e2) =>
            e1.name.localeCompare(e2.name)
        );
    });

    const productCategoriesFilterData = [
        {
            id: 0,
            label: "Product",
            options: stateToOptionsMultiple(products),
            type: "select-multiple",
            onChange: (e) => onProductChanges(e),
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

    function onProductChanges(event) {
        if (event) {
            setProductIds(event.map((x) => x.value));
        } else {
            setProductIds(null);
        }
    }

    function validationFilterFields() {
        if (
            productIds ||
            dates.startFrom ||
            dates.endFrom ||
            dates.endTo ||
            dates.endFrom
        ) {
            setIsFormChanged(true);
        } else {
            setIsFormChanged(false);
        }
    }

    function saveFilter() {
        query.delete("product");
        query.delete("startedFrom");
        query.delete("startedTo");
        query.delete("endedFrom");
        query.delete("endedTo");

        let queryData = {
            product: productIds,
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

        history.push({ search: decodeURIComponent(query.toString()) });
    }

    return (
        <React.Fragment>
            <FilterBar
                data={productCategoriesFilterData}
                onSubmitFilter={saveFilter}
                label="Brews"
                submitDisabled={!isFormChanged}
            />
        </React.Fragment>
    );
}

export default FilterBarBrews;
