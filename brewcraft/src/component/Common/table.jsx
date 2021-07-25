import React from "react";
import {
    Table
} from "reactstrap";

export default function CommonTable({ children }) {

    return (
        <React.Fragment>
            <div className="table-responsive table-striped table-sm">
                <Table className="table-centered table-vertical table-nowrap jadc-effect mb-1">
                    {children}
                </Table>
            </div>
        </React.Fragment>
    );
}