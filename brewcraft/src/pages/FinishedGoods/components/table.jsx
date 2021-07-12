import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    Button,
    Input
} from "reactstrap";
import noImage from "../../../assets/images/no-image.jpg";
import Table from "../../../component/Common/table";

export default function FinishedGoodsTable() {

    const history = useHistory();

    const finishedGoods = useSelector(state => {
        return state.FinishedGoods.content;
    });

    function onView(id) {
        if (id) {
            history.push("/finished-goods/" + id);
        }
    }

    return  (
        <Table>
            <thead>
                <tr>
                    <th></th>
                    <th>Product</th>
                    <th>Package</th>
                    <th>Available</th>
                    <th>Reserved</th>
                    <th>Batch ID</th>
                    <th>Brewmaster</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    finishedGoods.map((order, key) =>
                        <tr key={key}>
                            <td>
                                <div className="d-flex align-items-center vertical-center">
                                    <Input className="ml-1" type="checkbox" />
                                </div>
                                {/* <Input className="waves-effect" type="checkbox" /> */}
                            </td>
                            <td>
                                <img src={noImage} alt="user" className="avatar-xs ml-4 mr-3 rounded-circle" /> {order.name && order.name}
                            </td>
                            <td>
                                {order.package}
                            </td>
                            <td>
                                {order.available ? order.available : "-"}
                            </td>
                            <td>
                                {order.reserved ? order.reserved : "-"}
                            </td>
                            <td>#{order.id}</td>
                            <td>{order.processor}</td>
                            <td>
                                <Button color="secondary" size="sm" className="waves-effect waves-light" onClick={() => onView(order.id)}>View</Button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
    );
}