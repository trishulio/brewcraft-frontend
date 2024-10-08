import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Table, { Th } from "../../../component/Common/table";
import { formatDatetime } from "../../../helpers/textUtils";
import { useQuery } from "../../../helpers/utils";

export default function BatchesTable() {
    const history = useHistory();
    const query = useQuery();

    const batches = useSelector((state) => {
        return state.Batches.content;
    });

    function onSort(e) {
        const name = e.target.getAttribute("name");
        const sort = query.get("sort");
        let order = query.get("order");
        query.delete("sort");
        query.delete("order");
        switch (name) {
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
        history.push({ search: query.toString() });
    }

    return (
        <Table hover>
            <thead>
                <tr>
                    <Th name="batchesBatchId" id="batchId" onSort={onSort}>
                        Batch ID
                    </Th>
                    <Th name="batchesProduct" id="product" onSort={onSort}>
                        Product
                    </Th>
                    <th>Assignee</th>
                    <Th name="batchesStartedAt" id="startedAt" onSort={onSort}>
                        Started
                    </Th>
                    <Th name="batchesEndedAt" id="endedAt" onSort={onSort}>
                        Ended
                    </Th>
                </tr>
            </thead>
            <tbody>
                {batches.map((batch, key) => (
                    <tr
                        key={key}
                        onClick={() =>
                            history.push({
                                pathname: "/brews/" + batch.id,
                                search: "?edit=true",
                            })
                        }
                    >
                        <td>{batch.id}</td>
                        <td>{batch.product.name}</td>
                        <td>
                            {batch.assignedTo ? (
                                <img
                                    src={batch.assignedTo.imageSrc}
                                    alt={batch.assignedTo.displayName}
                                />
                            ) : (
                                "-"
                            )}
                        </td>
                        <td>{formatDatetime(batch.startedAt)}</td>
                        <td>
                            {batch.endedAt
                                ? formatDatetime(batch.endedAt)
                                : "-"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
