import React from "react";
import { Table } from "reactstrap";
import { useQuery } from "../../helpers/utils";

export function Th(props) {
    const query = useQuery();
    const sort = query.get("sort");
    const order = query.get("order");
    return (
        <th
            style={{ cursor: "pointer", width: props.width }}
            name={props.name}
            onClick={props.onSort}
        >
            <i
                className="mdi mdi-sort-ascending mr-1"
                hidden={sort !== props.id || order !== "asc"}
            ></i>
            <i
                className="mdi mdi-sort-descending mr-1"
                hidden={sort !== props.id || order !== "desc"}
            ></i>
            {props.children}
        </th>
    );
}

export default function CommonTable(props) {
    return (
        <React.Fragment>
            <div className="table-responsive table-striped">
                <Table
                    hover={props.hover}
                    style={{
                        cursor: props.hover ? "pointer" : null,
                        tableLayout: props.tableLayout,
                    }}
                    className="table-centered table-vertical table-fixed jadc-effect mb-1"
                >
                    {props.children}
                </Table>
            </div>
        </React.Fragment>
    );
}
