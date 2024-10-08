import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "../../../helpers/utils";
import Table, { Th } from "../../../component/Common/table";

export default function FinishedGoodsTable() {
    const history = useHistory();
    const query = useQuery();

    const finishedGoods = useSelector((state) => {
        return state.FinishedGoodsInventory.content;
    });

    function onSort(e) {
        const name = e.target.getAttribute("name");
        const sort = query.get("sort");
        const order = query.get("order");
        query.delete("sort");
        query.delete("order");
        if (name === "fgSkuNumber") {
            if (sort !== "skuNumber" || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            query.append("sort", "skuName");
            history.push({ search: query.toString() });
        } else if (name === "fgSkuName") {
            if (sort !== "skuName" || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            query.append("sort", "skuName");
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

    /* eslint-disable no-unused-expressions */
    function getBatchIds(finishedGood) {
        let batchIds = new Set();
        finishedGood?.mixturePortions?.forEach((mixturePortion) => {
            if (mixturePortion.mixture && mixturePortion.mixture.brewStage) {
                batchIds.add(mixturePortion.mixture.brewStage.brew.batchId);
            }
        });

        finishedGood?.finishedGoodLotPortions?.forEach(
            (finishedGoodLotPortion) => {
                finishedGoodLotPortion.finishedGoodLot.mixturePortions.forEach(
                    (mixturePortion) => {
                        if (
                            mixturePortion.mixture &&
                            mixturePortion.mixture.brewStage
                        ) {
                            batchIds.add(
                                mixturePortion.mixture.brewStage.brew.batchId
                            );
                        }
                    }
                );
            }
        );
        return batchIds;
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
                    <Th name="fgProduct" id="product" onSort={onSort}>
                        Product
                    </Th>
                    <Th name="fgBatches" id="batches" onSort={onSort}>
                        Batch IDs
                    </Th>
                    <Th name="fgPackagedOn" id="packagedOn" onSort={onSort}>
                        Packaged On
                    </Th>
                    <Th name="fgQuantity" id="quantity" onSort={onSort}>
                        Quantity Avail.
                    </Th>
                </tr>
            </thead>
            <tbody>
                {finishedGoods.map((finishedGood, key) => (
                    <tr
                        key={key}
                        onClick={() =>
                            history.push(
                                "/inventory/finished-goods/" + finishedGood.id
                            )
                        }
                    >
                        <td></td>
                        <td>{finishedGood.sku.number}</td>
                        <td>{finishedGood.sku.name}</td>
                        <td>{finishedGood.sku.product.name}</td>
                        <td>{[...getBatchIds(finishedGood)].join(", ")}</td>
                        <td>{finishedGood.packagedOn}</td>
                        <td>{finishedGood.quantity.value}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
