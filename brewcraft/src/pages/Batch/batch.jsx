import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import {
//     fetchBatchById
// } from "../../store/Batches/actions";
import { setBreadcrumbItems } from "../../store/actions";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Label,
  Badge
} from "reactstrap";
import noImage from "../../assets/images/no-image.jpg";
import Details from "./details";

const units = ["hl", "l", "ml", "kg", "g"];

export default function Material() {
    const [item, setItem] = useState({
        id: "1",
        assignee: "Martin",
        owner: "Martin",
        name: "Fantastic Lager Batch 99",
        priority: "Medium",
        description: "In the moood for something satisfying? Grab a F. Lager.",
        status: "actve",
        stage: "wort",
        created: "Jan 2, 2021",
        updated: "Jan 2, 20201",
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
    });
    const [editable, setEditable] = useState(false);
    let { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(
        //     fetchBatchById({
        //         id: id,
        //         success: data => {
        //             setItem(data);
        //             dispatch(
        //                 setBreadcrumbItems(data.name, [
        //                     { title: "Main", link: "#" },
        //                     { title: "Batches", link: "#" }
        //                 ]),
        //             );
        //         }
        //     }));
        dispatch(setBreadcrumbItems(item.name, [
            { title: "Main", link: "#" },
            { title: "Batches", link: "#" }]
        ));
    }, []);

    return (
        <React.Fragment>
            <Button type="button" color="primary" className="waves-effect mr-2 mb-3">Edit</Button>
            <Button type="button" color="secondary" className="waves-effect mr-2 mb-3" onClick={() => setEditable(false)}>Record</Button>
            <Button type="button" color="secondary" className="waves-effect mr-2 mb-3" onClick={() => setEditable(true)}>Attach</Button>
            <Button type="button" color="secondary" className="waves-effect mr-2 mb-3" onClick={() => setEditable(true)}>...</Button>
            <Row>
                <Col md={8}>
                    <Card>
                        <CardHeader>
                            <h4 className="card-title font-size-12 align-middle">Description</h4>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col sm="6">
                                    <Row>
                                        <Col xs="6">
                                            <Label
                                                for="status"
                                                className="mb-3"
                                            >
                                                Status
                                            </Label>
                                        </Col>
                                        <Col xs="6">
                                            {
                                                editable ?
                                                    <Input
                                                        type="select"
                                                        className="waves-effect"
                                                        size="sm"
                                                        name="status"
                                                    >
                                                        <option>Active</option>
                                                        <option>Not Active</option>
                                                    </Input> : <Badge color="info">Active</Badge>
                                            }
                                        </Col>

                                    </Row>
                                </Col>
                                <Col sm="6">
                                    <Row>
                                        <Col xs="6">
                                            <Label
                                                for="status"
                                                className="mb-3"
                                            >
                                                Stage
                                            </Label>
                                        </Col>
                                        <Col xs="6">
                                            {
                                                editable ?
                                                    <Input
                                                        type="stage"
                                                        className="waves-effect"
                                                        size="sm"
                                                        name="status"
                                                    >
                                                        <option>Wort</option>
                                                        <option>Mash</option>
                                                        <option>Kettle</option>
                                                        <option>Whirlpool</option>
                                                        <option>Ferment</option>
                                                        <option>Condition</option>
                                                        <option>Bright Tank</option>
                                                    </Input> : <Badge color="primary">Wort</Badge>
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
                                                className="mb-3"
                                            >
                                                Category
                                            </Label>
                                        </Col>
                                        <Col xs="6">
                                            {
                                                editable ?
                                                    <Input
                                                        type="select"
                                                        className="waves-effect"
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
                                        defaultValue={item.description}
                                        rows={4}
                                        name="description"
                                        disabled={!editable}
                                    />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>
                            <h4 className="card-title font-size-12 align-middle">Brew Details</h4>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col sm="6">
                                    <Row>
                                        <Col xs="6">
                                            <Label
                                                for="abv"
                                                className="mb-3"
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
                                                        defaultValue={item.abv}
                                                        name="abv"
                                                    /> : item.abv
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm="6">
                                    <Row>
                                        <Col xs="6">
                                            <Label
                                                for="ph"
                                                className="mb-3"
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
                                                        defaultValue={item.ph}
                                                        name="ph"
                                                    /> : item.ph
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
                                                className="mb-3"
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
                                                        defaultValue={item.ibu}
                                                        name="ibu"
                                                    /> : item.ibu
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm="6">
                                    <Row>
                                        <Col xs="6">
                                            <Label
                                                for="yield"
                                                className="mb-3"
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
                                                        defaultValue={item.yield}
                                                        name="yield"
                                                    /> : item.yield
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
                                                className="mb-3"
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
                                                        defaultValue={item.mashTemperature}
                                                        name="mashTemperature"
                                                    /> : item.mashTemperature
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm="6">
                                    <Row>
                                        <Col xs="6">
                                            <Label
                                                for="gravity"
                                                className="mb-3"
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
                                                        defaultValue={item.gravity}
                                                        name="gravity"
                                                    /> : item.gravity
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
                                                className="mb-3"
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
                                                        defaultValue={item.fermentationDays}
                                                        name="fermentationDays"
                                                    /> : item.fermentationDays
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm="6">
                                    <Row>
                                        <Col xs="6">
                                            <Label
                                                for="conditioningDays"
                                                className="mb-3"
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
                                                        defaultValue={item.conditioningDays}
                                                        name="conditioningDays"
                                                    /> : item.conditioningDays
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
                                                for="brewhouseDuration"
                                                className="mb-3"
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
                                                        defaultValue={item.brewhouseDuration}
                                                        name="brewhouseDuration"
                                                    /> : item.brewhouseDuration
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Details item={item}/>
                </Col>
            </Row>
        </React.Fragment>
    );
}