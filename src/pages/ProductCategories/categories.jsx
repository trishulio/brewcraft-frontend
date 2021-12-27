import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import Table from "./components/table";
import Toolbar from "./components/toolbar";
import Pagination from "./components/pagination";
import FilterBarProductCategories from "./components/filterBar";

export default function ProductCategories() {
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
                <FilterBarProductCategories />
            </Row>
        </React.Fragment>
    );
}
