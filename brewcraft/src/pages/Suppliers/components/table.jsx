import React from "react";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import Table from "../../../component/Common/table";

export default function SuppliersTable() {

    const suppliers = useSelector(state => {
        return state.Suppliers.content;
    });

    return (
        <Table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Company</th>
                    <th>Position</th>
                </tr>
            </thead>
            <tbody>
                {
                    suppliers.map((supplier, key) =>
                        <tr key={key}>
                            <td><Link to={"/suppliers/" + supplier.id}>#{supplier.id}</Link></td>
                            <td><Link to={"/suppliers/" + supplier.id}>{supplier.firstName}</Link></td>
                            <td><Link to={"/suppliers/" + supplier.id}>{supplier.lastName}</Link></td>
                            <td>{supplier.supplier?.name || "-"}</td>
                            <td>{supplier.position}</td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
    );
}
