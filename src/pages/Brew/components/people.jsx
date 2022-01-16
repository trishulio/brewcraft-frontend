import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormFeedback, FormGroup, Label } from "reactstrap";
import Select from "react-select";
import { fetchAllUsers } from "../../../store/actions";
import { Card, CardBody, CardHeader } from "../../../component/Common/Card";

export default function BatchPeople() {
    const [isOpen, setIsOpen] = useState(true);
    const [userAssigned, setUserAssigned] = useState("");
    const [userOwner, setUserOwner] = useState("");
    const dispatch = useDispatch();

    const users = useSelector((state) => {
        return state.Users.content;
    });

    useEffect(() => {
        dispatch(fetchAllUsers());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <Card className="shadow-none mb-3">
                <CardHeader>
                    <div className="mr-2" onClick={() => setIsOpen(!isOpen)}>
                        <i
                            className={`fa fa-caret-right font-size-13 mr-2 ${
                                isOpen ? " rotate-down" : ""
                            }`}
                        ></i>
                        <span
                            className="text-dark"
                            onClick={() => setIsOpen(!isOpen)}
                            style={{ cursor: "pointer" }}
                        >
                            People
                        </span>
                    </div>
                </CardHeader>
                <CardBody isOpen={isOpen} className="pb-0">
                    <Label for="batchAssignedId">Assigned To</Label>
                    <FormGroup>
                        <Select
                            className="align-middle"
                            isMulti={false}
                            name="batchAssignedId"
                            value={
                                userAssigned
                                    ? {
                                          id: userAssigned.id,
                                          label: userAssigned.displayName,
                                      }
                                    : ""
                            }
                            placeholder="Not Selected.."
                            options={users.map((u) => ({
                                value: u.id,
                                label: u.displayName,
                            }))}
                            onChange={(e) => {
                                setUserAssigned({
                                    ...users.find(
                                        (u) => u.id === parseInt(e.value)
                                    ),
                                });
                            }}
                            // disabled={batch.id && !editable}
                            styles={{
                                control: (styles) => ({
                                    ...styles,
                                    width: "100%",
                                    "@media screen and (max-width: 750px)": {
                                        width: "100%",
                                    },
                                }),
                            }}
                        />
                        <FormFeedback>Invalid batch parameter!</FormFeedback>
                    </FormGroup>
                    <Label for="batchAssignedId">Owner</Label>
                    <FormGroup>
                        <Select
                            className="align-middle"
                            isMulti={false}
                            name="batchAssignedId"
                            value={
                                userOwner
                                    ? {
                                          id: userOwner.id,
                                          label: userOwner.displayName,
                                      }
                                    : ""
                            }
                            placeholder="Not Selected.."
                            options={users.map((u) => ({
                                value: u.id,
                                label: u.displayName,
                            }))}
                            onChange={(e) => {
                                setUserOwner(
                                    users.find(
                                        (u) => u.id === parseInt(e.value)
                                    )
                                );
                            }}
                            // disabled={batch.id && !editable}
                            styles={{
                                control: (styles) => ({
                                    ...styles,
                                    width: "100%",
                                    "@media screen and (max-width: 750px)": {
                                        width: "100%",
                                    },
                                }),
                            }}
                        />
                        <FormFeedback>Invalid batch parameter!</FormFeedback>
                    </FormGroup>
                    <Label for="batchCreatedDatetime">Created Date</Label>
                    {/* <FormGroup>
                        <Input
                            type="datetime-local"
                            name="batchLastUpdatedDatetime"
                            className="waves-effect"
                        />
                        <FormFeedback>Invalid batch parameter!</FormFeedback>
                    </FormGroup> */}
                    <div className="clearfix"></div>
                    <span>-</span>
                    <div className="clearfix"></div>
                    <Label for="batchCreatedDatetime">Last Updated</Label>
                    {/* <FormGroup>
                        <Input
                            type="datetime-local"
                            name="batchLastUpdatedDatetime"
                            className="waves-effect"
                        />
                        <FormFeedback>Invalid batch parameter!</FormFeedback>
                    </FormGroup> */}
                    <div className="clearfix"></div>
                    <span>-</span>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}
