import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col } from "reactstrap";
import { FilterBar } from "../../../component/Layout/VerticalLayout/FilterBar";
import { useQuery } from "../../../helpers/utils";

function FilterBarRawMaterials() {
    const query = useQuery();
    const history = useHistory();

    const [materialCategoryIds, setMaterialCategory] = useState(null);
    const [materialIds, setMaterials] = useState(null);

    const categories = useSelector((state) => {
        return state.MaterialCategories.all.filter(
            (c) => c.parentCategoryId !== null
        );
    });

    const materials = useSelector((state) => {
        return state.Materials.all;
    });

    const MaterialPackagingFilterData = [
        {
            id: 0,
            label: "Category",
            options: categories.map((c) => {
                return {
                    value: c.id,
                    label: c.name,
                };
            }),
            type: "select-multiple",
            inputType: "radio",
            onChange: (e) => onMaterialCategoryChanges(e),
        },
        {
            id: 1,
            label: "Materials",
            options: materials.map((s) => {
                return {
                    value: s.id,
                    label: s.name,
                };
            }),
            type: "select-multiple",
            onChange: (e) => onMaterialChanges(e),
        },
    ];

    function onMaterialChanges(event) {
        if (event) {
            setMaterials(event.map((x) => x.value));
        } else {
            setMaterials(null);
        }
    }

    function onMaterialCategoryChanges(event) {
        if (event) {
            setMaterialCategory(event.map((x) => x.value));
        } else {
            setMaterialCategory(null);
        }
    }

    function saveFilter() {
        query.delete("category");
        query.delete("material");

        let queryData = {
            category: materialCategoryIds,
            material: materialIds,
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
                    data={MaterialPackagingFilterData}
                    onSubmitFilter={saveFilter}
                    label="MaterialInventory"
                />
            </Col>
        </React.Fragment>
    );
}

export default FilterBarRawMaterials;
