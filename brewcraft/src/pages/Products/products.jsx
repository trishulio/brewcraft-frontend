import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setBreadcrumbItems } from "../../store/actions";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Input,
  Table,
  Badge,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";
import classnames from "classnames";
import noImage from "../../assets/images/no-image.jpg";

const units = ["hl", "l", "ml", "kg", "g"];

export default function Material() {
    const [activeTab, setActiveTab] = useState("1");
    let { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Products", [
                { title: "Main", link: "#" },
                { title: "Products", link: "#" }
            ]),
        );
    }, []);

    const products = [{
        id: "1",
        name: "Fantastic Lager",
        description: "In the moood for something satisfying? Grab a F. Lager.",
        status: "actve",
        color: "info",
        abv: "5.0%"
    }, {
        id: "2",
        name: "Special Ale",
        description: "Don't feel bad you're not as special.",
        status: "actve",
        color: "info",
        abv: "5.5%"
    }, {
        id: "3",
        name: "Warm Stout",
        status: "actve",
        color: "info",
        abv: "5.0%"
    }, {
        id: "4",
        name: "Delicious IPA",
        description: "The beer that eats like a meal.",
        status: "actve",
        color: "info",
        abv: "6.5%"
    }];

    return (
        <React.Fragment>
            <Button color="primary" className="waves-effect mb-3">New Product</Button>
            <Card>
                <CardHeader>
                    <h4 className="card-title align-middle float-left">Products</h4>
                    <Input
                        size="sm"
                        type="search"
                        name="search"
                        id="exampleSearch"
                        placeholder="Products .."
                        className="align-middle float-right"
                        style={{ width: 170 }}
                    />
                </CardHeader>
                <CardBody>
                    <Row className="mb-3">
                        <Col sm="10">
                            <Nav>
                                <NavItem className="waves-effect waves-light">
                                    <NavLink
                                        style={{ cursor : "pointer" }}
                                            className={classnames({
                                                active: activeTab === "1"

                                            })}
                                            onClick={() => setActiveTab("1")}
                                        >
                                            <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                                            <span className="d-none d-sm-block">Active</span>
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
                                            <span className="d-none d-sm-block">Inactive</span>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Col>
                        <Col sm={{ size: 2, offset: 0 }}>
                            {/* <Input
                                size="sm"
                                type="search"
                                name="search"
                                id="exampleSearch"
                                placeholder="Products .."
                                className="d-inline align-middle mt-2"
                            /> */}
                        </Col>
                    </Row>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1" className="px-3">
                            <div className="table-responsive">
                                <Table className="table-centered table-vertical table-nowrap mb-1">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Image</th>
                                            <th>Product Name</th>
                                            <th>Product Description</th>
                                            <th>ABV.</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products.map((product, key) =>
                                                <tr key={key}>
                                                    <td>{product.id}</td>
                                                    <td><img src={noImage} alt="user" className="avatar-xs mr-2 rounded-circle" /></td>
                                                    <td>{product.name && product.name}</td>
                                                    <td>
                                                        {product.description ? product.description: "-"}
                                                    </td>
                                                    <td>
                                                        {product.abv ? product.abv: "-"}
                                                    </td>
                                                    <td><Badge color={product.color} className="badge-pill">{product.status}</Badge></td>
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
        </React.Fragment>
    );
}