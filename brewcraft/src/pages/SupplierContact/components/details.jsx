import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
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
    setSupplierContactDetails,
    setInvalidSupplierContactFirstName,
    setInvalidSupplierContactLastName,
    setInvalidSupplierContactPosition,
    setInvalidSupplierContactEmail,
    setInvalidSupplierContactPhoneNumber,
    setInvalidSupplierContactCompany
} from "../../../store/actions";

export default function SupplierContactDetails({ editable }) {
    const {
        invalidFirstName,
        invalidLastName,
        invalidPosition,
        invalidEmail,
        invalidPhoneNumber,
        invalidCompany
    } = useSelector(state => {
        return state.SupplierContact
    });

    const companies = useSelector(state => {
        return state.Suppliers.all;
    });

    const contact = useSelector(state => {
        return state.SupplierContact.data;
    });

    const dispatch = useDispatch();

    function onFormInputChange(e) {
        switch(e.target.name) {
            case "contactFirstName":
                if (contact.firstName !== e.target.value) {
                    dispatch(setInvalidSupplierContactFirstName(!e.target.value));
                    dispatch(setSupplierContactDetails({
                        data: {
                            ...contact,
                            firstName: e.target.value
                        }
                    }));
                }
                break;
            case "contactLastName":
                if (contact.lastName !== e.target.value) {
                    dispatch(setInvalidSupplierContactLastName(!e.target.value));
                    dispatch(setSupplierContactDetails({
                        data: {
                            ...contact,
                            lastName: e.target.value
                        }
                    }));
                }
                break;
            case "contactCompany":
                if (contact.company?.id !== e.target.value) {
                    dispatch(setInvalidSupplierContactCompany(!e.target.value));
                    dispatch(setSupplierContactDetails({
                        data: {
                            ...contact,
                            company: companies.find(c => c.id === parseInt(e.target.value))
                        }
                    }));
                }
                break;
            case "contactPosition":
                if (contact.position !== e.target.value) {
                    dispatch(setInvalidSupplierContactPosition(!e.target.value));
                    dispatch(setSupplierContactDetails({
                        data: {
                            ...contact,
                            position: e.target.value
                        }
                    }));
                }
                break;
            case "contactEmail":
                if (contact.email !== e.target.value) {
                    dispatch(setInvalidSupplierContactEmail(!e.target.value));
                    dispatch(setSupplierContactDetails({
                        data: {
                            ...contact,
                            email: e.target.value
                        }
                    }));
                }
                break;
            case "contactPhoneNumber":
                if (contact.phoneNumber !== e.target.value) {
                    dispatch(setInvalidSupplierContactPhoneNumber(!e.target.value));
                    dispatch(setSupplierContactDetails({
                        data: {
                            ...contact,
                            phoneNumber: e.target.value
                        }
                    }));
                }
                break;
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <h4 className="card-title mb-4">Contact Details</h4>
                    <Row>
                        <Col xs="2">
                            <Label className="mb-3">
                                ID
                            </Label>
                        </Col>
                        <Col xs="8">
                            <div hidden={false}>
                                {contact.id ? contact.id : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="contactFirstName"
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
                                    bsSize="sm"
                                    value={contact.firstName}
                                    placeholder="Enter"
                                    name="contactFirstName"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidFirstName}
                                />
                                <FormFeedback>Enter a valid contact name.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {contact.firstName ? contact.firstName : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="contactLastName"
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
                                    bsSize="sm"
                                    value={contact.lastName}
                                    placeholder="Enter"
                                    name="contactLastName"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidLastName}
                                />
                                <FormFeedback>Enter a valid contact name.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {contact.lastName ? contact.lastName : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="contactCompany"
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
                                    bsSize="sm"
                                    name="contactCompany"
                                    style={{ width: "8rem" }}
                                    disabled={!editable}
                                    invalid={invalidCompany}
                                    value={contact.company.id}
                                    onChange={e => {
                                        onFormInputChange(e);
                                    }}
                                >
                                    <option value="" disabled={true}>Select</option>
                                    {
                                        map(companies, (value, index) => (
                                            <option value={value.id} key={index}>
                                                {value.name}
                                            </option>
                                        ))
                                    }
                                </Input>
                                <FormFeedback>Enter a valid company.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {contact.company ? contact.company.name : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="contactPosition"
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
                                    bsSize="sm"
                                    value={contact.position}
                                    placeholder="Enter"
                                    name="contactPosition"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidPosition}
                                />
                                <FormFeedback>Enter a valid position.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {contact.position ? contact.position : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="contactEmail"
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
                                    value={contact.email}
                                    placeholder="Enter"
                                    name="contactEmail"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidEmail}
                                />
                                <FormFeedback>Enter a valid email.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {contact.email ? contact.email : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="contactPhoneNumber"
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
                                    value={contact.phoneNumber}
                                    placeholder="Enter"
                                    name="contactPhoneNumber"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidPhoneNumber}
                                />
                                <FormFeedback>Enter a valid phone number.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {contact.phoneNumber ? contact.phoneNumber : "-"}
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}
