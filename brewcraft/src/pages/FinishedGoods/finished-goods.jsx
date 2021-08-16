import React from "react";
import {
    Row,
    Col,
    Card,
    CardBody
} from "reactstrap";
import Pagination from "./components/pagination";
import Table from "./components/table";
import Toolbar from "./components/toolbar";

export default function FinshedGoods() {
    return (
        <React.Fragment>
            <Row>
                <Col xl="10">
                    <Toolbar/>
                    <Card>
                        <CardBody className="py-2">
                            <Pagination>
                                <Table/>
                            </Pagination>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}