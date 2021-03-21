import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Table,
    Badge,
    Button
} from "reactstrap";
import { setBreadcrumbItems } from "../../store/actions";
import user1 from "../../assets/images/users/user-4.jpg";
import user2 from "../../assets/images/users/user-6.jpg";
import noImage from "../../assets/images/no-image.jpg";

const orders = [
    { imgUrl : user1, id : "85214796", name : "Fantastic Lager", processor: "Martin", status : "Whirlpool", started : "5/12/2016 2:10 PM", updated : "5/12/2016 2:30 PM", color : "info" },
    { imgUrl : user1, id : "52140300", name : "Fantastic Lager", processor: "Martin", status : "Kettle", started : "5/12/2016 1:47 PM", updated : "5/12/2016 2:01 PM", color : "info" },
    { imgUrl : user2, id : "96254137", name : "Special Ale", processor: "Robert", status : "Lauter", started : "5/12/2016 11:49 AM", updated : "5/12/2016 1:20 PM", color : "info" },
    { imgUrl : user2, id : "12365474", name : "Warm Stout", processor: "Robert", status : "Lauter", started : "5/12/2016 9:10 AM", updated: "5/12/2016 10:02 AM", color : "info" },
    { imgUrl : user2, id : "12354781", name : "Delicious IPA", processor: "Robert", status : "Complete", amount : "584", started : "5/10/2016 8:10 AM", updated : "5/10/2016 1:27 PM", completed : "5/10/2016 1:27 PM", color : "success" },
    { imgUrl : user2, id : "12344345", name : "Delicious IPA", processor: "Robert", status : "Failed", amount : "0", started : "5/09/2016 4:10 PM", updated : "5/10/2016 1:27 PM", completed : "5/09/2016 8:01 PM", color : "danger" },
];

export default function Brews() {
    // dispatch action
    const dispatch = useDispatch();

    // component did mount alternative for functional component
    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Brews Overview", [
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
                                <h6 className="text-uppercase font-size-16">Mash</h6>
                                <h2>-</h2>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="3" md="6">
                    <Card className="mini-stat bg-primary">
                        <CardBody className="mini-stat-img">
                            <div className="mini-stat-icon">
                                <i className={"mdi mdi-shower-head float-right"}></i>
                            </div>
                            <div className="text-white">
                                <h6 className="text-uppercase font-size-16">Lauter</h6>
                                <h2>2</h2>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="3" md="6">
                    <Card className="mini-stat bg-primary">
                        <CardBody className="mini-stat-img">
                            <div className="mini-stat-icon">
                                <i className={"mdi mdi-kettle float-right"}></i>
                            </div>
                            <div className="text-white">
                                <h6 className="text-uppercase font-size-16">Kettle</h6>
                                <h2>1</h2>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="3" md="6">
                    <Card className="mini-stat bg-primary">
                        <CardBody className="mini-stat-img">
                            <div className="mini-stat-icon">
                                <i className={"mdi mdi-tumble-dryer float-right"}></i>
                            </div>
                            <div className="text-white">
                                <h6 className="text-uppercase font-size-16">Whirlpool</h6>
                                <h2>1</h2>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h4>All Brews</h4>
                        </CardHeader>
                        <CardBody>
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
                                                        <Button color="secondary" size="sm" className="waves-effect waves-light">Brew</Button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </CardBody>
                        <CardFooter>
                            <Link to="#">
                                <Button color="secondary" size="sm" className="waves-effect waves-light">Start Brew</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}