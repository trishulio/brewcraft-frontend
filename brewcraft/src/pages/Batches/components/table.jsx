import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
    Badge
  } from "reactstrap";
import Table from "../../../component/Common/table";

export default function BatchesTable() {
    const history = useHistory();
    const batches = useSelector(state => {
        return state.Batches.content;
    });

    function onSort(e) {
        // TODO
        // add some sorting here ..
        console.log(e);
    }

    function onView(id) {
        history.push("/batches/" + id);
    }

    return (
        <React.Fragment>
            <Table>
                <thead>
                    <tr>
                        <th>Batch ID</th>
                        <th>Product</th>
                        <th>Status</th>
                        <th>Started</th>
                        <th>Completed</th>
                        <th>Total Packaged</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        batches.map((batch, key) =>
                            <tr key={key}>
                                <td><Link to={"/products/" + batch.id}>#{batch.id}</Link></td>
                                <td>
                                    {/* <img src={batch.imgUrl} alt="user" className="avatar-xs mr-2 rounded-circle" /> */}
                                    <Link to={"/products/" + batch.id}>{batch.name}</Link>
                                </td>
                                <td><Badge color={batch.color} className="badge-pill">{batch.status}</Badge></td>
                                <td>
                                    {batch.started ? batch.started : "-"}
                                </td>
                                <td>
                                    {batch.completed ? batch.completed : "-"}
                                </td>
                                <td>
                                    {batch.volume ? batch.volume : "-"}
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </React.Fragment>
    );
}