import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "../../../helpers/utils";
import Table, { Th } from "../../../component/Common/table";

export default function FinishedGoodsTable() {
    const history = useHistory();
    const query = useQuery();

    const finishedGoods = useSelector((state) => {
        return state.FinishedGoods.content;
    });

    function onSort(e) {
        const name = e.target.getAttribute("name");
        const sort = query.get("sort");
        const order = query.get("order");
        query.delete("sort");
        query.delete("order");
        if (name === "fgSku") {
            if (sort !== "sku" || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            query.append("sort", "sku");
            history.push({ search: query.toString() });
        } else if (name === "fgProduct") {
            if (sort !== "product" || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            query.append("sort", "product");
            history.push({ search: query.toString() });
        } else if (name === "fgBatches") {
            if (sort !== "batches" || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            query.append("sort", "batches");
            history.push({ search: query.toString() });
        } else if (name === "fgPackagedOn") {
            if (sort !== "packagedOn" || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            query.append("sort", "packagedOn");
            history.push({ search: query.toString() });
        }
    }

    return (
        <Table hover>
            <thead>
                <tr>
                    <th></th>
                    <Th name="fgSku" id="sku" onSort={onSort}>
                        SKU
                    </Th>
                    <Th name="fgProduct" id="product" onSort={onSort}>
                        Product
                    </Th>
                    <Th name="fgBatches" id="batches" onSort={onSort}>
                        Packaged From Batch ID
                    </Th>
                    <Th name="fgPackagedOn" id="packagedOn" onSort={onSort}>
                        Packaged On
                    </Th>
                </tr>
            </thead>
            <tbody>
                {finishedGoods.map((finishedGood, key) => (
                    <tr
                        key={key}
                        onClick={() => history.push("/finished-goods/" + finishedGood.id)}
                    >
                        <td></td>
                        <td>{finishedGood.sku.name}</td>
                        <td>{finishedGood.sku.product.name}</td>
                        <td>
                            {finishedGood.mixturePortions
                                ? finishedGood.mixturePortions.map((mixturePortion) => mixturePortion.mixture.brewStage.brew.batchId).join(", ")
                                : ""}
                        </td>
                        <td>{finishedGood.packagedOn}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
