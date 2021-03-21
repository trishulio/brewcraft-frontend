import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Table,
    Badge,
    Button,
    Input,
    TabContent,
    TabPane,
    NavLink,
    NavItem,
    Nav,
    UncontrolledAlert,
} from "reactstrap";
import classnames from "classnames";
import { setBreadcrumbItems } from "../../store/actions";
import BarChart from "./components/finished-goods-barchart";
import PieChart from "./components/finished-goods-piechart";

import user1 from "../../assets/images/users/user-4.jpg";
import user2 from "../../assets/images/users/user-6.jpg";
import noImage from "../../assets/images/no-image.jpg";

const finishedGoods = [
    { sku: "78332073", imgUrl : user1, id : "85214796", name : "Fantastic Lager", processor: "Martin", package: "330ml x 6 Cans", packaged : "5/12/2016 2:10 PM", updated : "5/12/2016 2:30 PM", available: 5, reserved: 100 },
    { sku: "78332073", imgUrl : user1, id : "52140300", name : "Fantastic Lager", processor: "Martin", package: "330ml x 6 Cans", packaged : "5/12/2016 1:47 PM", updated : "5/12/2016 2:01 PM", available: 15 },
    { sku: "52140300", imgUrl : user1, id : "85214796", name : "Fantastic Lager", processor: "Martin", package: "330ml x 1 Can", packaged : "5/12/2016 2:10 PM", updated : "5/12/2016 2:30 PM", available: 8 },
    { sku: "52140300", imgUrl : user1, id : "52140300", name : "Fantastic Lager", processor: "Martin", package: "330ml x 6 Can", packaged : "5/12/2016 1:47 PM", updated : "5/12/2016 2:01 PM", available: 80 },
    { sku: "22367593", imgUrl : user2, id : "52140300", name : "Fantastic Lager", processor: "Robert", package : "325ml x 12 Bottles", packaged : "5/10/2016 8:10 AM", updated : "5/10/2016 1:27 PM", available: 34, reserved: 20 },
    { sku: "22789432", imgUrl : user2, id : "52140300", name : "Fantastic Lager", processor: "Robert", package : "325ml x 1 Bottle", packaged : "5/09/2016 4:10 PM", updated : "5/10/2016 1:27 PM", available: 40 },
    { sku: "22367593", imgUrl : user2, id : "52140300", name : "Fantastic Lager", processor: "Robert", package : "Half-Barrel Keg", packaged : "5/10/2016 7:20 AM", updated : "5/10/2016 1:20 PM", available: 7, reserved: 80 },
    { sku: "22367593", imgUrl : user2, id : "52140300", name : "Fantastic Lager", processor: "Robert", package : "Quarter-Barrel Keg", packaged : "5/10/2016 6:10 AM", updated : "5/10/2016 12:03 PM", available: 5, reserved: 45 }
];

const activeBrews = [];

const deletedBrews = []

