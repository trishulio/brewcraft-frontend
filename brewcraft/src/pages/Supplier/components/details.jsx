import { map } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Row,
    Col,
    Card,
    CardBody,
    FormGroup,
    FormFeedback,
    Input,
    Label
} from "reactstrap";
import {
    setSupplierDetails,
    setInvalidSupplierFirstName,
    setInvalidSupplierLastName,
    setInvalidSupplierPosition,
    setInvalidSupplierEmail,
    setInvalidSupplierPhoneNumber,
    setInvalidSupplierCompany
} from "../../../store/actions";

const ADD_NEW = "ADD_NEW";

export default function SupplierDetails({ editable }) {

    const {
        invalidFirstName,
        invalidLastName,
        invalidPosition,
        invalidEmail,
        invalidPhoneNumber,
        invalidCompany
    } = useSelector(state => {
        return state.Supplier
    });

    const companies = useSelector(state => {
        return state.Companies.all;
    });

    const supplier = useSelector(state => {
        return state.Supplier.data;
    });

    const dispatch = useDispatch();

    function onFormInputChange(e) {
        switch(e.target.name) {
            case "supplierFirstName":
                if (supplier.firstName !== e.target.value) {
                    dispatch(setInvalidSupplierFirstName(!e.target.value));
                    dispatch(setSupplierDetails({
                        data: {
                            ...supplier,
                            firstName: e.target.value
                        }
                    }));
                }
                break;
            case "supplierLastName":
                if (supplier.lastName !== e.target.value) {
                    dispatch(setInvalidSupplierLastName(!e.target.value));
                    dispatch(setSupplierDetails({
                        data: {
                            ...supplier,
                            lastName: e.target.value
                        }
                    }));
                }
                break;
            case "supplierCompany":
                if (supplier.company?.id !== e.target.value) {
                    dispatch(setInvalidSupplierCompany(!e.target.value));
                    dispatch(setSupplierDetails({
                        data: {
                            ...supplier,
                            company: companies.find(c => c.id === parseInt(e.target.value))
                        }
                    }));
                }
                break;
            case "supplierPosition":
                if (supplier.position !== e.target.value) {
                    dispatch(setInvalidSupplierPosition(!e.target.value));
                    dispatch(setSupplierDetails({
                        data: {
                            ...supplier,
                            position: e.target.value
                        }
                    }));
                }
                break;
            case "supplierEmail":
                if (supplier.email !== e.target.value) {
                    dispatch(setInvalidSupplierEmail(!e.target.value));
                    dispatch(setSupplierDetails({
                        data: {
                            ...supplier,
                            email: e.target.value
                        }
                    }));
                }
                break;
            case "supplierPhoneNumber":
                if (supplier.phoneNumber !== e.target.value) {
                    dispatch(setInvalidSupplierPhoneNumber(!e.target.value));
                    dispatch(setSupplierDetails({
                        data: {
                            ...supplier,
                            phoneNumber: e.target.value
                        }
                    }));
                }
                break;
            case "supplierCompany":
                debugger;
                dispatch(setInvalidSupplierCompany(!e.target.value));
                dispatch(setSupplierDetails({
                    data: {
                        ...supplier,
                        company: companies.find(c => c.id === parseInt(e.target.value))
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
                <CardBody>
                    <h4 className="card-title mb-4">Supplier Details</h4>
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
                                for="supplierFirstName"
                                className="mb-3"
                            >
                                First Name
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup
                                hidden={!editable}
                            >
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    size="sm"
                                    value={supplier.firstName}
                                    placeholder="Enter"
                                    name="supplierFirstName"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidFirstName}
                                />
                                <FormFeedback>Enter a valid supplier name.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {supplier.firstName ? supplier.firstName : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="supplierLastName"
                                className="mb-3"
                            >
                                Last Name
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup
                                hidden={!editable}
                            >
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    size="sm"
                                    value={supplier.lastName}
                                    placeholder="Enter"
                                    name="supplierLastName"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidLastName}
                                />
                                <FormFeedback>Enter a valid supplier name.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {supplier.lastName ? supplier.lastName : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="supplierCompany"
                                className="mb-3"
                            >
                                Company
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup
                                hidden={!editable}
                            >
                                <Input
                                    type="select"
                                    className="waves-effect"
                                    size="sm"
                                    name="supplierCompany"
                                    style={{ width: "8rem" }}
                                    disabled={!editable}
                                    invalid={invalidCompany}
                                    value={supplier.company.id}
                                    onChange={e => {
                                        onFormInputChange(e);
                                    }}
                                >
                                    <option value="">Select</option>
                                    {
                                        map(companies, (value, index) => (
                                            <option value={value.id} key={index}>
                                                {value.name}
                                            </option>
                                        ))
                                    }
                                    <option value={ADD_NEW}>+ Add new</option>
                                </Input>
                                <FormFeedback>Enter a valid company.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {supplier.company ? supplier.company.name : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="supplierPosition"
                                className="mb-3"
                            >
                                Position
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup
                                hidden={!editable}
                            >
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    size="sm"
                                    value={supplier.position}
                                    placeholder="Enter"
                                    name="supplierPosition"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidPosition}
                                />
                                <FormFeedback>Enter a valid position.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {supplier.position ? supplier.position : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="supplierEmail"
                                className="mb-3"
                            >
                                Email
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup
                                hidden={!editable}
                            >
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    size="sm"
                                    value={supplier.email}
                                    placeholder="Enter"
                                    name="supplierEmail"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidEmail}
                                />
                                <FormFeedback>Enter a valid email.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {supplier.email ? supplier.email : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="supplierPhoneNumber"
                                className="mb-3"
                            >
                                Phone
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup
                                hidden={!editable}
                            >
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    size="sm"
                                    value={supplier.phoneNumber}
                                    placeholder="Enter"
                                    name="supplierPhoneNumber"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidPhoneNumber}
                                />
                                <FormFeedback>Enter a valid phone number.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {supplier.phone ? supplier.phone : "-"}
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}
