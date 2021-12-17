import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Table, { Th } from "../../../component/Common/table";
import { useQuery } from "../../../helpers/utils";

export default function SkusTable() {
    const history = useHistory();
    const query = useQuery();

    const skus = useSelector(state => {
        return state.Skus.content;
    });

    function onSort(e) {
        const name = e.target.getAttribute("name");
        const sort = query.get("sort");
        let order = query.get("order");
        query.delete("sort");
        query.delete("order");
        switch (name) {
            case "sku":
                if (sort !== "sku") {
                    order = undefined;
                }
                query.append("sort", "sku");
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

    return  (
        <Table hover>
            <thead>
                <tr>
                    <Th
                        name="sku"
                        id="sku"
                        onSort={onSort}
                    >
                        Sku
                    </Th>
                    <Th
                        name="skuProduct"
                        id="product"
                        onSort={onSort}
                    >
                        Product
                    </Th>
                    <Th
                        name="skuVolume"
                        id="volume"
                        onSort={onSort}
                    >
                        Volume
                    </Th>
                </tr>
            </thead>
            <tbody>
                {
                    skus.map((sku, key) =>
                        <tr key={key} onClick={() => history.push("/sku/" + sku.id)}>
                            <td>{sku.name}</td>
                            <td>{sku.product.name}</td>
                            <td>{sku.quantity?.value ? sku.quantity.value + " " + sku.quantity.symbol : "-"}</td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
    );
}