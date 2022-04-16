import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
    FilterBar,
    stateToOptionsMultiple,
} from "../../../component/Layout/VerticalLayout/FilterBar";
import { useQuery } from "../../../helpers/utils";

function FilterBarEquipment() {
    const query = useQuery();
    const history = useHistory();

    const [equipmentTypes, setEquipmentTypes] = useState(query.get("types"));
    const [isFormChanged, setIsFormChanged] = useState(false);

    const types = [
        { id: "Boil Kettle", name: "Boil Kettle" },
        { id: "Fermenter", name: "Fermenter" },
        { id: "Serving Tank", name: "Serving Tank" },
        { id: "Mix Tank", name: "Mix Tank" },
        { id: "Tote", name: "Tote" },
        { id: "Whirl Pool", name: "Whirl Pool" },
        { id: "Barrel", name: "Barrel" },
        { id: "Brite Tank", name: "Brite Tank" },
    ];

    const EquipmentTypeFilterData = [
        {
            id: 0,
            label: "Equipment Type",
            options: stateToOptionsMultiple(types),
            value: equipmentTypes,
            type: "select-multiple",
            onChange: (e) => {
                if (e) {
                    setEquipmentTypes(e.map((x) => x));
                } else {
                    setEquipmentTypes(null);
                }
            },
        },
    ];

    useEffect(() => {
        validationFilterFields();
        // eslint-disable-next-line
    }, [equipmentTypes]);

    function validationFilterFields() {
        if (equipmentTypes) {
            setIsFormChanged(true);
        } else {
            setIsFormChanged(false);
        }
    }

    function clearFilter() {
        setEquipmentTypes(null);
        history.push(history.location.pathname);
    }

    function saveFilter() {
        query.delete("types");

        let queryData = {
            types: equipmentTypes?.map((pc) => pc.value),
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
                data={EquipmentTypeFilterData}
                onSubmitFilter={saveFilter}
                label="Equipment"
                submitDisabled={!isFormChanged}
                clearFilter={clearFilter}
            />
        </React.Fragment>
    );
}

export default FilterBarEquipment;
