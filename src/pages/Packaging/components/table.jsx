import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useQuery } from "../../../helpers/utils";
import Table, { Th } from "../../../component/Common/table";

export default function PackagingTable() {
    const history = useHistory();
    const query = useQuery();

    const packaging = useSelector((state) => {
        return state.Packaging.content;
    });
    function onSort(e) {
        const name = e.target.getAttribute("name");
        const sort = query.get("sort");
        let order = query.get("order");
        query.delete("sort");
        query.delete("order");
        switch (name) {
            case "packagingName":
                if (sort !== "name") {
                    order = undefined;
                }
                query.append("sort", "name");
                break;
            case "packagingUpc":
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
                    <Th name="packagingName" id="name" onSort={onSort}>
                        Name
                    </Th>
                    <th>Class</th>
                    <th>Category</th>
                    <th>Measure</th>
                    <Th name="packagingUpc" id="upc" onSort={onSort}>
                        UPC
                    </Th>
                </tr>
            </thead>
            <tbody>
                {packaging.map((packagingItem, key) => (
                    <tr
                        key={key}
                        onClick={() =>
                            history.push(
                                "/materials/packaging/" + packagingItem.id
                            )
                        }
                    >
                        <td>{packagingItem.name || "-"}</td>
                        <td>
                            {packagingItem.materialClass?.name
                                ? packagingItem.materialClass.name
                                : "-"}
                        </td>
                        <td>
                            {packagingItem.category?.name
                                ? packagingItem.category.name
                                : "-"}
                        </td>
                        <td>{packagingItem.baseQuantityUnit || "-"}</td>
                        <td>{packagingItem.upc || "-"}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
