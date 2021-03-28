import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../store/Products/actions";
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
  Label,
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
import noImage from "../../assets/images/no-image.jpg";

const units = ["hl", "l", "ml", "kg", "g"];

export default function Material() {
    const [product, setProduct] = useState({});
    const [editable, setEditable] = useState(false);
    let { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(
        //     fetchProductById({
        //         id: id,
        //         success: data => {
        //             setProduct(data);
        //             dispatch(
        //                 setBreadcrumbItems(data.name, [
        //                     { title: "Main", link: "#" },
        //                     { title: "Products", link: "#" }
        //                 ]),
        //             );
        //         }
        //     }));
        const product = {
            id: "1",
            name: "Fantastic Lager",
            description: "In the moood for something satisfying? Grab a F. Lager.",
            categoryId: "active",
            status: "actve",
            created: "Jan 2, 2021",
            update: "Jan 2, 20201",
            color: "info",
            type: "lager",
            abv: "5.0%",
            ibu: "1.0",
            ph: "1.0",
            mashTemperature: "52C",
            gravity: "1.0",
            yield: "1.0",
            brewhouseDuration: "1.0",
            fermentationDays: "5",
            conditioningDays: "10",
            image: noImage
        };
        setProduct(product);
        dispatch(setBreadcrumbItems(product.name, [
            { title: "Main", link: "#" },
            { title: "Products", link: "#" }]
        ));
    }, []);

    return (
        <React.Fragment>
            {/* <Button type="button" color="primary" size="sm" className="waves-effect mr-2 mb-3" disabled={!editable}>Save</Button> */}
            <Button type="button" color="secondary" size="sm" className="waves-effect mb-3" onClick={() => setEditable(true)} disabled={editable}>Edit</Button>
            <Row>
                <Col md={9}>
                    <Card>
                        {/* <CardHeader>
                            <h4 className="card-title font-size-14 align-middle">Product Details</h4>
                            <Button color="secondary" size="sm" className="waves-effect align-middle float-right">Edit</Button>
                        </CardHeader> */}
                        <CardBody>
                            <Row>
                                <Col sm="6">
                                    <Row>
                                        <Col xs="6">
                                            <Label
                                                for="name"
                                            >
                                                Name
                                            </Label>
                                        </Col>
                                        <Col xs="6">
                                            {
                                                editable ?
                                                    <Input
                                                        type="text"
                                                        className="waves-effect mb-2"
                                                        size="sm"
                                                        defaultValue={product.name}
                                                        name="name"
                                                    /> : product.name
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6">
                                    <Row>
                                        <Col xs="6">
                                            <Label
                                                for="category.name"
                                            >
                                                Category
                                            </Label>
                                        </Col>
                                        <Col xs="6">
                                            {
                                                editable ?
                                                    <Input
                                                        type="select"
                                                        className="waves-effect mb-2"
                                                        size="sm"
                                                        name="category.name"
                                                    >
                                                        <option>Lager</option>
                                                        <option>Pale Ale</option>
                                                        <option>Stout</option>
                                                        <option>IPA</option>
                                                        <option>Pilsner</option>
                                                    </Input> : "Lager"
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="3">
                                    <Label
                                        for="description"
                                    >
                                        Description
                                    </Label>
                                </Col>
                                <Col xs="9">
                                    <Input
                                        type="textarea"
                                        className="waves-effect mb-2"
                                        defaultValue={product.description}
                                        rows={4}
                                        name="description"
                                        disabled={!editable}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6">
                                    <Row>
                                        <Col xs="6">
                                            <Label
                                                for="abv"
                                            >
                                                ABV.
                                            </Label>
                                        </Col>
                                        <Col xs="6">
                                            {
                                                editable ?
                                                    <Input
                                                        type="text"
                                                        className="waves-effect mb-2"
                                                        size="sm"
                                                        defaultValue={product.abv}
                                                        name="abv"
                                                    /> : product.abv
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6">
                                    <Row>
                                        <Col xs="6">
                                            <Label
                                                for="ibu"
                                            >
                                                IBU
                                            </Label>
                                        </Col>
                                        <Col xs="6">
                                            {
                                                editable ?
                                                    <Input
                                                        type="text"
                                                        className="waves-effect mb-2"
                                                        size="sm"
                                                        defaultValue={product.ibu}
                                                        name="ibu"
                                                    /> : product.ibu
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm="6">
                                    <Row>
                                        <Col xs="6">
                                            <Label
                                                for="ph"
                                            >
                                                PH
                                            </Label>
                                        </Col>
                                        <Col xs="6">
                                            {
                                                editable ?
                                                    <Input
                                                        type="text"
                                                        className="waves-effect mb-2"
                                                        size="sm"
                                                        defaultValue={product.ph}
                                                        name="ph"
                                                    /> : product.ph
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6">
                                    <Row>
                                        <Col xs="6">
                                            <Label
                                                for="fermentationDays"
                                            >
                                                Fermentation Days
                                            </Label>
                                        </Col>
                                        <Col xs="6">
                                            {
                                                editable ?
                                                    <Input
                                                        type="text"
                                                        className="waves-effect mb-2"
                                                        size="sm"
                                                        defaultValue={product.fermentationDays}
                                                        name="fermentationDays"
                                                    /> : product.fermentationDays
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm="6">
                                    <Row>
                                        <Col xs="6">
                                            <Label
                                                for="conditioningDays"
                                            >
                                                Conditioning Days
                                            </Label>
                                        </Col>
                                        <Col xs="6">
                                            {
                                                editable ?
                                                    <Input
                                                        type="text"
                                                        className="waves-effect mb-2"
                                                        size="sm"
                                                        defaultValue={product.conditioningDays}
                                                        name="conditioningDays"
                                                    /> : product.conditioningDays
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6">
                                    <Row>
                                        <Col xs="6">
                                            <Label
                                                for="mashTemperature"
                                            >
                                                Mash Temperature
                                            </Label>
                                        </Col>
                                        <Col xs="6">
                                            {
                                                editable ?
                                                    <Input
                                                        type="text"
                                                        className="waves-effect mb-2"
                                                        size="sm"
                                                        defaultValue={product.mashTemperature}
                                                        name="mashTemperature"
                                                    /> : product.mashTemperature
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm="6">
                                    <Row>
                                        <Col xs="6">
                                            <Label
                                                for="gravity"
                                            >
                                                Gravity
                                            </Label>
                                        </Col>
                                        <Col xs="6">
                                            {
                                                editable ?
                                                    <Input
                                                        type="text"
                                                        className="waves-effect mb-2"
                                                        size="sm"
                                                        defaultValue={product.gravity}
                                                        name="gravity"
                                                    /> : product.gravity
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6">
                                    <Row>
                                        <Col xs="6">
                                            <Label
                                                for="yield"
                                            >
                                                Yield
                                            </Label>
                                        </Col>
                                        <Col xs="6">
                                            {
                                                editable ?
                                                    <Input
                                                        type="text"
                                                        className="waves-effect mb-2"
                                                        size="sm"
                                                        defaultValue={product.yield}
                                                        name="yield"
                                                    /> : product.yield
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm="6">
                                    <Row>
                                        <Col xs="6">
                                            <Label
                                                for="brewhouseDuration"
                                            >
                                                Brewhouse Duration
                                            </Label>
                                        </Col>
                                        <Col xs="6">
                                            {
                                                editable ?
                                                    <Input
                                                        type="text"
                                                        className="waves-effect mb-2"
                                                        size="sm"
                                                        defaultValue={product.brewhouseDuration}
                                                        name="brewhouseDuration"
                                                    /> : product.brewhouseDuration
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="3">
                    <Card>
                        <CardBody>
                            <img style={{ width: "100%" }} src={noImage} alt="material" className="border d-block mr-2 mb-2 p-1" />
                            <span className="d-block mb-2">No image found ..</span>
                            <Button type="button" color="primary" size="sm" className="waves-effect mr-2">Upload</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Button type="button" color="primary" size="sm" className="waves-effect mr-2 mb-3" disabled={!editable}>Save</Button>
             <Button type="button" color="secondary" size="sm" className="waves-effect mb-3" onClick={() => setEditable(false)} disabled={!editable}>Cancel</Button>
        </React.Fragment>
    );
}