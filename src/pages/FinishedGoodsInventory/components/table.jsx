import React from "react";
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useQuery } from "../../../helpers/utils";
import Table, { Th } from "../../../component/Common/table";

export default function FinishedGoodsInventoryTable() {
    const history = useHistory();
    const query = useQuery();

    const finishedGoodsInventory = useSelector(state => {
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
            history.push({search: query.toString()});
        } else if (name === "fgDescription") {
            if (sort !== "description" || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            query.append("sort", "description");
            history.push({search: query.toString()});
        } else if (name === "fgProductName") {
            if (sort !== "productName" || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            query.append("sort", "productName");
            history.push({search: query.toString()});
        } else if (name === "fgQuantity") {
            if (sort !== "quantity" || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            query.append("sort", "quantity");
            history.push({search: query.toString()});
        }
    }

    return (
        <Table hover>
            <thead>
                <tr>
                    <th></th>
                    <Th
                        name="fgSkuName"
                        id="skuName"
                        onSort={onSort}
                    >
                        Sku
                    </Th>
                    <Th
                        name="fgDescription"
                        id="description"
                        onSort={onSort}
                    >
                        Description
                    </Th>
                    <Th
                        name="fgProductName"
                        id="productName"
                        onSort={onSort}
                    >
                        Product
                    </Th>
                    <Th
                        name="fgQuantity"
                        id="quantity"
                        onSort={onSort}
                    >
                        Quantity
                    </Th>
                </tr>
            </thead>
            <tbody>
                {
                    finishedGoodsInventory.map((finishedGood, key) =>
                        <tr key={key} onClick={() => history.push("/finished-goods/")}>
                            <td></td>
                            <td>{finishedGood.sku.name}</td>
                            <td>{finishedGood.sku.description}</td>
                            <td>{finishedGood.sku.product.name}</td>
                            <td>{finishedGood.quantity.value}</td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
    );
}
