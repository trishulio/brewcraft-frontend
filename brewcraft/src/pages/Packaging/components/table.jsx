import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
    Button
} from "reactstrap";
import Table from "../../../component/Common/table";

export default function PackagingTable() {

    const history = useHistory();

    const packaging = useSelector(state => {
        return state.Packaging.content;
    });

    function onView(id) {
        if (id) {
            history.push("/materials/packaging/" + id);
        }
    }

    return  (
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Category</th>
                    <th>Measure</th>
                    <th>UPC</th>
                </tr>
            </thead>
            <tbody>
                {
                    packaging.map((packagingItem, key) =>
                        <tr key={key}>
                            <td><Link to={"/materials/packaging/" + packagingItem.id}>{packagingItem.name || "-"}</Link></td>
                            <td>{packagingItem.materialClass?.name ?
                                <Link className="jadc-effect" to={"/materials/categories/" + packagingItem.materialClass.id}>{packagingItem.materialClass.name}</Link>
                                : "-"
                                }
                            </td>
                            <td>{packagingItem.category?.name ?
                                <Link to={"/materials/categories/" + packagingItem.category.id}>{packagingItem.category.name}</Link>
                                : "-"
                                }
                            </td>
                            <td>{packagingItem.baseQuantityUnit || "-"}</td>
                            <td>{packagingItem.upc || "-"}</td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
    );
}