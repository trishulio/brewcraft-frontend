import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    FilterBar,
    stateToOptionsMultiple,
} from "../../../component/Layout/VerticalLayout/FilterBar";
import { useQuery } from "../../../helpers/utils";

function FilterBarPackaging() {
    const query = useQuery();
    const history = useHistory();

    const [parentCategoryIds, setParentCategoryId] = useState(
        query.get("category")
    );
    const [isFormChanged, setIsFormChanged] = useState(false);

    const categories = useSelector((state) => {
        return state.MaterialCategories.all.filter(
            (c) => c.parentCategoryId === 2
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
            type: "select-multiple",
            onChange: (e) => onMaterialCategoriesChanges(e),
        },
    ];

    function onMaterialCategoriesChanges(event) {
        if (event) {
            setParentCategoryId(event.map((x) => x.value));
        } else {
            setParentCategoryId(null);
        }
    }

    function saveFilter() {
        query.delete("category");

        let queryData = {
            category: parentCategoryIds,
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
                label="MaterialPackaging"
                submitDisabled={!isFormChanged}
            />
        </React.Fragment>
    );
}

export default FilterBarPackaging;
