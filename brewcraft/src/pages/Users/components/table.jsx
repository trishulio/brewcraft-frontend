import React from "react";
import { Link, useHistory } from 'react-router-dom';
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
        if (name === "userId") {
            if (sort !== "id" || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            query.append("sort", "id");
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

        } else if (name === "userUserName") {
            if (sort !== "userName" || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            query.append("sort", "userName");
            history.push({search: query.toString()});

        } else if (name === "userDisplayName") {
            if (sort !== "displayName" || order !== "asc") {
                query.append("order", "asc");
            } else {
                query.append("order", "desc");
            }
            query.append("sort", "displayName");
            history.push({search: query.toString()});
        }
    }

    return (
        <Table>
            <thead>
                <tr>
                    {console.log(users)}
                    <th></th>
                    <Th
                        name="userId"
                        id="id"
                        onSort={onSort}
                    >
                        User ID
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
                        name="userUserName"
                        id="userName"
                        onSort={onSort}
                    >
                        User Name
                    </Th>
                    <Th
                        name="userDisplayName"
                        id="displayName"
                        onSort={onSort}
                    >
                        Display Name
                    </Th>
                    <th>Roles</th>
                    <th>Pronoun</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, key) =>
                        <tr key={key}>
                            <td></td>
                            <td><Link to={"/users/" + user.id}>{user.id}</Link></td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.userName}</td>
                            <td>{user.displayName}</td>
                            <td>{users.map(u => u.name).toString()}</td>
                            <td>{user.salutation}</td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
    );
}
