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
  TabPane,
  Pagination,
  PaginationItem,
  PaginationLink
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
        type: "lager"
    }, {
        id: "2",
        name: "Special Ale",
        description: "Don't feel bad you're not as special.",
        status: "actve",
        color: "info",
        type: "pale ale"
    }, {
        id: "3",
        name: "Warm Stout",
        status: "actve",
        color: "info",
        type: "stout"
    }, {
        id: "4",
        name: "Delicious IPA",
        description: "The beer that eats like a meal.",
        status: "actve",
        color: "info",
        type: "beer"
    }];

    return (
        <React.Fragment>
            <Button color="primary" size="" className="waves-effect mb-3">New Product</Button>
            <Card>
                <CardBody className="py-2">
                    <Row className="mb-3">
                        <Col sm="6">
                            {/* <Nav>
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
                            </Nav> */}
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col sm="6">
                            <Input
                                type="select"
                                size="sm"
                                className="waves-effect float-left mr-2"
                                style={{ width: 60 }}
                            >
                                <option>10</option>
                                <option>25</option>
                                <option>100</option>
                            </Input>
                        </Col>
                        <Col sm={6}>
                            <Input
                                size="sm"
                                type="search"
                                name="search"
                                id="exampleSearch"
                                placeholder="Products .."
                                className="align-middle float-right"
                                style={{ width: 170 }}
                            />
                            <Input
                                type="select"
                                size="sm"
                                className="waves-effect float-right mr-2"
                                style={{ width: 100 }}
                            >
                                <option>All</option>
                                <option>Active</option>
                                <option>Not Active</option>
                            </Input>
                        </Col>
                    </Row>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <div className="table-responsive table-striped table-sm">
                                <Table className="table-centered table-vertical table-nowrap mb-1">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Image</th>
                                            <th>Product Name</th>
                                            <th>Product Description</th>
                                            <th>Product Type</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products.map((product, key) =>
                                                <tr key={key}>
                                                    <td>#{product.id}</td>
                                                    <td><img src={noImage} alt="user" className="avatar-xs mr-2 rounded-circle" /></td>
                                                    <td>{product.name && product.name}</td>
                                                    <td>{product.description ? product.description: "-"}</td>
                                                    <td>{product.type ? product.type : "-"}</td>
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
                            <Row>
                                <Col sm={6}>
                                    <span className="font-size-12 float-left mt-3">Showing 11 to 20 of 100 results ..</span>
                                </Col>
                                <Col sm={6}>
                                    <Pagination className="float-right mt-3">
                                        <PaginationItem disabled>
                                            <PaginationLink href="#" tabIndex="-1">Previous</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                                        <PaginationItem active>
                                            <PaginationLink href="#">2 <span className="sr-only">(current)</span></PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">Next</PaginationLink>
                                        </PaginationItem>
                                    </Pagination>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}