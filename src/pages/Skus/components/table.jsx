import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Table, { Th } from "../../../component/Common/table";
import { useQuery } from "../../../helpers/utils";

export default function SkusTable() {
    const history = useHistory();
    const query = useQuery();

    const skus = useSelector((state) => {
        return state.Skus.content;
    });

    function onSort(e) {
        const name = e.target.getAttribute("name");
        const sort = query.get("sort");
        let order = query.get("order");
        query.delete("sort");
        query.delete("order");
        switch (name) {
            case "skuNumber":
                if (sort !== "skuNumber") {
                    order = undefined;
                }
                query.append("sort", "skuNumber");
                break;
            case "skuName":
                if (sort !== "skuName") {
                    order = undefined;
                }
                query.append("sort", "skuName");
                break;
            case "skuProduct":
                if (sort !== "product") {
                    order = undefined;
                }
                query.append("sort", "product");
                break;
            case "skuVolume":
                if (sort !== "volume") {
                    order = undefined;
                }
                query.append("sort", "volume");
                break;
            case "skuIsPackageable":
                if (sort !== "skuIsPackageable") {
                    order = undefined;
                }
                query.append("sort", "skuIsPackageable");
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
                    <Th name="skuNumber" id="skuNumber" onSort={onSort}>
                        SKU #
                    </Th>
                    <Th name="skuName" id="skuName" onSort={onSort}>
                        Name
                    </Th>
                    <Th name="skuProduct" id="product" onSort={onSort}>
                        Product
                    </Th>
                    <Th name="skuVolume" id="volume" onSort={onSort}>
                        Volume
                    </Th>
                    <Th
                        name="skuIsPackageable"
                        id="skuIsPackageable"
                        onSort={onSort}
                    >
                        Is Packageable From Brew
                    </Th>
                </tr>
            </thead>
            <tbody>
                {skus.map((sku, key) => (
                    <tr
                        key={key}
                        onClick={() => history.push("/sku/" + sku.id)}
                    >
                        <td>{sku.number}</td>
                        <td>{sku.name}</td>
                        <td>{sku.product.name}</td>
                        <td>
                            {sku.quantity?.value
                                ? sku.quantity.value + " " + sku.quantity.symbol
                                : "-"}
                        </td>
                        <td>{sku.isPackageable ? "true" : "false"}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
