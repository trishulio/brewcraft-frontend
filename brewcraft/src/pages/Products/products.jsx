import React from "react";
import {
    Card,
    CardBody,
    Row,
    Col
} from "reactstrap";
import Pagination from "./components/pagination";
import Table from "./components/table";
import Toolbar from "./components/toolbar";

export default function Products({ fetchProducts }) {
    return (
        <React.Fragment>
            <Row>
                <Col xl="10">
                    <Toolbar/>
                    <Card>
                        <CardBody className="py-2">
                            <Pagination fetchProducts={fetchProducts}>
                                <Table/>
                            </Pagination>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}