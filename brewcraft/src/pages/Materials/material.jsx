import React, { useEffect, Fragment, useState, useCallback } from "react";
import { get, map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
    fetchMaterialById
} from "../../store/Materials/actions";
import { setBreadcrumbItems } from "../../store/actions";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Badge,
  Button,
  Table,
  Input,
  Form,
  FormGroup,
  Label
} from "reactstrap";
import { MDBDataTable } from "mdbreact";
import { AvForm, AvField } from "availity-reactstrap-validation";
import noImage from "../../assets/images/no-image.jpg";

const units = ["hl", "l", "ml", "kg", "g"];

export default function Material() {
    const [material, setMaterial] = useState({});
    const [editable, setEditable] = useState(false);
    const [dirty, setDirty] = useState(false);
    let { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(
            fetchMaterialById({
                id: id,
                success: data => {
                    setMaterial(data);
                    dispatch(
                        setBreadcrumbItems(data.name, [
                            { title: "Main", link: "#" },
                            { title: "Raw Materials", link: "#" },
                            { title: "Ingredients", link: "/materials/categories/" + data.category.id }
                        ])
                    );
                },
                fail: () => {
                    history.push("/materials/ingredients");
                }
            }));
        }, []);

    const units = ["hl", "l", "ml", "kg", "g"];

    const submitFn = () => {};

    return (
        <Fragment>
            <Row>
                <Col md="9">
                    <Card>
                        <CardHeader>
                            <h4 className="card-title mb-1">Details</h4>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col xs="12">
                                    <Row>
                                        <Col xs="3">
                                            <h3 className="font-size-14 mb-4">Name</h3>
                                        </Col>
                                        <Col xs="3">
                                            {editable && <Input type="text" name="name"/>}
                                            {!editable && <span name="name">{material.name}</span>}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3">
                                            <h3 className="font-size-14 mb-4">Material</h3>
                                        </Col>
                                        <Col xs="3">
                                            <span name="name">Ingredient</span>
                                        </Col>
                                        <Col xs="3">
                                            <h3 className="font-size-14 mb-4">Category</h3>
                                        </Col>
                                        <Col xs="3">
                                            {editable && <Input type="text" name="category"/>}
                                            {!editable && <span name="name">{material.category && material.category.name }</span>}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3">
                                            <h3 className="font-size-14 mb-4">UPC</h3>
                                        </Col>
                                        <Col xs="3">
                                            {editable && <Input type="text" name="upc"/>}
                                            {!editable && <span name="name">{material.upc || "-"}</span>}
                                        </Col>
                                        <Col xs="3">
                                            <h3 className="font-size-14 mb-4">Unit Of Measure</h3>
                                        </Col>
                                        <Col xs="3">
                                            {/* {editable && <Input type="text" name="baseQuantityUnit"/>} */}
                                            {editable && <select>
                                                {editable &&
                                                    map(units, (value, index) => (
                                                        <option value={value} key={value}>
                                                        {value}
                                                        </option>
                                                    ))
                                                }
                                            </select>}
                                            {!editable && <span name="name">{material.baseQuantityUnit}</span>}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="3">
                                    <h3 className="font-size-14 mb-1">Description</h3>
                                </Col>
                                <Col sm="9">
                                    {editable && <Input className="mb-3" type="textarea" name="text" id="exampleText" rows={3} defaultValue={material.description}/>}
                                    {!editable && <Input className="mb-3" type="textarea" name="text" id="exampleText" rows={3} defaultValue={material.description} disabled/>}
                                </Col>
                            </Row>
                            <Button type="button" color="secondary" size="sm" className="waves-effect" onClick={() => setEditable(true)}>Edit</Button>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="3">
                    <Card>
                        <CardHeader>
                            <h4 className="card-title mb-1">Publish</h4>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col xs="6">
                                    <h3 className="font-size-14 mb-4">Created</h3>
                                </Col>
                                <Col xs="6">
                                    <span name="name">Jan 20, 2021</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="6">
                                    <h3 className="font-size-14 mb-4">Updated</h3>
                                </Col>
                                <Col xs="6">
                                    <span name="name">Feb 2, 2021</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="6">
                                    <h3 className="font-size-14 mb-4">Status</h3>
                                </Col>
                                <Col xs="6">
                                    {editable &&
                                        <select>
                                            <option>Active</option>
                                            <option>Deactive</option>
                                        </select>
                                    }
                                    {!editable && <Badge color="info">Active</Badge>}
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            {!editable && <Button type="button" color="primary" className="waves-effect mr-2" disabled>Save</Button>}
                            {editable && <Button type="button" color="primary" className="waves-effect mr-2">Save</Button>}
                            {editable && <Button type="button" color="secondary" className="waves-effect" onClick={() => setEditable(false)}>Cancel</Button>}
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <h4 className="card-title mb-1">Image</h4>
                        </CardHeader>
                        <CardBody>
                            <img style={{width:"100%"}} src={noImage} alt="material" className="border d-block mr-2 mb-2 p-1" />
                            <span className="d-block mb-2">No image found ..</span>
                            <Button type="button" color="secondary" size="sm" className="waves-effect mr-2">Upload</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
}