import React from "react";
import { Col, Row, Card, CardBody } from "reactstrap";
import FilterBarSkus from "./components/filterbar";
import Pagination from "./components/pagination";
import Table from "./components/table";
import Toolbar from "./components/toolbar";

export default function Skus() {
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
                <FilterBarSkus />
            </Row>
        </React.Fragment>
    );
}
