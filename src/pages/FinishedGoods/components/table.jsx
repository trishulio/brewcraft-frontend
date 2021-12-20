import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Input } from "reactstrap";
import Table from "../../../component/Common/table";

export default function FinishedGoodsTable() {
    const finishedGoods = useSelector((state) => {
        return state.FinishedGoods.content;
    });

    return (
        <Table>
            <thead>
                <tr>
                    <th></th>
                    <th>Product</th>
                    <th>Package</th>
                    <th>SKU</th>
                </tr>
            </thead>
            <tbody>
                {finishedGoods.map((finishedGood, key) => (
                    <tr key={key}>
                        <td>
                            <div className="d-flex align-items-center vertical-center">
                                <Input className="ml-1" type="checkbox" />
                            </div>
                        </td>
                        <td>
                            <div className="pl-4">
                                <Link to="/finished-goods/1">
                                    {finishedGood.name}
                                </Link>
                            </div>
                        </td>
                        <td>{finishedGood.package}</td>
                        <td>
                            <Link to={"/batches/" + finishedGood.id}>
                                {finishedGood.id}
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
