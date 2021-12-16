import React from "react";
import {
    Col,
    Row,
    Card,
    CardBody
} from "reactstrap";
import Pagination from "./components/pagination";
import Table from "./components/table";
import Toolbar from "./components/toolbar";

export default function Skus() {
    return (
        <React.Fragment>
            <Row style={{ maxWidth: "1024px" }}>
                <Col>
                    <Toolbar/>
                    <Card>
                        <CardBody className="py-2">
                            <Pagination>
                                <Table />
                            </Pagination>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}