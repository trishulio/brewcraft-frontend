import React from "react";
import {
    Card,
    CardBody,
    Row,
    Col
} from "reactstrap";
import Table from "./components/table";
import Toolbar from "./components/toolbar";
import Pagination from "./components/pagination";

export default function PurchaseInvoices({ invoices, fetchPage }) {
    return (
        <React.Fragment>
            <Row>
                <Col xl="10">
                    <Toolbar/>
                    <Card>
                        <CardBody className="py-2">
                            <Pagination invoices={invoices} fetchPage={fetchPage}>
                                <Table/>
                            </Pagination>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}