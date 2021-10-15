import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Row,
    Col,
    FormGroup,
    FormFeedback,
    Input,
    Label
} from "reactstrap";
import {
    setSupplierDetails,
    setInvalidSupplierName,
    setInvalidSupplierAddressLine1,
    setInvalidSupplierCity,
    setInvalidSupplierProvince,
    setInvalidSupplierPostalCode,
    setInvalidSupplierCountry
} from "../../../store/actions";
import {
    Card,
    CardBody,
    CardHeader
} from "../../../component/Common/Card";

export default function SupplierDetails({ editable }) {

    const dispatch = useDispatch();

    const {
        invalidName,
        invalidAddressLine1,
        invalidAddressLine2,
        invalidCity,
        invalidProvince,
        invalidPostalCode,
        invalidCountry
    } = useSelector(state => {
        return state.Supplier
    });

    const supplier = useSelector(state => {
        return state.Supplier.data;
    });

    function onFormInputChange(e) {
        switch(e.target.name) {
            case "supplierName":
                if (supplier.name !== e.target.value) {
                    dispatch(setInvalidSupplierName(!e.target.value));
                    dispatch(setSupplierDetails({
                        data: {
                            ...supplier,
                            name: e.target.value
                        }
                    }));
                }
                break;
            case "supplierAddressLine1":
                dispatch(setInvalidSupplierAddressLine1(!e.target.value));
                dispatch(setSupplierDetails({
                    data: {
                        ...supplier,
                        addressLine1: e.target.value
                    }
                }));
                break;
            case "supplierAddressLine2":
                dispatch(setSupplierDetails({
                    data: {
                        ...supplier,
                        addressLine2: e.target.value
                    }
                }));
                break;
            case "supplierAddressCity":
                dispatch(setInvalidSupplierCity(!e.target.value));
                dispatch(setSupplierDetails({
                    data: {
                        ...supplier,
                        city: e.target.value
                    }
                }));
                break;
            case "supplierAddressProvince":
                dispatch(setInvalidSupplierProvince(!e.target.value));
                dispatch(setSupplierDetails({
                    data: {
                        ...supplier,
                        province: e.target.value
                    }
                }));
                break;
            case "supplierAddressPostalCode":
                dispatch(setInvalidSupplierPostalCode(!e.target.value));
                dispatch(setSupplierDetails({
                    data: {
                        ...supplier,
                        postalCode: e.target.value
                    }
                }));
                break;
            case "supplierAddressCountry":
                dispatch(setInvalidSupplierCountry(!e.target.value));
                dispatch(setSupplierDetails({
                    data: {
                        ...supplier,
                        country: e.target.value
                    }
                }));
                break;
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            <Card>
                <CardHeader>Supplier Details</CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="2">
                            <Label className="mb-3">
                                ID
                            </Label>
                        </Col>
                        <Col xs="8">
                            <div hidden={false}>
                                {supplier.id ? supplier.id : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="supplierName"
                                className="mb-3"
                            >
                                Name
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup
                                hidden={!editable}
                            >
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    bsSize="sm"
                                    value={supplier.name}
                                    placeholder="Enter"
                                    name="supplierName"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidName}
                                />
                                <FormFeedback>Enter a valid supplier name.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {supplier.name ? supplier.name : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="supplierAddressLine1"
                                className="mb-3"
                            >
                                Address Line 1
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup
                                hidden={!editable}
                            >
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    bsSize="sm"
                                    value={supplier.addressLine1}
                                    placeholder="Enter"
                                    name="supplierAddressLine1"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidAddressLine1}
                                />
                                <FormFeedback>Enter a valid address field.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {supplier.addressLine1 || "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="supplierAddressLine2"
                                className="mb-3"
                            >
                                Address Line 2
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup
                                hidden={!editable}
                            >
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    bsSize="sm"
                                    value={supplier.addressLine2}
                                    placeholder="Enter"
                                    name="supplierAddressLine2"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidAddressLine2}
                                />
                                <FormFeedback>Enter a valid address field.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {supplier.addressLine2 || "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="supplierAddressCity"
                                className="mb-3"
                            >
                                City
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup
                                hidden={!editable}
                            >
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    bsSize="sm"
                                    value={supplier.city}
                                    placeholder="Enter"
                                    name="supplierAddressCity"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidCity}
                                />
                                <FormFeedback>Enter a valid city field.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {supplier.city || "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="supplierAddressProvince"
                                className="mb-3"
                            >
                                Province / State
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup
                                hidden={!editable}
                            >
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    bsSize="sm"
                                    value={supplier.province}
                                    placeholder="Enter"
                                    name="supplierAddressProvince"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidProvince}
                                />
                                <FormFeedback>Enter a valid province or state.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {supplier.province || "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="supplierAddressPostalCode"
                                className="mb-3"
                            >
                                Postal Code
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup
                                hidden={!editable}
                            >
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    bsSize="sm"
                                    value={supplier.postalCode}
                                    placeholder="Enter"
                                    name="supplierAddressPostalCode"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidPostalCode}
                                />
                                <FormFeedback>Enter a valid postal code.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {supplier.postalCode || "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="supplierAddressCountry"
                                className="mb-3"
                            >
                                Country
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup
                                hidden={!editable}
                            >
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    bsSize="sm"
                                    value={supplier.country}
                                    placeholder="Enter"
                                    name="supplierAddressCountry"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidCountry}
                                />
                                <FormFeedback>Enter a valid country.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {supplier.country || "-"}
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}
