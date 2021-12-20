import React, { Component } from "react";
import { Table, Card, Badge, Button } from "reactstrap";

import fantasticLager from "../../assets/images/products/fantastic-lager.jpg";
import deliciousIpa from "../../assets/images/products/delicous-ipa.jpg";
import specialAle from "../../assets/images/products/special-ale.jpg";
import warmStout from "../../assets/images/products/warm-stout.jpg";

class LatestOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [
                {
                    imgUrl: fantasticLager,
                    id: "12354781",
                    name: "Fantastic Lager",
                    status: "Delivered",
                    amount: "185",
                    date: "5/12/2016",
                    color: "success",
                },
                {
                    imgUrl: fantasticLager,
                    id: "52140300",
                    name: "Fantastic Lager",
                    status: "Delivered",
                    amount: "1,024",
                    date: "5/12/2016",
                    color: "success",
                },
                {
                    imgUrl: deliciousIpa,
                    id: "96254137",
                    name: "Delicious IPA",
                    status: "Cancel",
                    amount: "657",
                    date: "5/12/2016",
                    color: "danger",
                },
                {
                    imgUrl: specialAle,
                    id: "12365474",
                    name: "Special Ale",
                    status: "Shipped",
                    amount: "8451",
                    date: "5/12/2016",
                    color: "warning",
                },
                {
                    imgUrl: fantasticLager,
                    id: "85214796",
                    name: "Fantastic Lager",
                    status: "Delivered",
                    amount: "584",
                    date: "5/12/2016",
                    color: "success",
                },
                {
                    imgUrl: warmStout,
                    id: "12354781",
                    name: "Warm Stout",
                    status: "Delivered",
                    amount: "185",
                    date: "5/12/2016",
                    color: "success",
                },
            ],
        };
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <div className="card-body">
                        <h4 className="card-title mb-4">Latest Orders</h4>

                        <div className="table-responsive">
                            <Table className="table-centered table-vertical table-nowrap mb-1">
                                <tbody>
                                    {this.state.orders.map((order, key) => (
                                        <tr key={key}>
                                            <td>#{order.id}</td>
                                            <td>
                                                <img
                                                    src={order.imgUrl}
                                                    alt="user"
                                                    className="avatar-xs mr-2 rounded-circle"
                                                />{" "}
                                                {order.name}
                                            </td>
                                            <td>
                                                <Badge
                                                    color={order.color}
                                                    className="badge-pill"
                                                >
                                                    {order.status}
                                                </Badge>
                                            </td>
                                            <td>${order.amount}</td>
                                            <td>{order.date}</td>
                                            <td>
                                                <Button
                                                    color="secondary"
                                                    size="sm"
                                                    className="waves-effect waves-light"
                                                >
                                                    View
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Card>
            </React.Fragment>
        );
    }
}

export default LatestOrders;
