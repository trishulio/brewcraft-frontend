import React from "react";
import {  useHistory } from 'react-router-dom';
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

                        <tr key={key} onClick={()=>{
                                    history.push({
                                        pathname : "/suppliers/" +supplier.id
                                    })
                        }} style={{ cursor : "pointer"}}>
                            <td>{supplier.name}</td>
                            <td>{formatAddress(supplier.address) || "-"}</td>
                            <td>{supplier.contacts.length}</td>
                        </tr>

                    )
                }
            </tbody>
        </Table>
    );
}
