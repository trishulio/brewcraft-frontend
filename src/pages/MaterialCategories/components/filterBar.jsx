import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FilterBar } from "../../../component/Layout/VerticalLayout/FilterBar";
import { useQuery } from "../../../helpers/utils";

function FilterBarMaterialCategories() {
    const query = useQuery();
    const history = useHistory();

    const [parentCategoryId, setParentCategoryId] = useState(
        query.get("category")
    );
    const [isFormChanged, setIsFormChanged] = useState(false);

    const categories = useSelector((state) => {
        return state.MaterialCategories.all;
    });

    const materialCategories = categories.filter(
        (mc) => mc.parentCategoryId === null
    );

    useEffect(() => {
        validationFilterFields();
        // eslint-disable-next-line
    }, [parentCategoryId]);

    function validationFilterFields() {
        if (parentCategoryId) {
            setIsFormChanged(true);
        } else {
            setIsFormChanged(false);
        }
    }

    let allProductCategories = materialCategories.map((c, i) => {
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
        label: allProductCategories.length > 0 ? "All" : "No option",
        checked: !parentCategoryId,
        onChange: (e) => setParentCategoryId(""),
        disabled: allProductCategories.length === 0,
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

    function clearFilter() {
        setParentCategoryId(false);

        history.push(history.location.pathname);
    }

    function saveFilter() {
        query.delete("category");

        let queryData = {
            category: parentCategoryId,
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
                label="ProductCategories"
                submitDisabled={!isFormChanged}
                clearFilter={clearFilter}
            />
        </React.Fragment>
    );
}

export default FilterBarMaterialCategories;
