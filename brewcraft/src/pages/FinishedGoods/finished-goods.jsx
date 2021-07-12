import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    Row,
    Col,
    Card,
    CardBody
} from "reactstrap";
import BarChart from "./components/barchart";
import noImage from "../../assets/images/no-image.jpg";
import Banner from "./components/banner";
import Info from "./components/info";
import Pagination from "./components/pagination";
import Table from "./components/table";
import Toolbar from "./components/toolbar";

export default function FinshedGoods({ fetchPage={fetchPage} }) {

    const finishedGoods = useSelector(state => {
        return state.FinishedGoods.content
    });

    return (
        <React.Fragment>
            {/* <Banner />
            <Info /> */}

            <Row>
                <Col xl="10">
                    <Toolbar/>
                    {/* <BarChart /> */}
                    <Card>
                        <CardBody className="py-2">
                            <Pagination fetchPage={fetchPage}>
                                <Table />
                            </Pagination>
                        </CardBody>
                        {/* <CardFooter>
                            <Button className="mt-1" color="primary">Repackage Items</Button>
                        </CardFooter> */}
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}