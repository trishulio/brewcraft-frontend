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
            case "equipmentUpc":
                if (sort !== "upc") {
                    order = undefined;
                }
                query.append("sort", "upc");
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
                    <th>Class</th>
                    <th>Category</th>
                    <th>Measure</th>
                    <Th name="equipmentUpc" id="upc" onSort={onSort}>
                        UPC
                    </Th>
                </tr>
            </thead>
            <tbody>
                {equipment.map((equipment, key) => (
                    <tr
                        key={key}
                        onClick={() =>
                            history.push("/materials/equipment/" + equipment.id)
                        }
                    >
                        <td>{equipment.name || "-"}</td>
                        <td>
                            {equipment.materialClass?.name
                                ? equipment.materialClass.name
                                : "-"}
                        </td>
                        <td>
                            {equipment.category?.name
                                ? equipment.category.name
                                : "-"}
                        </td>
                        <td>{equipment.baseQuantityUnit || "-"}</td>
                        <td>{equipment.upc || "-"}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
