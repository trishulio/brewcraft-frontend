import React from "react";
import { Row, Col } from "reactstrap";
import Table from "./components/table";
import Toolbar from "./components/toolbar";
import Pagination from "./components/pagination";
import FilterBarSupplierContacts from "./components/filterBar";
import { Card, CardBody } from "../../component/Common/Card";
import { useSelector } from "react-redux";

export default function SupplierContacts() {
    const loading = useSelector((state) => {
        return state.SupplierContacts.loading;
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
                <FilterBarSupplierContacts />
            </Row>
        </React.Fragment>
    );
}
