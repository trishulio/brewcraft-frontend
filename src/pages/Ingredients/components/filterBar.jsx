import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    FilterBar,
    stateToOptionsMultiple,
} from "../../../component/Layout/VerticalLayout/FilterBar";
import { useQuery } from "../../../helpers/utils";

function FilterBarIngredients() {
    const query = useQuery();
    const history = useHistory();

    const [parentCategoryIds, setParentCategoryId] = useState(
        query.get("category")
    );
    const [isFormChanged, setIsFormChanged] = useState(false);

    const categories = useSelector((state) => {
        return state.MaterialCategories.all.filter(
            (c) => c.parentCategoryId === 1
        );
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

    const MaterialPackagingFilterData = [
        {
            id: 0,
            label: "Category",
            options: stateToOptionsMultiple(categories),
            value: parentCategoryIds,
            type: "select-multiple",
            onChange: (e) => onMaterialCategoriesChanges(e),
        },
    ];

    function onMaterialCategoriesChanges(event) {
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
        query.delete("category");

        let queryData = {
            category: parentCategoryIds?.map((pc) => pc.value),
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
                data={MaterialPackagingFilterData}
                onSubmitFilter={saveFilter}
                label="MaterialIngredients"
                submitDisabled={!isFormChanged}
                clearFilter={clearFilter}
            />
        </React.Fragment>
    );
}

export default FilterBarIngredients;
