import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import { Row, Col, FormGroup, FormFeedback, Input, Label } from "reactstrap";
import Select from "react-select";
import {
    setUserDetails,
    setUserInvalidUserName,
    setUserInvalidDisplayName,
    setUserInvalidFirstName,
    setUserInvalidLastName,
    setUserInvalidEmail,
    setUserInvalidRoles,
    setUserInvalidPhoneNumber,
} from "../../../store/actions";
import { Card, CardBody, CardHeader } from "../../../component/Common/Card";
import {
    formatPhoneNumber,
    arrayEquals,
    useKeyPress,
    isValidName,
    isValidEmail,
    isValidPhoneNumber,
    isNotEmptyArray,
} from "../../../helpers/utils";

const ENTER_KEY = "Enter";

export default function UserDetails({ editable, onSave, changed }) {
    const dispatch = useDispatch();

    const {
        invalidUserName,
        invalidDisplayName,
        invalidFirstName,
        invalidLastName,
        invalidEmail,
        invalidRoles,
        invalidPhoneNumber,
    } = useSelector((state) => {
        return state.User;
    });

    const enterKeyPressed = useKeyPress(ENTER_KEY);

    const user = useSelector((state) => {
        return state.User.data;
    });

    const userRoles = useSelector((state) => {
        return state.UserRoles.data;
    });

    function onFormInputChange(e) {
        switch (e.target.name) {
            case "userUserName":
                if (user.userName !== e.target.value) {
                    dispatch(
                        setUserInvalidUserName(!isValidName(e.target.value))
                    );
                    dispatch(
                        setUserDetails({
                            data: {
                                ...user,
                                userName: e.target.value,
                            },
                        })
                    );
                }
                break;
            case "userFirstName":
                if (user.firstName !== e.target.value) {
                    dispatch(
                        setUserInvalidFirstName(!isValidName(e.target.value))
                    );
                    dispatch(
                        setUserDetails({
                            data: {
                                ...user,
                                firstName: e.target.value,
                            },
                        })
                    );
                }
                break;
            case "userLastName":
                if (user.lastName !== e.target.value) {
                    dispatch(
                        setUserInvalidLastName(!isValidName(e.target.value))
                    );
                    dispatch(
                        setUserDetails({
                            data: {
                                ...user,
                                lastName: e.target.value,
                            },
                        })
                    );
                }
                break;
            case "userDisplayName":
                if (user.displayName !== e.target.value) {
                    dispatch(
                        setUserInvalidDisplayName(!isValidName(e.target.value))
                    );
                    dispatch(
                        setUserDetails({
                            data: {
                                ...user,
                                displayName: e.target.value,
                            },
                        })
                    );
                }
                break;
            case "userEmail":
                if (user.email !== e.target.value) {
                    dispatch(
                        setUserInvalidEmail(!isValidEmail(e.target.value))
                    );
                    dispatch(
                        setUserDetails({
                            data: {
                                ...user,
                                email: e.target.value,
                            },
                        })
                    );
                }
                break;
            case "userRoles":
                if (!arrayEquals(user.roles, e.target.selectedValues)) {
                    dispatch(
                        setUserInvalidRoles(
                            !isNotEmptyArray(e.target.selectedValues)
                        )
                    );
                    dispatch(
                        setUserDetails({
                            data: {
                                ...user,
                                roles: e.target.selectedValues,
                            },
                        })
                    );
                }
                break;
            case "userPhoneNumber":
                if (user.phoneNumber !== e.target.value) {
                    dispatch(
                        setUserInvalidPhoneNumber(
                            !isValidPhoneNumber(e.target.value)
                        )
                    );
                    dispatch(
                        setUserDetails({
                            data: {
                                ...user,
                                phoneNumber: formatPhoneNumber(e.target.value),
                            },
                        })
                    );
                }
                break;
            default:
                dispatch(
                    setUserDetails({
                        [e.target.name]: e.target.value,
                    })
                );
                break;
        }
    }

    function getRolesMultiselectStyle(invalidRoles) {
        if (invalidRoles) {
            return {
                control: (base, state) => ({
                    ...base,
                    "&:hover": { borderColor: "red" },
                    border: "1px solid red",
                    boxShadow: "none",
                }),
            };
        } else {
            return {
                control: (base, state) => ({
                    ...base,
                    "&:hover": { borderColor: "#b6b5b5" },
                    border: "1px solid lightgray",
                    boxShadow: "none",
                }),
            };
        }
    }

    function onKeyUp() {
        if (enterKeyPressed && changed) {
            onSave();
            return;
        }
    }

    return (
        <React.Fragment>
            <Card>
                <CardHeader>User Details</CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="userUserName"
                                className="mb-3"
                                style={{
                                    width: "8rem",
                                }}
                            >
                                *User Name
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup hidden={!editable}>
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    name="userUserName"
                                    style={{ width: "16rem" }}
                                    disabled={!editable}
                                    value={user.userName || ""}
                                    onChange={(e) => {
                                        onFormInputChange(e);
                                    }}
                                    hidden={!editable}
                                    invalid={invalidUserName}
                                    onKeyUp={onKeyUp}
                                />
                                <FormFeedback>
                                    Enter a valid user name.
                                </FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {user.userName ? user.userName : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="userFirstName"
                                className="mb-3"
                                style={{
                                    width: "8rem",
                                }}
                            >
                                *First Name
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup hidden={!editable}>
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    name="userFirstName"
                                    style={{ width: "16rem" }}
                                    disabled={!editable}
                                    value={user.firstName || ""}
                                    onChange={(e) => {
                                        onFormInputChange(e);
                                    }}
                                    hidden={!editable}
                                    invalid={invalidFirstName}
                                    onKeyUp={onKeyUp}
                                />
                                <FormFeedback>
                                    Enter a valid first name.
                                </FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {user.firstName ? user.firstName : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="userLastName"
                                className="mb-3"
                                style={{
                                    width: "8rem",
                                }}
                            >
                                *Last Name
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup hidden={!editable}>
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    name="userLastName"
                                    style={{ width: "16rem" }}
                                    disabled={!editable}
                                    value={user.lastName || ""}
                                    onChange={(e) => {
                                        onFormInputChange(e);
                                    }}
                                    hidden={!editable}
                                    invalid={invalidLastName}
                                    onKeyUp={onKeyUp}
                                />
                                <FormFeedback>
                                    Enter a valid last name.
                                </FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {user.lastName ? user.lastName : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="userDisplayName"
                                className="mb-3"
                                style={{
                                    width: "8rem",
                                }}
                            >
                                *Display Name
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup hidden={!editable}>
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    name="userDisplayName"
                                    style={{ width: "16rem" }}
                                    disabled={!editable}
                                    value={user.displayName || ""}
                                    onChange={(e) => {
                                        onFormInputChange(e);
                                    }}
                                    hidden={!editable}
                                    invalid={invalidDisplayName}
                                    onKeyUp={onKeyUp}
                                />
                                <FormFeedback>
                                    Enter a valid display name.
                                </FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {user.displayName ? user.displayName : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="userEmail"
                                className="mb-3"
                                style={{
                                    width: "8rem",
                                }}
                            >
                                *Email
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup hidden={!editable}>
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    name="userEmail"
                                    style={
                                        !editable || !user.id
                                            ? { width: "16rem" }
                                            : {
                                                  width: "16rem",
                                                  backgroundColor: "lightgrey",
                                              }
                                    }
                                    disabled={
                                        !editable || !user.id ? false : true
                                    } //Email is only editable for new users
                                    value={user.email || ""}
                                    onChange={(e) => {
                                        onFormInputChange(e);
                                    }}
                                    hidden={!editable}
                                    invalid={invalidEmail}
                                    onKeyUp={onKeyUp}
                                />
                                <FormFeedback>
                                    Enter a valid email.
                                </FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {user.email ? user.email : "-"}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="userRoles"
                                className="mb-3"
                                style={{
                                    width: "8rem",
                                }}
                            >
                                *Roles
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup
                                style={{ width: "16rem" }}
                                hidden={!editable}
                            >
                                <Select
                                    name="userRoles"
                                    styles={getRolesMultiselectStyle(
                                        invalidRoles
                                    )}
                                    isDisabled={!editable}
                                    isHidden={!editable}
                                    value={
                                        user.roles
                                            ? map(user.roles, (value) => ({
                                                  value: value.id,
                                                  label: value.name,
                                              }))
                                            : []
                                    }
                                    onChange={(e) => {
                                        //create a changeEvent to match the format of reactstrap control events
                                        const changeEvent = {
                                            target: {
                                                name: "userRoles",
                                                selectedValues: e
                                                    ? e.reduce(function (
                                                          result,
                                                          selectedRole
                                                      ) {
                                                          let role =
                                                              userRoles.find(
                                                                  (role) =>
                                                                      (role.id =
                                                                          selectedRole.value)
                                                              );
                                                          if (role) {
                                                              result.push(role);
                                                          }
                                                          return result;
                                                      },
                                                      [])
                                                    : [],
                                            },
                                        };
                                        onFormInputChange(changeEvent);
                                    }}
                                    isMulti={true}
                                    invalid={invalidRoles}
                                    options={map(userRoles, (value) => ({
                                        value: value.id,
                                        label: value.name,
                                    }))}
                                    onKeyUp={onKeyUp}
                                />
                                {/* hidden Input is used as a workaround to use reactstrap FormFeedback with react-select component */}
                                <Input hidden={true} invalid={invalidRoles} />
                                <FormFeedback>
                                    Select a valid role.
                                </FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {user.roles
                                    ? user.roles
                                          .map((role) => role.name)
                                          .join(", ")
                                    : ["-"]}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="userPhoneNumber"
                                className="mb-3"
                                style={{
                                    width: "8rem",
                                }}
                            >
                                Phone Number
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup hidden={!editable}>
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    name="userPhoneNumber"
                                    style={{ width: "16rem" }}
                                    disabled={!editable}
                                    value={user.phoneNumber || ""}
                                    onChange={(e) => {
                                        onFormInputChange(e);
                                    }}
                                    hidden={!editable}
                                    invalid={invalidPhoneNumber}
                                    onKeyUp={onKeyUp}
                                />
                                <FormFeedback>
                                    Enter a valid phone number.
                                </FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {user.phoneNumber ? user.phoneNumber : "-"}
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}
