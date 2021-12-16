import React from "react";
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useQuery } from "../../../helpers/utils";
import Table, { Th } from "../../../component/Common/table";

export default function UsersTable() {
    const history = useHistory();
    const query = useQuery();

    const users = useSelector(state => {
        return state.Users.content;
    });

    function onSort(e) {
        const name = e.target.getAttribute("name");
        const sort = query.get("sort");
        const order = query.get("order");
        query.delete("sort");
        query.delete("order");
        if (name === "userUserName") {
            if (sort !== "userName" || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            query.append("sort", "userName");
            history.push({search: query.toString()});
        } else if (name === "userFirstName") {
            if (sort !== "firstName" || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            query.append("sort", "firstName");
            history.push({search: query.toString()});
        } else if (name === "userLastName") {
            if (sort !== "lastName" || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            query.append("sort", "lastName");
            history.push({search: query.toString()});
        } else if (name === "userDisplayName") {
            if (sort !== "displayName" || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            query.append("sort", "displayName");
            history.push({search: query.toString()});
        } else if (name === "userEmail") {
            if (sort !== "email" || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            query.append("sort", "email");
            history.push({search: query.toString()});
        } else if (name === "userRoles") {
            if (sort !== "roles" || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            query.append("sort", "roles");
            history.push({search: query.toString()});
        } else if (name === "userPhoneNumber") {
            if (sort !== "phoneNumber" || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            query.append("sort", "phoneNumber");
            history.push({search: query.toString()});
        }
    }

    return (
        <Table hover>
            <thead>
                <tr>
                    <th></th>
                    <Th
                        name="userUserName"
                        id="userName"
                        onSort={onSort}
                    >
                        User Name
                    </Th>
                    <Th
                        name="userFirstName"
                        id="firstName"
                        onSort={onSort}
                    >
                        First Name
                    </Th>
                    <Th
                        name="userLastName"
                        id="lastName"
                        onSort={onSort}
                    >
                        Last Name
                    </Th>
                    <Th
                        name="userDisplayName"
                        id="displayName"
                        onSort={onSort}
                    >
                        Display Name
                    </Th>
                    <Th
                        name="userEmail"
                        id="email"
                        onSort={onSort}
                    >
                        Email
                    </Th>
                    <Th
                        name="userRoles"
                        id="roles"
                        onSort={onSort}
                    >
                        Roles
                    </Th>
                    <Th
                        name="userPhoneNumber"
                        id="phoneNumber"
                        onSort={onSort}
                    >
                        Phone Number
                    </Th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, key) =>
                        <tr key={key} onClick={() => history.push("/users/" + user.id)}>
                            <td></td>
                            <td>{user.userName}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.displayName}</td>
                            <td>{user.email}</td>
                            <td>{user.roles ? user.roles.map(role => role.name).join(", ") : ""}</td>
                            <td>{user.phoneNumber}</td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
    );
}
