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
    setCompanyDetails,
    setInvalidCompanyName,
    setInvalidCompanyAddressLine1,
    setInvalidCompanyCity,
    setInvalidCompanyProvince,
    setInvalidCompanyPostalCode,
    setInvalidCompanyCountry
} from "../../../store/actions";

export default function CompanyDetails({ editable }) {

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
        return state.Company
    });

    const company = useSelector(state => {
        return state.Company.data;
    });

    function onFormInputChange(e) {
        switch(e.target.name) {
            case "companyName":
                if (company.name !== e.target.value) {
                    dispatch(setInvalidCompanyName(!e.target.value));
                    dispatch(setCompanyDetails({
                        data: {
                            ...company,
                            name: e.target.value
                        }
                    }));
                }
                break;
            case "companyAddressLine1":
                dispatch(setInvalidCompanyAddressLine1(!e.target.value));
                dispatch(setCompanyDetails({
                    data: {
                        ...company,
                        addressLine1: e.target.value
                    }
                }));
                break;
            case "companyAddressLine2":
                dispatch(setCompanyDetails({
                    data: {
                        ...company,
                        addressLine2: e.target.value
                    }
                }));
                break;
            case "companyAddressCity":
                dispatch(setInvalidCompanyCity(!e.target.value));
                dispatch(setCompanyDetails({
                    data: {
                        ...company,
                        city: e.target.value
                    }
                }));
                break;
            case "companyAddressProvince":
                dispatch(setInvalidCompanyProvince(!e.target.value));
                dispatch(setCompanyDetails({
                    data: {
                        ...company,
                        province: e.target.value
                    }
                }));
                break;
            case "companyAddressPostalCode":
                dispatch(setInvalidCompanyPostalCode(!e.target.value));
                dispatch(setCompanyDetails({
                    data: {
                        ...company,
                        postalCode: e.target.value
                    }
                }));
                break;
            case "companyAddressCountry":
                dispatch(setInvalidCompanyCountry(!e.target.value));
                dispatch(setCompanyDetails({
                    data: {
                        ...company,
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
                <CardBody>
                    <h4 className="card-title mb-4">Company Details</h4>
                    <Row>
                        <Col xs="2">
                            <Label className="mb-3">
                                ID
                            </Label>
                        </Col>
                        <Col xs="8">
                            <div hidden={false}>
                                {company.id ? company.id : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="companyName"
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
                                    size="sm"
                                    value={company.name}
                                    placeholder="Enter"
                                    name="companyName"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidName}
                                />
                                <FormFeedback>Enter a valid company name.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {company.name ? company.name : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="companyAddressLine1"
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
                                    size="sm"
                                    value={company.addressLine1}
                                    placeholder="Enter"
                                    name="companyAddressLine1"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidAddressLine1}
                                />
                                <FormFeedback>Enter a valid address field.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {company.addressLine1 || "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="companyAddressLine2"
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
                                    size="sm"
                                    value={company.addressLine2}
                                    placeholder="Enter"
                                    name="companyAddressLine2"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidAddressLine2}
                                />
                                <FormFeedback>Enter a valid address field.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {company.addressLine2 || "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="companyAddressCity"
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
                                    size="sm"
                                    value={company.city}
                                    placeholder="Enter"
                                    name="companyAddressCity"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidCity}
                                />
                                <FormFeedback>Enter a valid city field.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {company.city || "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="companyAddressProvince"
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
                                    size="sm"
                                    value={company.province}
                                    placeholder="Enter"
                                    name="companyAddressProvince"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidProvince}
                                />
                                <FormFeedback>Enter a valid province or state.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {company.province || "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="companyAddressPostalCode"
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
                                    size="sm"
                                    value={company.postalCode}
                                    placeholder="Enter"
                                    name="companyAddressPostalCode"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidPostalCode}
                                />
                                <FormFeedback>Enter a valid postal code.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {company.postalCode || "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="companyAddressCountry"
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
                                    size="sm"
                                    value={company.country}
                                    placeholder="Enter"
                                    name="companyAddressCountry"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidCountry}
                                />
                                <FormFeedback>Enter a valid country.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {company.country || "-"}
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}
