import React from "react";
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import {
    Button
} from "reactstrap";
import Table from "../../../component/Common/table";

export default function CompaniesTable() {

    const history = useHistory();

    const companies = useSelector(state => {
        return state.Companies.content;
    });

    return (
        <Table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {
                    companies.map((category, key) =>
                        <tr key={key}>
                            <td><Link to={"/companies/" + category.id}>#{category.id}</Link></td>
                            <td><Link to={"/companies/" + category.id}>{category.name}</Link></td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
    );
}
