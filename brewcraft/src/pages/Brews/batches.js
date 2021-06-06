import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    Row,
    Col,
    Card,
    CardBody,
    Table,
    Badge,
    Button,
    TabContent,
    TabPane,
    NavLink,
    NavItem,
    Nav
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import classnames from "classnames";
import { setBreadcrumbItems } from "../../store/actions";

import fantasticLager from "../../assets/images/products/fantastic-lager.jpg";
import deliciousIpa from "../../assets/images/products/delicous-ipa.jpg";
import specialAle from "../../assets/images/products/special-ale.jpg";
import warmStout from "../../assets/images/products/warm-stout.jpg";
import noImage from "../../assets/images/no-image.jpg";

const activeMonth = [
    { imgUrl : fantasticLager, id : "85214796", name : "Fantastic Lager", processor: "Martin", status : "Complete", equipment: "FT-4", started : "5/12/2016 2:10 PM", updated : "5/12/2016 2:30 PM", color : "info" },
    { imgUrl : fantasticLager, id : "52140300", name : "Fantastic Lager", processor: "Martin", status : "Complete", equipment: "FT-7", started : "5/12/2016 1:47 PM", updated : "5/12/2016 2:01 PM", color : "info" },
    { imgUrl : specialAle, id : "96254137", name : "Special Ale", processor: "Robert", status : "Complete", equipment: "CT-4", started : "5/12/2016 11:49 AM", updated : "5/12/2016 1:20 PM", color : "info" },
    { imgUrl : warmStout, id : "12365474", name : "Warm Stout", processor: "Robert", status : "Complete", equipment: "CT-5", started : "5/12/2016 9:10 AM", updated: "5/12/2016 10:02 AM", color : "info" },
    { imgUrl : deliciousIpa, id : "12354781", name : "Delicious IPA", processor: "Robert", status : "Complete", equipment: "BT-1", amount : "584", started : "5/10/2016 8:10 AM", updated : "5/10/2016 1:27 PM", completed : "5/10/2016 1:27 PM", color : "info" }
];

const lastMonth = [
    { imgUrl : fantasticLager, id : "85214796", name : "Fantastic Lager", processor: "Martin", status : "Complete", equipment: "FT-4", started : "5/12/2016 2:10 PM", updated : "5/12/2016 2:30 PM", color : "info" },
    { imgUrl : fantasticLager, id : "52140300", name : "Fantastic Lager", processor: "Martin", status : "Complete", equipment: "FT-7", started : "5/12/2016 1:47 PM", updated : "5/12/2016 2:01 PM", color : "info" },
    { imgUrl : specialAle, id : "96254137", name : "Special Ale", processor: "Robert", status : "Complete", equipment: "CT-4", started : "5/12/2016 11:49 AM", updated : "5/12/2016 1:20 PM", color : "info" },
    { imgUrl : warmStout, id : "12365474", name : "Warm Stout", processor: "Robert", status : "Complete", equipment: "CT-5", started : "5/12/2016 9:10 AM", updated: "5/12/2016 10:02 AM", color : "info" },
    { imgUrl : deliciousIpa, id : "12354781", name : "Delicious IPA", processor: "Robert", status : "Complete", equipment: "BT-1", amount : "584", started : "5/10/2016 8:10 AM", updated : "5/10/2016 1:27 PM", color : "info" },
    { imgUrl : deliciousIpa, id : "12344345", name : "Delicious IPA", processor: "Robert", status : "Failed", amount : "0", started : "5/09/2016 4:10 PM", updated : "5/10/2016 1:27 PM", completed : "5/09/2016 8:01 PM", color : "danger" }
];

const customBatches = [
    { imgUrl : deliciousIpa, id : "12354781", name : "Delicious IPA", processor: "Robert", status : "Failed", equipment: "BT-1", amount : "584", started : "5/10/2016 8:10 AM", updated : "5/10/2016 1:27 PM", color : "danger" },
    { imgUrl : deliciousIpa, id : "12344345", name : "Delicious IPA", processor: "Robert", status : "Failed", amount : "0", started : "5/09/2016 4:10 PM", updated : "5/10/2016 1:27 PM", completed : "5/09/2016 8:01 PM", color : "danger" }
]

