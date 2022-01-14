import React from "react";
import { Col, Row } from "reactstrap";
import Table from "./components/table";
import Toolbar from "./components/toolbar";
import Pagination from "./components/pagination";
import FilterBarSupplier from "./components/filterBar";
import { Card, CardBody } from "../../component/Common/Card";
import { useSelector } from "react-redux";

export default function Suppliers() {
    const loading = useSelector((state) => {
        return state.Suppliers.loading;
    });

    return (
        <React.Fragment>
            <Row>
                <Col style={{ maxWidth: "1024px" }}>
                    <Toolbar />
                    <Card>
                        <CardBody className="py-2" isLoading={loading}>
                            <Pagination>
                                <Table />
                            </Pagination>
                        </CardBody>
                    </Card>
                </Col>
                <FilterBarSupplier />
            </Row>
        </React.Fragment>
    );
}
