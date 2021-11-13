import React from "react";
import {
    Card,
    CardBody
} from "reactstrap";
import Table from "./components/table";
import Toolbar from "./components/toolbar";
import Pagination from "./components/pagination";

export default function SupplierContacts() {
    return (
        <React.Fragment>
            <div style={{ maxWidth: "1024px" }}>
                <Toolbar/>
                <Card>
                    <CardBody className="py-2">
                        <Pagination>
                            <Table/>
                        </Pagination>
                    </CardBody>
                </Card>
            </div>
        </React.Fragment>
    );
}
