import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Table from "../../../component/Common/table";

export default function SkusTable() {

    const skus = useSelector(state => {
        return state.Skus.content;
    });

    return  (
        <Table>
            <thead>
                <tr>
                    <th>Sku</th>
                    <th>Product</th>
                    <th>Volume</th>
                </tr>
            </thead>
            <tbody>
                {
                    skus.map((sku, key) =>
                        <tr key={key}>
                            <td><Link to={"/sku/" + sku.id}>{sku.name}</Link></td>
                            <td>{sku.product.name}</td>
                            <td>{sku.quantity?.value ? sku.quantity.value + " " + sku.quantity.symbol : "-"}</td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
    );
}