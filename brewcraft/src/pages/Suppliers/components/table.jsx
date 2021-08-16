import React from "react";
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useQuery } from "../../../helpers/utils";
import { formatAddress } from "../../../helpers/textUtils";
import Table, { Th } from "../../../component/Common/table";

export default function SuppliersTable() {
    const history = useHistory();
    const query = useQuery();

    const suppliers = useSelector(state => {
        return state.Suppliers.content;
    });

    function onSort(e) {
        if (e.target.getAttribute("name") === "supplierName") {
            const order = query.get("order");
            query.delete("sort");
            query.append("sort", "name");
            query.delete("order");
            if (!order || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            history.push({search: query.toString()});
        }
    }

    return (
        <Table>
            <thead>
                <tr>
                    <Th
                        name="supplierName"
                        id="name"
                        onSort={onSort}
                    >
                        Name
                    </Th>
                    <th>Address</th>
                    <th>Num. Contacts</th>
                </tr>
            </thead>
            <tbody>
                {
                    suppliers.map((supplier, key) =>
                        <tr key={key}>
                            <td><Link to={"/suppliers/" + supplier.id}>{supplier.name}</Link></td>
                            <td><Link to={"/suppliers/" + supplier.id}>{formatAddress(supplier.address) || "-"}</Link></td>
                            <td><Link to={"/suppliers/contacts?supplier=" + supplier.id}>{supplier.contacts.length}</Link></td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
    );
}
