import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Table, { Th } from "../../../component/Common/table";
import { useQuery } from "../../../helpers/utils";

export default function RawMaterialsList() {
    const history = useHistory();
    const query = useQuery();

    const rawMaterials = useSelector((state) => {
        return state.RawMaterials.content;
    });

    function onSort(e) {
        const name = e.target.getAttribute("name");
        const sort = query.get("sort");
        let order = query.get("order");
        query.delete("sort");
        query.delete("order");
        switch (name) {
            case "rawMaterialsName":
                if (sort !== "name") {
                    order = undefined;
                }
                query.append("sort", "name");
                break;
            case "rawMaterialsMaterialClass":
                if (sort !== "class") {
                    order = undefined;
                }
                query.append("sort", "class");
                break;
            case "rawMaterialsCategory":
                if (sort !== "category") {
                    order = undefined;
                }
                query.append("sort", "category");
                break;
            case "rawMaterialsUpc":
                if (sort !== "upc") {
                    order = undefined;
                }
                query.append("sort", "upc");
                break;
            case "rawMaterialAvail":
                if (sort !== "available") {
                    order = undefined;
                }
                query.append("sort", "availalbe");
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
        <React.Fragment>
            {console.log(rawMaterials)}
            <Table>
                <thead>
                    <tr>
                        <Th name="rawMaterialsName" id="name" onSort={onSort}>
                            Name
                        </Th>
                        <th>Lot Num.</th>
                        {/* <th>Invoice</th> */}
                        <Th
                            name="rawMaterialsMaterialClass"
                            id="class"
                            onSort={onSort}
                        >
                            Material Class
                        </Th>
                        <Th
                            name="rawMaterialsCategory"
                            id="category"
                            onSort={onSort}
                        >
                            Category
                        </Th>
                        <Th name="rawMaterialsUpc" id="upc" onSort={onSort}>
                            UPC
                        </Th>
                        <Th
                            name="rawMaterialsAvail"
                            id="available"
                            onSort={onSort}
                        >
                            Avail.
                        </Th>
                    </tr>
                </thead>
                <tbody>
                    {rawMaterials.map((rawMaterial, key) => (
                        <tr key={key}>
                            <td>
                                <Link
                                    to={
                                        "/raw-materials/" +
                                        rawMaterial.material.id
                                    }
                                >
                                    {rawMaterial.material.name}
                                </Link>
                            </td>
                            <td>{rawMaterial.lotNumber}</td>
                            {/* <td>{rawMaterial.invoice.invoiceNumber}</td> */}
                            <td>{rawMaterial.material.materialClass.name}</td>
                            <td>
                                {rawMaterial.material.category?.name || "-"}
                            </td>
                            <td>{rawMaterial.material.upc || "-"}</td>
                            <td>
                                {rawMaterial.quantity.value}{" "}
                                {rawMaterial.quantity.symbol}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </React.Fragment>
    );
}
