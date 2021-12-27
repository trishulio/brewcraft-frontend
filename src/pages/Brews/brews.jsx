import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import Table from "./components/table";
import Toolbar from "./components/toolbar";
import Pagination from "./components/pagination";
import FilterBarBrews from "./components/filterBar";

export default function Batches() {
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
                <FilterBarBrews />
            </Row>
        </React.Fragment>
    );
}
