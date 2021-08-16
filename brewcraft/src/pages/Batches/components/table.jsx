import React from "react";
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import Table, { Th } from "../../../component/Common/table";
import { formatDate } from "../../../helpers/textUtils";
import { useQuery } from "../../../helpers/utils";

export default function BatchesTable() {
    const history = useHistory();
    const query = useQuery();

    const batches = useSelector(state => {
        return state.Batches.content;
    });

    function onSort(e) {
        const name = e.target.getAttribute("name");
        const sort = query.get("sort");
        let order = query.get("order");
        query.delete("sort");
        query.delete("order");
        switch(name) {
            case "batchesBatchId":
                if (sort !== "batchId") {
                    order = undefined;
                }
                query.append("sort", "batchId");
                break;
            case "batchesName":
                if (sort !== "name") {
                    order = undefined;
                }
                query.append("sort", "name");
                break;
            case "batchesProduct":
                if (sort !== "product") {
                    order = undefined;
                }
                query.append("sort", "product");
                break;
            case "batchesStartedAt":
                if (sort !== "startedAt") {
                    order = undefined;
                }
                query.append("sort", "startedAt");
                break;
            case "batchesEndedAt":
                if (sort !== "endedAt") {
                    order = undefined;
                }
                query.append("sort", "endedAt");
                break;
            default:
                break;
        }
        if (!order || order !== "asc") {
            query.append("order", "asc");
        } else {
            query.append("order", "desc");
        }
        history.push({search: query.toString()});
    }

    return (
        <Table>
            <thead>
                <tr>
                    <Th
                        name="batchesBatchId"
                        id="batchId"
                        onSort={onSort}
                    >
                        Batch ID
                    </Th>
                    <Th
                        name="batchesName"
                        id="name"
                        onSort={onSort}
                    >
                        Name
                    </Th>
                    <Th
                        name="batchesProduct"
                        id="product"
                        onSort={onSort}
                    >
                        Product
                    </Th>
                    <Th
                        name="batchesStartedAt"
                        id="startedAt"
                        onSort={onSort}
                    >
                        Started
                    </Th>
                    <Th
                        name="batchesEndedAt"
                        id="endedAt"
                        onSort={onSort}
                    >
                        Ended
                    </Th>
                    <th>Parent Batch</th>
                </tr>
            </thead>
            <tbody>
                {
                    batches.map((batch, key) =>
                        <tr key={key}>
                            <td><Link to={"/batches/" + batch.id}>{batch.batchId}</Link></td>
                            <td><Link to={"/batches/" + batch.id}>{batch.name}</Link></td>
                            <td><Link to={"/products/" + batch.product.id}>{batch.product.name}</Link></td>
                            <td>{formatDate(batch.startedAt)}</td>
                            <td>{formatDate(batch.endedAt)}</td>
                            <td>{batch.parentBatch?.batchId || "-"}</td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
    );
}
