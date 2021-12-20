import React from "react";
import { Table } from "reactstrap";

function TransactionsTable(props) {
    return (
        <div className="mb-3 table-responsive">
            <Table className="table mb-0">
                <thead>
                    <tr>
                        {props.columns.map((col) => (
                            <th>{col.text}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((item) => (
                        <tr>
                            {props.columns.map((col) => (
                                <td>{item[col.dataField]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default TransactionsTable;