export default function FinshedGoods() {
    const [activeTab, setActiveTab] = useState("1");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Finished-Goods", [
                { title: "Main", link: "#" },
                { title: "Batches", link: "#" },
            ])
        );
    }, []);

    return (
        <React.Fragment>
            <UncontrolledAlert color="info">
                <strong>Heads up!</strong> You have <strong> 40 additional</strong> Warm Stout 325ml bottles x 12 items.
            </UncontrolledAlert >
            <Row>
                <Col md="2">
                    <PieChart />
                </Col>
                <Col md="10">
                    <BarChart />
                </Col>
                <Col xs="12">
                    <Card>
                        <CardHeader>
                            <h4 className="card-title mb-1">Inventory Table</h4>
                        </CardHeader>
                        <CardBody>
                            <Nav pills>
                                <NavItem className="waves-effect waves-light">
                                    <NavLink
                                        style={{ cursor : "pointer" }}
                                            className={classnames({
                                                active: activeTab === "1"
                                            })}
                                            onClick={() => setActiveTab("1")}
                                        >
                                            <span className="d-block d-sm-none"><i className="far fa-user"></i></span>
                                            <span className="d-none d-sm-block">Available</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem className="waves-effect waves-light">
                                    <NavLink
                                        style={{ cursor : "pointer" }}
                                            className={classnames({
                                                active: activeTab === "2"
                                            })}
                                            onClick={() => setActiveTab("2")}
                                        >
                                            <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                                            <span className="d-none d-sm-block">Sold</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem className="waves-effect waves-light">
                                    <NavLink
                                        style={{ cursor : "pointer" }}
                                            className={classnames({
                                                active: activeTab === "3"
                                            })}
                                            onClick={() => setActiveTab("3")}
                                        >
                                            <span className="d-block d-sm-none"><i className="far fa-user"></i></span>
                                            <span className="d-none d-sm-block">Waste</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem className="waves-effect waves-light">
                                    <NavLink
                                        style={{ cursor : "pointer" }}
                                            className={classnames({
                                                active: activeTab === "4"
                                            })}
                                            onClick={() => setActiveTab("4")}
                                        >
                                            <span className="d-block d-sm-none"><i className="far fa-user"></i></span>
                                            <span className="d-none d-sm-block">Deleted</span>
                                    </NavLink>
                                </NavItem>
                            </Nav>

                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1" className="p-3">
                                    <div className="table-responsive">
                                        <Table className="table-centered table-vertical table-nowrap mb-1">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>SKU</th>
                                                    <th>Product</th>
                                                    <th>Package</th>
                                                    <th>Available</th>
                                                    <th>Reserved</th>
                                                    <th>Batch ID</th>
                                                    <th>Brewmaster</th>
                                                    <th>Date Packaged</th>
                                                    <th>Updated</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    finishedGoods.map((order, key) =>
                                                        <tr key={key}>
                                                            <td>
                                                                <div className="d-flex align-items-center vertical-center">
                                                                    <Input style={{margin:0}} type="checkbox" />
                                                                </div>
                                                            </td>
                                                            <td>{order.sku}</td>
                                                            <td>
                                                                <img src={noImage} alt="user" className="avatar-xs mr-2 rounded-circle" /> {order.name && order.name}
                                                            </td>
                                                            <td>
                                                                {order.package}
                                                            </td>
                                                            <td>
                                                                {order.available ? order.available : "-"}
                                                            </td>
                                                            <td>
                                                                {order.reserved ? order.reserved : "-"}
                                                            </td>
                                                            <td>#{order.id}</td>
                                                            <td>{order.processor}</td>
                                                            <td>
                                                                {order.packaged}
                                                            </td>
                                                            <td>
                                                                {order.updated ? order.updated : "-"}
                                                            </td>
                                                            <td>
                                                                <Button color="secondary" size="sm" className="waves-effect waves-light">View</Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                </TabPane>
                                <TabPane tabId="2" className="p-3">
                                    <div className="table-responsive">
                                        <Table className="table-centered table-vertical table-nowrap mb-1">
                                            <thead>
                                                <tr>
                                                    <th>Batch ID</th>
                                                    <th>Product</th>
                                                    <th>Processor</th>
                                                    <th>Status</th>
                                                    <th>Started</th>
                                                    <th>Updated</th>
                                                    <th>Completed</th>
                                                    <th>Final Volume</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    activeBrews.map((order, key) =>
                                                        <tr key={key}>
                                                            <td>#{order.id}</td>
                                                            <td>
                                                                <img src={noImage} alt="user" className="avatar-xs mr-2 rounded-circle" /> {order.name && order.name}
                                                            </td>
                                                            <td>
                                                                <img src={order.imgUrl} alt="user" className="avatar-xs mr-2 rounded-circle" /> {order.processor}
                                                            </td>
                                                            <td><Badge color={order.color} className="badge-pill">{order.status}</Badge></td>
                                                            <td>
                                                                {order.started ? order.started: "-"}
                                                            </td>
                                                            <td>
                                                                {order.updated ? order.updated : "-"}
                                                            </td>
                                                            <td>
                                                                {order.completed ? order.completed : "-"}
                                                            </td>
                                                            <td>
                                                                {order.amount ? order.amount + " L" : "-"}
                                                            </td>
                                                            <td>
                                                                <Button color="secondary" size="sm" className="waves-effect waves-light">View</Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                </TabPane>
                                <TabPane tabId="3" className="p-3">
                                    <div className="table-responsive">
                                        <Table className="table-centered table-vertical table-nowrap mb-1">
                                            <thead>
                                                <tr>
                                                    <th>Batch ID</th>
                                                    <th>Product</th>
                                                    <th>Processor</th>
                                                    <th>Status</th>
                                                    <th>Started</th>
                                                    <th>Updated</th>
                                                    <th>Completed</th>
                                                    <th>Final Volume</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    deletedBrews.map((order, key) =>
                                                        <tr key={key}>
                                                            <td>#{order.id}</td>
                                                            <td>
                                                                <img src={noImage} alt="user" className="avatar-xs mr-2 rounded-circle" /> {order.name && order.name}
                                                            </td>
                                                            <td>
                                                                <img src={order.imgUrl} alt="user" className="avatar-xs mr-2 rounded-circle" /> {order.processor}
                                                            </td>
                                                            <td><Badge color={order.color} className="badge-pill">{order.status}</Badge></td>
                                                            <td>
                                                                {order.started ? order.started: "-"}
                                                            </td>
                                                            <td>
                                                                {order.updated ? order.updated : "-"}
                                                            </td>
                                                            <td>
                                                                {order.completed ? order.completed : "-"}
                                                            </td>
                                                            <td>
                                                                {order.amount ? order.amount + " L" : "-"}
                                                            </td>
                                                            <td>
                                                                <Button color="secondary" size="sm" className="waves-effect waves-light">Restore</Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                </TabPane>
                                <TabPane tabId="4" className="p-3">
                                    <div className="table-responsive">
                                        <Table className="table-centered table-vertical table-nowrap mb-1">
                                            <thead>
                                                <tr>
                                                    <th>Batch ID</th>
                                                    <th>Product</th>
                                                    <th>Processor</th>
                                                    <th>Status</th>
                                                    <th>Started</th>
                                                    <th>Updated</th>
                                                    <th>Completed</th>
                                                    <th>Final Volume</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    deletedBrews.map((order, key) =>
                                                        <tr key={key}>
                                                            <td>#{order.id}</td>
                                                            <td>
                                                                <img src={noImage} alt="user" className="avatar-xs mr-2 rounded-circle" /> {order.name && order.name}
                                                            </td>
                                                            <td>
                                                                <img src={order.imgUrl} alt="user" className="avatar-xs mr-2 rounded-circle" /> {order.processor}
                                                            </td>
                                                            <td><Badge color={order.color} className="badge-pill">{order.status}</Badge></td>
                                                            <td>
                                                                {order.started ? order.started: "-"}
                                                            </td>
                                                            <td>
                                                                {order.updated ? order.updated : "-"}
                                                            </td>
                                                            <td>
                                                                {order.completed ? order.completed : "-"}
                                                            </td>
                                                            <td>
                                                                {order.amount ? order.amount + " L" : "-"}
                                                            </td>
                                                            <td>
                                                                <Button color="secondary" size="sm" className="waves-effect waves-light">Restore</Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                </TabPane>
                            </TabContent>
                        </CardBody>
                        <CardFooter>
                            <Button className="mt-1" color="primary">Repackage Items</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}