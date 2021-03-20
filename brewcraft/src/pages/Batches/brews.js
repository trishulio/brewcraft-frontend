import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    Row,
    Col,
    Card,
    CardBody,
    Table,
    Badge,
    Button
} from "reactstrap";
import { setBreadcrumbItems } from "../../store/actions";
import user1 from "../../assets/images/users/user-1.jpg";
import user2 from "../../assets/images/users/user-2.jpg";
import user3 from "../../assets/images/users/user-3.jpg";
import user4 from "../../assets/images/users/user-4.jpg";
import user5 from "../../assets/images/users/user-5.jpg";
import user6 from "../../assets/images/users/user-6.jpg";

const orders = [
    { imgUrl : user1, id : "12354781", name : "Special Ale", status : "Whirlpool", amount : "185", date : "5/12/2016 2:10 PM", color : "info" },
    { imgUrl : user2, id : "52140300", name : "Fantastic Lager", status : "Kettle", amount : "1,024", date : "5/12/2016 1:47 PM", color : "info" },
    { imgUrl : user3, id : "96254137", name : "Fantastic Lager", status : "Lauter", amount : "657", date : "5/12/2016 11:49 AM", color : "info" },
    { imgUrl : user4, id : "12365474", name : "Warm Stout", status : "Lauter", amount : "8451", date : "5/12/2016 9:10 AM", color : "info" },
    { imgUrl : user5, id : "85214796", name : "Delicious IPA", status : "Complete", amount : "584", date : "5/08/2016 4:10 PM", color : "success" },
    { imgUrl : user6, id : "12354781", name : "Delicious IPA", status : "Complete", amount : "185", date : "5/09/2016 4:10 PM", color : "success" },
];

export default function Brews() {
    // dispatch action
    const dispatch = useDispatch();

    // component did mount alternative for functional component
    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Brews", [
                { title: "Batches", link: "/dashboard" },
                { title: "Brews", link: "#" },
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
                                <h2>0</h2>
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
                <Col xl="9">
                    <Card>
                        <CardBody>
                            <div className="table-responsive">
                                <Table className="table-centered table-vertical table-nowrap mb-1">
                                    <tbody>
                                        {
                                            orders.map((order, key) =>
                                                <tr key={key}>
                                                    <td>#{order.id}</td>
                                                    <td>
                                                        <img src={order.imgUrl} alt="user" className="avatar-xs mr-2 rounded-circle" /> {order.name}
                                                    </td>
                                                    <td><Badge color={order.color} className="badge-pill">{order.status}</Badge></td>
                                                    <td>
                                                        {order.amount} L
                                                    </td>
                                                    <td>
                                                        {order.date}
                                                    </td>
                                                    <td>
                                                        <Button color="secondary" size="sm" className="waves-effect waves-light">Edit</Button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}