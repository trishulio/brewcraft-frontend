import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import FilterBarRawMaterials from "./components/filterBar";
import Pagination from "./components/pagination";
import Table from "./components/table";
import Toolbar from "./components/toolbar";

export default function RawMaterials() {
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
                <FilterBarRawMaterials />
            </Row>
        </React.Fragment>
    );
}
