import React from "react";
import { Col, Row } from "reactstrap";
import Table from "./components/table";
import Toolbar from "./components/toolbar";
import Pagination from "./components/pagination";
import FilterBarBrews from "./components/filterBar";
import { useSelector } from "react-redux";
import { Card, CardBody } from "../../component/Common/Card";

export default function Batches() {
    const loading = useSelector((state) => {
        return state.Batches.loading;
    });

    return (
        <React.Fragment>
            <Row>
                <Col style={{ maxWidth: "80rem" }}>
                    <Toolbar />
                    <Card>
                        <CardBody isLoading={loading} className="py-2">
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
