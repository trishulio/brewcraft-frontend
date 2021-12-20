import React, { useCallback } from "react";
import { MDBDataTable } from "mdbreact";
import { map } from "lodash";
import { Button } from "reactstrap";
/**
 *
 * @param {Object} facilities facilities should be non-empty array object for table rendering
 * @param {Function}  editFn non-mandatory javascript function
 */
export default function EquipmentTable({
    equipment,
    editEquipmentItem,
    deleteEquipmentItem,
}) {
    const tabledata = [
        {
            label: "Name",
            field: "name",
            sort: "asc",
            width: 150,
        },
        {
            label: "Type",
            field: "type",
            sort: "asc",
            width: 200,
        },
        {
            label: "Facility",
            field: "facility",
            sort: "asc",
            width: 270,
        },
        {
            label: "Max Capacity",
            field: "maxCapacity",
            sort: "asc",
            width: 200,
        },
        {
            label: "Status",
            field: "status",
            sort: "asc",
            width: 270,
        },
        {
            field: "edit",
        },
        {
            field: "delete",
        },
    ];
    const rowEvent = useCallback(() => {
        return map(equipment, (row) => {
            return {
                ...row,
                facility: row.facility.name,
                maxCapacity:
                    row.maxCapacity.value + " " + row.maxCapacity.symbol,
                edit: (
                    <Button onClick={() => editEquipmentItem(row.id)}>
                        Edit
                    </Button>
                ),
                delete: (
                    <Button onClick={() => deleteEquipmentItem(row.id)}>
                        Delete
                    </Button>
                ),
            };
        });
    }, [equipment, editEquipmentItem, deleteEquipmentItem]);
    return (
        <MDBDataTable
            responsive
            hover
            bordered
            data={{
                columns: tabledata,
                rows: rowEvent(),
            }}
        />
    );
}
