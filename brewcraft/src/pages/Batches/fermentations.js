import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    Table,
    Badge,
    Button,
    TabContent,
    TabPane,
    NavLink,
    NavItem,
    Nav,
    UncontrolledAlert
} from "reactstrap";
import classnames from "classnames";
import { setBreadcrumbItems } from "../../store/actions";
import user1 from "../../assets/images/users/user-4.jpg";
import user2 from "../../assets/images/users/user-6.jpg";
import noImage from "../../assets/images/no-image.jpg";

import Calendar from "./components/calendar";
import FermenationChart from "./components/fermentation-chart";

const orders = [
    { imgUrl : user1, id : "85214796", name : "Fantastic Lager", processor: "Martin", status : "Ferment", equipment: "FT-4", started : "5/12/2016 2:10 PM", updated : "5/12/2016 2:30 PM", color : "info" },
    { imgUrl : user1, id : "52140300", name : "Fantastic Lager", processor: "Martin", status : "Ferment", equipment: "FT-7", started : "5/12/2016 1:47 PM", updated : "5/12/2016 2:01 PM", color : "info" },
    { imgUrl : user2, id : "96254137", name : "Special Ale", processor: "Robert", status : "Condition", equipment: "CT-4", started : "5/12/2016 11:49 AM", updated : "5/12/2016 1:20 PM", color : "info" },
    { imgUrl : user2, id : "12365474", name : "Warm Stout", processor: "Robert", status : "Condition", equipment: "CT-5", started : "5/12/2016 9:10 AM", updated: "5/12/2016 10:02 AM", color : "info" },
    { imgUrl : user2, id : "12354781", name : "Delicious IPA", processor: "Robert", status : "Bright Tank", equipment: "BT-1", amount : "584", started : "5/10/2016 8:10 AM", updated : "5/10/2016 1:27 PM", color : "info" },
    { imgUrl : user2, id : "12344345", name : "Delicious IPA", processor: "Robert", status : "Failed", amount : "0", started : "5/09/2016 4:10 PM", updated : "5/10/2016 1:27 PM", completed : "5/09/2016 8:01 PM", color : "danger" }
];

const activeBatches = [
    { imgUrl : user1, id : "85214796", name : "Fantastic Lager", processor: "Martin", status : "Ferment", equipment: "FT-4", started : "5/12/2016 2:10 PM", updated : "5/12/2016 2:30 PM", color : "info" },
    { imgUrl : user1, id : "52140300", name : "Fantastic Lager", processor: "Martin", status : "Ferment", equipment: "FT-7", started : "5/12/2016 1:47 PM", updated : "5/12/2016 2:01 PM", color : "info" },
    { imgUrl : user2, id : "96254137", name : "Special Ale", processor: "Robert", status : "Condition", equipment: "CT-4", started : "5/12/2016 11:49 AM", updated : "5/12/2016 1:20 PM", color : "info" },
    { imgUrl : user2, id : "12365474", name : "Warm Stout", processor: "Robert", status : "Condition", equipment: "CT-5", started : "5/12/2016 9:10 AM", updated: "5/12/2016 10:02 AM", color : "info" },
    { imgUrl : user2, id : "12354781", name : "Delicious IPA", processor: "Robert", status : "Bright Tank", equipment: "BT-1", amount : "584", started : "5/10/2016 8:10 AM", updated : "5/10/2016 1:27 PM", completed : "5/10/2016 1:27 PM", color : "info" }
];

const deletedBatches = [
    { imgUrl : user2, id : "12354781", name : "Delicious IPA", processor: "Robert", status : "Bright Tank", equipment: "BT-1", amount : "584", started : "5/10/2016 8:10 AM", updated : "5/10/2016 1:27 PM", color : "info" },
    { imgUrl : user2, id : "12344345", name : "Delicious IPA", processor: "Robert", status : "Failed", amount : "0", started : "5/09/2016 4:10 PM", updated : "5/10/2016 1:27 PM", completed : "5/09/2016 8:01 PM", color : "danger" }
]

