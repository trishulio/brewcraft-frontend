import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import Table from "./components/table";
import Toolbar from "./components/toolbar";
import Pagination from "./components/pagination";
import FilterBarFinishedGoodsInventory from "./components/filterBar";

export default function FinishedGoodsInventory() {
    return (
        <React.Fragment>
            <Row>
                <Col xl="10">
                    <Toolbar />
                    <Card>
                        <CardBody className="py-2">
                            <Pagination>
                                <Table />
                            </Pagination>
                        </CardBody>
                    </Card>
                </Col>
                <FilterBarFinishedGoodsInventory />
            </Row>
        </React.Fragment>
    );
}
