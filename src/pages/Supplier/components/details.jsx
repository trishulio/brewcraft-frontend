import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    FormGroup,
    FormFeedback,
    Input,
    Label,
    Alert
} from "reactstrap";
import {
    setSupplierAddressDetails,
    setSupplierDetails
} from "../../../store/actions";
import {
    Card,
    CardBody,
    CardHeader
} from "../../../component/Common/Card";
import { isValidName } from "../../../helpers/utils";

export default function SupplierDetails({ editable }) {
    const dispatch = useDispatch();

    const {
        invalidName,
        invalidAddressLine1,
        invalidAddressLine2,
        invalidCity,
        invalidProvince,
        invalidPostalCode,
        invalidCountry,
        loading
    } = useSelector(state => {
        return state.Supplier
    });

    const supplier = useSelector(state => {
        return state.Supplier.data;
    });

    const validatePostalCode=(code)=>{
        return (/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i.exec(code) ? true : false)
    }
    function onFormInputChange(e) {
        switch(e.target.name) {
            case "supplierName":
                dispatch(setSupplierDetails({
                    data: {
                        ...supplier,
                        name: e.target.value
                    },
                    invalidName: !isValidName(e.target.value)
                }));
                break;
            case "supplierAddressLine1":
                dispatch(setSupplierAddressDetails({
                    addressLine1: e.target.value
                }));
                dispatch(setSupplierDetails({
                    invalidAddressLine1: typeof e.target.value !== "string"
                }));
                break;
            case "supplierAddressLine2":
                dispatch(setSupplierAddressDetails({
                    addressLine2: e.target.value
                }));
                dispatch(setSupplierDetails({
                    invalidAddressLine2: typeof e.target.value !== "string"
                }));
                break;
            case "supplierAddressCity":
                dispatch(setSupplierAddressDetails({
                    city: e.target.value
                }));
                dispatch(setSupplierDetails({
                    invalidCity: typeof e.target.value !== "string"
                }));
                break;
            case "supplierAddressProvince":
                dispatch(setSupplierAddressDetails({
                    province: e.target.value
                }));
                dispatch(setSupplierDetails({
                    invalidProvince: typeof e.target.value !== "string"
                }));
                break;
            case "supplierAddressPostalCode":
                dispatch(setSupplierAddressDetails({
                    postalCode: e.target.value
                }));
                const checkPostalCode=validatePostalCode(e.target.value)
                dispatch(setSupplierDetails({
                    invalidPostalCode: typeof e.target.value !== "string" && (supplier.address.country.toLower() === "canada" ? checkPostalCode : true)
                }));
                break;
            case "supplierAddressCountry":
                dispatch(setSupplierAddressDetails({
                    country: e.target.value
                }));
                dispatch(setSupplierDetails({
                    invalidCountry: typeof e.target.value !== "string"
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
                        <Label
                            className="d-inline-block mb-3"
                            style={{
                                width: "10rem"
                            }}
                        >
                            ID
                        </Label>
                        <div className="d-inline-block mb-2">
                            {supplier.id ? supplier.id : "-"}
                        </div>
                        <div className="clearfix"></div>
                        <Label
                            for="supplierName"
                            className="d-inline-block mb-3"
                            style={{
                                width: "10rem"
                            }}
                        >
                            Name
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
                                    value={supplier.name}
                                    placeholder="Enter"
                                    name="supplierName"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidName}
                                />
                                <FormFeedback>
                                    {supplier.name.length > 0
                                        ? "Invalid supplier name field"
                                        : "Supplier name field must not be empty"
                                    }
                                </FormFeedback>
                            </FormGroup>
                        }
                        {!editable &&
                            <div className="d-inline-block mb-2">
                                {supplier.name ? supplier.name : "-"}
                            </div>
                        }
                        <div className="clearfix"></div>
                        <Label
                            for="supplierAddressLine1"
                            className="d-inline-block mb-3"
                            style={{
                                width: "10rem"
                            }}
                        >
                            Address Line 1
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
                                    value={supplier.address.addressLine1}
                                    placeholder="Enter"
                                    name="supplierAddressLine1"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidAddressLine1}
                                />
                                <FormFeedback>
                                    {supplier.address.addressLine1.length > 0
                                        ? "Invalid supplier address field"
                                        : "Supplier address line 1 field must not be empty"
                                    }
                                </FormFeedback>
                            </FormGroup>
                        }
                        {!editable &&
                            <div className="d-inline-block mb-2">
                                {supplier.address.addressLine1 || "-"}
                            </div>
                        }
                        <div className="clearfix"></div>
                        <Label
                            for="supplierAddressLine2"
                            className="d-inline-block mb-3"
                            style={{
                                width: "10rem"
                            }}
                        >
                            Address Line 2
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
                                    value={supplier.address.addressLine2}
                                    placeholder="Enter"
                                    name="supplierAddressLine2"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidAddressLine2}
                                />
                                <FormFeedback>Invalid supplier address field</FormFeedback>
                            </FormGroup>
                        }
                        {!editable &&
                            <div className="d-inline-block mb-2">
                                {supplier.address.addressLine2 || "-"}
                            </div>
                        }
                        <div className="clearfix"></div>
                        <Label
                            for="supplierAddressCity"
                            className="d-inline-block mb-3"
                            style={{
                                width: "10rem"
                            }}
                        >
                            City
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
                                    value={supplier.address.city}
                                    placeholder="Enter"
                                    name="supplierAddressCity"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidCity}
                                />
                                <FormFeedback>
                                    {supplier.address.city.length > 0
                                        ? "Invalid supplier address field"
                                        : "Supplier city field must not be empty"
                                    }
                                </FormFeedback>
                            </FormGroup>
                        }
                        {!editable &&
                            <div className="d-inline-block mb-2">
                                {supplier.address.city || "-"}
                            </div>
                        }
                        <div className="clearfix"></div>
                        <Label
                            for="supplierAddressProvince"
                            className="d-inline-block mb-3"
                            style={{
                                width: "10rem"
                            }}
                        >
                            Province / State
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
                                    value={supplier.address.province}
                                    placeholder="Enter"
                                    name="supplierAddressProvince"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidProvince}
                                />
                                <FormFeedback>
                                    {supplier.address.province.length > 0
                                        ? "Invalid supplier address field"
                                        : "Supplier province / state field must not be empty"
                                    }
                                </FormFeedback>
                            </FormGroup>
                        }
                        {!editable &&
                            <div className="d-inline-block mb-2">
                                {supplier.address.province || "-"}
                            </div>
                        }
                        <div className="clearfix"></div>
                        <Label
                            for="supplierAddressPostalCode"
                            className="d-inline-block mb-3"
                            style={{
                                width: "10rem"
                            }}
                        >
                            Postal / Zip code
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
                                    value={supplier.address.postalCode}
                                    placeholder="Enter"
                                    name="supplierAddressPostalCode"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidPostalCode}
                                />
                                <FormFeedback>
                                    {supplier.address.postalCode.length > 0
                                        ? "Invalid supplier address field"
                                        : "Supplier postal / zip code field must not be empty"
                                    }
                                </FormFeedback>
                            </FormGroup>
                        }
                        {!editable &&
                            <div className="d-inline-block mb-2">
                                {supplier.address.postalCode || "-"}
                            </div>
                        }
                        <div className="clearfix"></div>
                        <Label
                            for="supplierAddressCountry"
                            className="d-inline-block mb-3"
                            style={{
                                width: "10rem"
                            }}
                        >
                            Country
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
                                    value={supplier.address.country}
                                    placeholder="Enter"
                                    name="supplierAddressCountry"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidCountry}
                                />
                                <FormFeedback>
                                    {supplier.address.country.length > 0
                                        ? "Invalid supplier address field"
                                        : "Supplier country field must not be empty"
                                    }
                                </FormFeedback>
                            </FormGroup>
                        }
                        {!editable &&
                            <div className="d-inline-block mb-2">
                                {supplier.address.country || "-"}
                            </div>
                        }
                    </CardBody>
                </Card>
        </React.Fragment>
    );
}