export default function Fermentation() {
    const [activeTab, setActiveTab] = useState("1");
    const dispatch = useDispatch();

    // component did mount alternative for functional component
    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Fermentation Overview", [
                { title: "Main", link: "#" },
                { title: "Batches", link: "#" },
            ])
        );
    }, []);

    return (
        <React.Fragment>
            <UncontrolledAlert color="info">
                <strong>Heads up!</strong> Batch <Link style={{color: "#156176"}} to="#">#85214796 Fantastic Lager</Link> is set to finish fermenting in 2 days.
            </UncontrolledAlert >
            <Row>
                <Col xl="3" md="6">
                    <Card className="mini-stat bg-primary">
                        <CardBody className="mini-stat-img">
                            <div className="mini-stat-icon">
                                <i className={"mdi mdi-flask float-right"}></i>
                            </div>
                            <div className="text-white">
                                <h6 className="text-uppercase font-size-16">Fermenting</h6>
                                <h2>162 HL</h2>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="3" md="6">
                    <Card className="mini-stat bg-primary">
                        <CardBody className="mini-stat-img">
                            <div className="mini-stat-icon">
                                <i className={"mdi mdi-bottle-tonic float-right"}></i>
                            </div>
                            <div className="text-white">
                                <h6 className="text-uppercase font-size-16">Conditioning</h6>
                                <h2>984 HL</h2>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="3" md="6">
                    <Card className="mini-stat bg-primary">
                        <CardBody className="mini-stat-img">
                            <div className="mini-stat-icon">
                                <i className={"mdi mdi-waves float-right"}></i>
                            </div>
                            <div className="text-white">
                                <h6 className="text-uppercase font-size-16">Filtering</h6>
                                <h2>-</h2>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="3" md="6">
                    <Card className="mini-stat bg-primary">
                        <CardBody className="mini-stat-img">
                            <div className="mini-stat-icon">
                                <i className={"mdi mdi-silo float-right"}></i>
                            </div>
                            <div className="text-white">
                                <h6 className="text-uppercase font-size-16">Bright Tanks</h6>
                                <h2>9,040 HL</h2>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xl="6">
                    <Calendar />
                </Col>
                <Col xl="5">
                    <FermenationChart />
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <Card>
                        <CardHeader>
                            <h4 className="card-title mb-1">Batches Table</h4>
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
                                            <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                                            <span className="d-none d-sm-block">All Batches</span>
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
                                            <span className="d-block d-sm-none"><i className="far fa-user"></i></span>
                                            <span className="d-none d-sm-block">Active Batches</span>
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
                                            <span className="d-none d-sm-block">Deleted Batches</span>
                                    </NavLink>
                                </NavItem>
                            </Nav>

                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1" className="p-3">
                                    <div className="table-responsive">
                                        <Table className="table-centered table-vertical table-nowrap mb-1">
                                            <thead>
                                                <tr>
                                                    <th>Batch ID</th>
                                                    <th>Product</th>
                                                    <th>Processor</th>
                                                    <th>Status</th>
                                                    <th>Equipment</th>
                                                    <th>Started</th>
                                                    <th>Updated</th>
                                                    <th>Completed</th>
                                                    <th>Finished Volume</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    orders.map((order, key) =>
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
                                                                {order.equipment ? order.equipment: "-"}
                                                            </td>
                                                            <td>
                                                                {order.started ? order.started : "-"}
                                                            </td>
                                                            <td>
                                                                {order.updated ? order.updated : "-"}
                                                            </td>
                                                            <td>
                                                                {order.completed ? order.completed : "-"}
                                                            </td>
                                                            <td>
                                                                {order.volume ? order.volume : "-"}
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
                                                    <th>Equipment</th>
                                                    <th>Started</th>
                                                    <th>Updated</th>
                                                    <th>Completed</th>
                                                    <th>Finished Volume</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    activeBatches.map((order, key) =>
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
                                                                {order.equipment ? order.equipment: "-"}
                                                            </td>
                                                            <td>
                                                                {order.started ? order.started : "-"}
                                                            </td>
                                                            <td>
                                                                {order.updated ? order.updated : "-"}
                                                            </td>
                                                            <td>
                                                                {order.completed ? order.completed : "-"}
                                                            </td>
                                                            <td>
                                                                {order.volume ? order.volume : "-"}
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
                                                    <th>Equipment</th>
                                                    <th>Started</th>
                                                    <th>Updated</th>
                                                    <th>Completed</th>
                                                    <th>Finished Volume</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    deletedBatches.map((order, key) =>
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
                                                                {order.equipment ? order.equipment: "-"}
                                                            </td>
                                                            <td>
                                                                {order.started ? order.started : "-"}
                                                            </td>
                                                            <td>
                                                                {order.updated ? order.updated : "-"}
                                                            </td>
                                                            <td>
                                                                {order.completed ? order.completed : "-"}
                                                            </td>
                                                            <td>
                                                                {order.volume ? order.volume : "-"}
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
                            </TabContent>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </React.Fragment>
    );
}