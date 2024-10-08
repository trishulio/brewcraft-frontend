import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "../../../helpers/utils";
import Table, { Th } from "../../../component/Common/table";

export default function SupplierContactsTable() {
    const history = useHistory();
    const query = useQuery();

    const contacts = useSelector((state) => {
        return state.SupplierContacts.content;
    });

    function onSort(e) {
        const name = e.target.getAttribute("name");
        const sort = query.get("sort");
        const order = query.get("order");
        query.delete("sort");
        query.delete("order");
        if (name === "supplierContactFirstName") {
            if (sort !== "firstName" || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            query.append("sort", "firstName");
            history.push({ search: query.toString() });
        } else if (name === "supplierContactLastName") {
            if (sort !== "lastName" || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            query.append("sort", "lastName");
            history.push({ search: query.toString() });
        } else if (name === "supplierContactSupplierName") {
            if (sort !== "supplierName" || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            query.append("sort", "supplierName");
            history.push({ search: query.toString() });
        }
    }

    return (
        <Table>
            <thead>
                <tr>
                    <Th
                        name="supplierContactFirstName"
                        id="firstName"
                        onSort={onSort}
                    >
                        First Name
                    </Th>
                    <Th
                        name="supplierContactLastName"
                        id="lastName"
                        onSort={onSort}
                    >
                        Last Name
                    </Th>
                    <Th
                        name="supplierContactSupplierName"
                        id="supplierName"
                        onSort={onSort}
                    >
                        Supplier
                    </Th>
                    <th>Position</th>
                    <th>Phone Num.</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((supplier, key) => (
                    <tr
                        key={key}
                        onClick={() => {
                            history.push({
                                pathname: "/suppliers/contacts/" + supplier.id,
                            });
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        <td>{supplier.firstName}</td>
                        <td>{supplier.lastName}</td>
                        <td>{supplier.supplier?.name}</td>
                        <td>{supplier.position}</td>
                        <td>
                            <a href={`tel:${supplier.phoneNumber}`}>
                                {supplier.phoneNumber}
                            </a>
                        </td>
                        <td>
                            <a href={`mailto:${supplier.email}`}>
                                {supplier.email}
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
