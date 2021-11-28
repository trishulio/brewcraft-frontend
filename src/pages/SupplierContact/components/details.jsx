import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import {
    Row,
    Col,
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
import {
    Card,
    CardBody,
    CardHeader
} from "../../../component/Common/Card";

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
    const validatePhoneNumber=(code)=>{
        return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.exec(code) ? true : false)
    }
    const validateEmail=(email)=>{
        return (/\S+@\S+\.\S+/.exec(email) ? true : false)
    }
    function formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          var intlCode = (match[1] ? '+1 ' : '');
          return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
        }
        return phoneNumberString;
      }
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
                if (contact.supplier?.id !== e.target.value) {
                    dispatch(setInvalidSupplierContactCompany(!e.target.value));
                    dispatch(setSupplierContactDetails({
                        data: {
                            ...contact,
                            supplier: companies.find(c => c.id === parseInt(e.target.value))
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
                    dispatch(setInvalidSupplierContactEmail(!e.target.value ? true : !validateEmail(e.target.value)));
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
                    dispatch(setInvalidSupplierContactPhoneNumber(!e.target.value ? true : !validatePhoneNumber(e.target.value)));
                    dispatch(setSupplierContactDetails({
                        data: {
                            ...contact,
                            phoneNumber: formatPhoneNumber(e.target.value)
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
                <CardHeader>Contact Details</CardHeader>
                <CardBody>
                    <Label
                        className="d-inline-block mb-3"
                        style={{
                            width: "6rem"
                        }}
                    >
                        ID
                    </Label>
                    <div className="d-inline-block mb-2">
                        {contact.id ? contact.id : "-"}
                    </div>
                    <div className="clearfix"></div>
                    <Label
                        for="contactFirstName"
                        className="d-inline-block mb-3"
                        style={{
                            width: "6rem"
                        }}
                    >
                        First Name
                    </Label>
                    {editable &&
                        <FormGroup
                            className="d-inline-block mb-3"
                            hidden={!editable}
                            style={{
                                maxWidth: "20rem",
                                width: "100%"
                            }}
                        >
                            <Input
                                type="text"
                                className="faves-effect"
                                width="20rem"
                                value={contact.firstName}
                                placeholder="Enter"
                                name="contactFirstName"
                                disabled={!editable}
                                onChange={onFormInputChange}
                                invalid={invalidFirstName}
                            />
                            <FormFeedback>
                                {contact.firstName.length > 0
                                    ? "Invalid contact name field"
                                    : "Contact name field must not be empty"
                                }
                            </FormFeedback>
                        </FormGroup>
                    }
                    {!editable &&
                        <div className="d-inline-block mb-2">
                            {contact.firstName ? contact.firstName : "-"}
                        </div>
                    }
                    <div className="clearfix"></div>
                    <Label
                        for="contactLastName"
                        className="d-inline-block mb-3"
                        style={{
                            width: "6rem"
                        }}
                    >
                        Last Name
                    </Label>
                    {editable &&
                        <FormGroup
                            className="d-inline-block mb-3"
                            hidden={!editable}
                            style={{
                                maxWidth: "20rem",
                                width: "100%"
                            }}
                        >
                            <Input
                                type="text"
                                className="waves-effect"
                                value={contact.lastName}
                                placeholder="Enter"
                                name="contactLastName"
                                disabled={!editable}
                                onChange={onFormInputChange}
                                invalid={invalidLastName}
                            />
                            <FormFeedback>
                                {contact.lastName.length > 0
                                    ? "Invalid contact name field"
                                    : "Contact name field must not be empty"
                                }
                            </FormFeedback>
                        </FormGroup>
                    }
                    {!editable &&
                        <div className="d-inline-block mb-2">
                            {contact.lastName ? contact.lastName : "-"}
                        </div>
                    }
                    <div className="clearfix"></div>
                    <Label
                        for="contactCompany"
                        className="d-inline-block mb-3"
                        style={{
                            width: "6rem"
                        }}
                    >
                        Supplier
                    </Label>
                    {editable &&
                        <FormGroup
                            className="d-inline-block mb-3"
                            hidden={!editable}
                            style={{
                                maxWidth: "20rem",
                                width: "100%"
                            }}
                        >
                            <Input
                                type="select"
                                className="waves-effect"
                                name="contactCompany"
                                style={{ width: "8rem" }}
                                disabled={!editable}
                                invalid={invalidCompany}
                                value={contact.supplier.id || ""}
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
                            <FormFeedback>
                                {contact.supplier !==""
                                    ? "Invalid supplier field"
                                    : "Contact supplier field must not be empty"
                                }
                            </FormFeedback>
                        </FormGroup>
                    }
                    {!editable &&
                        <div className="d-inline-block mb-2">
                            {contact.supplier ? contact.supplier.name : "-"}
                        </div>
                    }
                    <div className="clearfix"></div>
                    <Label
                        for="contactPosition"
                        className="d-inline-block mb-3"
                        style={{
                            width: "6rem"
                        }}
                    >
                        Position
                    </Label>
                    {editable &&
                        <FormGroup
                            className="d-inline-block mb-3"
                            hidden={!editable}
                            style={{
                                maxWidth: "20rem",
                                width: "100%"
                            }}
                        >
                            <Input
                                type="text"
                                className="waves-effect"
                                value={contact.position}
                                placeholder="Enter"
                                name="contactPosition"
                                disabled={!editable}
                                onChange={onFormInputChange}
                                invalid={invalidPosition}
                            />
                            <FormFeedback>
                                {contact.position.length > 0
                                    ? "Invalid contact position field"
                                    : "Contact position field must not be empty"
                                }
                            </FormFeedback>
                        </FormGroup>
                    }
                    {!editable &&
                        <div className="d-inline-block mb-2">
                            {contact.position ? contact.position : "-"}
                        </div>
                    }
                    <div className="clearfix"></div>
                    <Label
                        for="contactEmail"
                        className="d-inline-block mb-3"
                        style={{
                            width: "6rem"
                        }}
                    >
                        Email
                    </Label>
                    {editable &&
                        <FormGroup
                            className="d-inline-block mb-3"
                            hidden={!editable}
                            style={{
                                maxWidth: "20rem",
                                width: "100%"
                            }}
                        >
                            <Input
                                type="text"
                                className="waves-effect"
                                value={contact.email}
                                placeholder="Enter"
                                name="contactEmail"
                                disabled={!editable}
                                onChange={onFormInputChange}
                                invalid={invalidEmail}
                            />
                            <FormFeedback>
                                {contact.email.length > 0
                                    ? "Invalid contact position field"
                                    : "Contact position field must not be empty"
                                }
                            </FormFeedback>
                        </FormGroup>
                    }
                    {!editable &&
                        <div className="d-inline-block mb-2">
                            {contact.email ? contact.email : "-"}
                        </div>
                    }
                    <div className="clearfix"></div>
                    <Label
                        for="contactPhoneNumber"
                        className="d-inline-block mb-3"
                        style={{
                            width: "6rem"
                        }}
                    >
                        Phone
                    </Label>
                    {editable &&
                        <FormGroup
                            className="d-inline-block mb-3"
                            hidden={!editable}
                            style={{
                                maxWidth: "20rem",
                                width: "100%"
                            }}
                        >
                            <Input
                                type="text"
                                    className="waves-effect"
                                    value={contact.phoneNumber}
                                    placeholder="Enter"
                                    name="contactPhoneNumber"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidPhoneNumber}
                            />

                            <FormFeedback>
                                {contact.phoneNumber.length > 0
                                    ? "Invalid contact phone field"
                                    : "Contact phone field must not be empty"
                                }
                            </FormFeedback>
                        </FormGroup>
                    }
                    {!editable &&
                        <div className="d-inline-block mb-2">
                            {contact.phoneNumber ? contact.phoneNumber : "-"}
                        </div>
                    }
                </CardBody>
            </Card>
        </React.Fragment>
    );
}