export default function Fermentation() {
    const [activeTab, setActiveTab] = useState("1");
    const dispatch = useDispatch();

    // component did mount alternative for functional component
    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Batches Overview", [
                { title: "Main", link: "#" },
                { title: "Batches", link: "#" },
            ])
        );
    }, []);

    return (
        <React.Fragment>
            <Row>
                <Col xl="3" md="6">
                    <Card className="mini-stat bg-primary">
                        <CardBody className="mini-stat-img">
                            <div className="mini-stat-icon">
                                <i className={"mdi mdi-barley float-right"}></i>
                            </div>
                            <div className="text-white">
                                <h6 className="text-uppercase font-size-16">Malt Used<br/>Month-to-date</h6>
                                <h2 className="mb-4">20.28 kg</h2>
                                <Badge color="info"> -5.0%</Badge><span className="ml-2">From previous month</span>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="3" md="6">
                    <Card className="mini-stat bg-primary">
                        <CardBody className="mini-stat-img">
                            <div className="mini-stat-icon">
                                <i className={"mdi mdi-barley float-right"}></i>
                            </div>
                            <div className="text-white">
                                <h6 className="text-uppercase font-size-16">Malt Used<br/>Year-to-date</h6>
                                <h2 className="mb-4">196.1 kg</h2>
                                <Badge color="info"> -5.0%</Badge><span className="ml-2">From previous month</span>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="3" md="6">
                    <Card className="mini-stat bg-primary">
                        <CardBody className="mini-stat-img">
                            <div className="mini-stat-icon">
                                <i className={"mdi mdi-beer float-right"}></i>
                            </div>
                            <div className="text-white">
                                <h6 className="text-uppercase font-size-16">Finished Brews<br/>Month-to-date</h6>
                                <h2 className="mb-4">5</h2>
                                <Badge color="info"> -5.0%</Badge><span className="ml-2">From previous month</span>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="3" md="6">
                    <Card className="mini-stat bg-primary">
                        <CardBody className="mini-stat-img">
                        <div className="mini-stat-icon">
                                <i className={"mdi mdi-beer float-right"}></i>
                            </div>
                            <div className="text-white">
                                <h6 className="text-uppercase font-size-16">Finished Brews<br/>Year-to-date</h6>
                                <h2 className="mb-4">37</h2>
                                {/* <Badge color="info"> -35.0%</Badge><span className="ml-2">From previous year</span> */}
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Card>
                <CardBody>
                    <h4 className="card-title mb-4">Batches</h4>
                    <Nav pills>
                        <NavItem className="waves-effect waves-light">
                            <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({
                                    active: activeTab === "1"
                                })}
                                onClick={() => setActiveTab("1")}
                            >
                                <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                                <span className="d-none d-sm-block">Active Month</span>
                            </NavLink>
                        </NavItem>
                        <NavItem className="waves-effect waves-light">
                            <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({
                                    active: activeTab === "2"
                                })}
                                onClick={() => setActiveTab("2")}
                            >
                                <span className="d-block d-sm-none"><i className="far fa-user"></i></span>
                                <span className="d-none d-sm-block">Last Month</span>
                            </NavLink>
                        </NavItem>
                        <NavItem className="waves-effect waves-light">
                            <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({
                                    active: activeTab === "3"
                                })}
                                onClick={() => setActiveTab("3")}
                            >
                                <span className="d-block d-sm-none"><i className="far fa-user"></i></span>
                                <span className="d-none d-sm-block">Custom</span>
                            </NavLink>
                        </NavItem>
                    </Nav>

                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1" className="p-3">
                            <div className="table-responsive table-striped table-sm">
                                <Table className="table-centered table-vertical table-nowrap mb-1">
                                    <thead>
                                        <tr>
                                            <th>Batch ID</th>
                                            <th>Product</th>
                                            <th>Status</th>
                                            <th>Started</th>
                                            <th>Completed</th>
                                            <th>Total Packaged</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            activeMonth.map((order, key) =>
                                                <tr key={key}>
                                                    <td>#{order.id}</td>
                                                    <td>
                                                        <img src={order.imgUrl} alt="user" className="avatar-xs mr-2 rounded-circle" /> {order.name && order.name}
                                                    </td>
                                                    <td><Badge color={order.color} className="badge-pill">{order.status}</Badge></td>
                                                    <td>
                                                        {order.started ? order.started : "-"}
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
                            <div className="table-responsive table-striped table-sm">
                                <Table className="table-centered table-vertical table-nowrap mb-1">
                                    <thead>
                                        <tr>
                                            <th>Batch ID</th>
                                            <th>Product</th>
                                            <th>Status</th>
                                            <th>Started</th>
                                            <th>Completed</th>
                                            <th>Total Packaged</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            lastMonth.map((order, key) =>
                                                <tr key={key}>
                                                    <td>#{order.id}</td>
                                                    <td>
                                                        <img src={order.imgUrl} alt="user" className="avatar-xs mr-2 rounded-circle" /> {order.name && order.name}
                                                    </td>
                                                    <td><Badge color={order.color} className="badge-pill">{order.status}</Badge></td>
                                                    <td>
                                                        {order.started ? order.started : "-"}
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
                            <AvForm>
                                <Row>
                                    <Col xs="2">
                                        <AvField
                                            name="startDate"
                                            label="Begin date"
                                            type="date"
                                            errorMessage="Enter valid start date."
                                        />
                                    </Col>
                                    <Col xs="2">
                                        <AvField
                                            name="endDate"
                                            label="End date"
                                            type="date"
                                            errorMessage="Enter valid end date."
                                        />
                                    </Col>
                                    <Col xs="1">
                                        <AvField
                                            name="completed"
                                            label="Completed"
                                            type="checkbox"
                                        />
                                    </Col>
                                    <Col xs="1">
                                        <AvField
                                            name="failed"
                                            label="Failed"
                                            type="checkbox"
                                        />
                                    </Col>
                                </Row>
                            </AvForm>
                            <div className="table-responsive table-striped table-sm">
                                <Table className="table-centered table-vertical table-nowrap mb-1">
                                    <thead>
                                        <tr>
                                            <th>Batch ID</th>
                                            <th>Product</th>
                                            <th>Status</th>
                                            <th>Started</th>
                                            <th>Completed</th>
                                            <th>Total Packaged</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            customBatches.map((order, key) =>
                                                <tr key={key}>
                                                    <td>#{order.id}</td>
                                                    <td>
                                                        <img src={order.imgUrl} alt="user" className="avatar-xs mr-2 rounded-circle" /> {order.name && order.name}
                                                    </td>
                                                    <td><Badge color={order.color} className="badge-pill">{order.status}</Badge></td>
                                                    <td>
                                                        {order.started ? order.started : "-"}
                                                    </td>
                                                    <td>
                                                        {order.completed ? order.completed : "-"}
                                                    </td>
                                                    <td>
                                                        {order.volume ? order.volume : "-"}
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
            </Card>
        </React.Fragment>
    );
}