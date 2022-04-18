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

    const [equipmentTypes, setEquipmentTypes] = useState(query.get("type_ids"));
    const [isFormChanged, setIsFormChanged] = useState(false);

    const types = [
        { id: "1", name: "Boil Kettle" },
        { id: "2", name: "Fermenter" },
        { id: "3", name: "Serving Tank" },
        { id: "4", name: "Mix Tank" },
        { id: "5", name: "Tote" },
        { id: "6", name: "Whirl Pool" },
        { id: "7", name: "Barrel" },
        { id: "8", name: "Brite Tank" },
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
        query.delete("type_ids");

        let queryData = {
            type_ids: equipmentTypes?.map((pc) => pc.value),
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
