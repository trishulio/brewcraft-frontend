import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "../../../helpers/utils";
import Table, { Th } from "../../../component/Common/table";

export default function FinishedGoodsInventoryTable() {
    const history = useHistory();
    const query = useQuery();

    const finishedGoodsInventory = useSelector((state) => {
        return state.FinishedGoodsInventory.content;
    });

    function onSort(e) {
        const name = e.target.getAttribute("name");
        const sort = query.get("sort");
        const order = query.get("order");
        query.delete("sort");
        query.delete("order");
        if (name === "fgSkuName") {
            if (sort !== "skuName" || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            query.append("sort", "skuName");
            history.push({ search: query.toString() });
        } else if (name === "fgSkuNumber") {
            if (sort !== "skuNumber" || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            query.append("sort", "skuNumber");
            history.push({ search: query.toString() });
        } else if (name === "fgProductName") {
            if (sort !== "productName" || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            query.append("sort", "productName");
            history.push({ search: query.toString() });
        } else if (name === "fgQuantity") {
            if (sort !== "quantity" || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            query.append("sort", "quantity");
            history.push({ search: query.toString() });
        }
    }

    return (
        <Table hover>
            <thead>
                <tr>
                    <th></th>
                    <Th name="fgSkuNumber" id="skuNumber" onSort={onSort}>
                        SKU #
                    </Th>
                    <Th name="fgSkuName" id="skuName" onSort={onSort}>
                        Name
                    </Th>
                    <Th name="fgProductName" id="productName" onSort={onSort}>
                        Product
                    </Th>
                    <Th name="fgQuantity" id="quantity" onSort={onSort}>
                        Quantity Avail.
                    </Th>
                </tr>
            </thead>
            <tbody>
                {finishedGoodsInventory.map((finishedGood, key) => (
                    <tr
                        key={key}
                        onClick={() =>
                            history.push(
                                "/inventory/finished-goods?sku_ids=" +
                                    finishedGood.sku.id
                            )
                        }
                    >
                        <td></td>
                        <td>{finishedGood.sku.number}</td>
                        <td>{finishedGood.sku.name}</td>
                        <td>{finishedGood.sku.product.name}</td>
                        <td>{finishedGood.quantity.value}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
