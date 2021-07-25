import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
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
                    finishedGoods.map((finishedGood, key) =>
                        <tr key={key}>
                            <td>
                                <div className="d-flex align-items-center vertical-center">
                                    <Input className="ml-1" type="checkbox" />
                                </div>
                                {/* <Input className="waves-effect" type="checkbox" /> */}
                            </td>
                            <td>
                                <div className="pl-4"><Link to="/finished-goods/1">{finishedGood.name}</Link></div>
                            </td>
                            <td>
                                {finishedGood.package}
                            </td>
                            <td>
                                {finishedGood.available ? finishedGood.available : "-"}
                            </td>
                            <td>
                                {finishedGood.reserved ? finishedGood.reserved : "-"}
                            </td>
                            <td><Link to={"/batches/" + finishedGood.id}>#{finishedGood.id}</Link></td>
                            <td>{finishedGood.processor}</td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
    );
}