import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import FilterBarProducts from "./components/filterBar";
import Pagination from "./components/pagination";
import Table from "./components/table";
import Toolbar from "./components/toolbar";

export default function Products() {
    return (
        <React.Fragment>
            <Row>
                <Col style={{ maxWidth: "1024px" }}>
                    <Toolbar />
                    <Card>
                        <CardBody className="py-2">
                            <Pagination>
                                <Table />
                            </Pagination>
                        </CardBody>
                    </Card>
                </Col>
                <FilterBarProducts />
            </Row>
        </React.Fragment>
    );
}
