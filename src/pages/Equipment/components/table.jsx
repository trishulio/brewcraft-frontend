import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Table, { Th } from "../../../component/Common/table";
import { useQuery } from "../../../helpers/utils";

export default function EquipmentTable() {
    const history = useHistory();
    const query = useQuery();

    const equipment = useSelector((state) => {
        return state.Equipment.content;
    });

    function onSort(e) {
        const name = e.target.getAttribute("name");
        const sort = query.get("sort");
        let order = query.get("order");
        query.delete("sort");
        query.delete("order");
        switch (name) {
            case "equipmentName":
                if (sort !== "name") {
                    order = undefined;
                }
                query.append("sort", "name");
                break;
            case "equipmentType":
                if (sort !== "type") {
                    order = undefined;
                }
                query.append("sort", "type");
                break;
            case "equipmentStatus":
                if (sort !== "status") {
                    order = undefined;
                }
                query.append("sort", "status");
                break;
            case "equipmentMaxCapacity":
                if (sort !== "maxCapacity") {
                    order = undefined;
                }
                query.append("sort", "maxCapacity");
                break;
            default:
                break;
        }
        if (!order || order !== "asc") {
            query.append("order", "asc");
        } else {
            query.append("order", "desc");
        }
        history.push({ search: query.toString() });
    }

    return (
        <Table hover>
            <thead>
                <tr>
                    <Th name="equipmentName" id="name" onSort={onSort}>
                        Name
                    </Th>
                    <Th name="equipmentType" id="type" onSort={onSort}>
                        Type
                    </Th>
                    <Th name="equipmentStatus" id="status" onSort={onSort}>
                        Status
                    </Th>
                    <Th
                        name="equipmentMaxCapacity"
                        id="maxCapacity"
                        onSort={onSort}
                    >
                        Max Capactity
                    </Th>
                </tr>
            </thead>
            <tbody>
                {equipment.map((equipment, key) => (
                    <tr
                        key={key}
                        onClick={() =>
                            history.push("/equipment/" + equipment.id)
                        }
                    >
                        <td>{equipment.name || "-"}</td>
                        <td>{equipment.type.name}</td>
                        <td>{equipment.status}</td>
                        <td>
                            {equipment.maxCapacity.value +
                                " " +
                                equipment.maxCapacity.symbol}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
