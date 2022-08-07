import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormFeedback, FormGroup, Label } from "reactstrap";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { setBatchDetails } from "../../../store/actions";
import { Card, CardBody, CardHeader } from "../../../component/Common/Card";
import { formatDatetime } from "../../../helpers/textUtils";
import { getLoggedInUser } from "../../../helpers/authUtils";

export default function BatchPeople() {
    const [isOpen, setIsOpen] = useState(true);

    const dispatch = useDispatch();

    const { id } = useParams();

    const { data: batch, loading } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const users = useSelector((state) => {
        return state.Users.content;
    });

    useEffect(() => {
        if (id === "new" && !batch.ownedBy) {
            //Set the owner to session user for new brews
            let awsUser = getLoggedInUser();
            let user = users.find((u) => u.email === awsUser.email);
            if (user) {
                dispatch(
                    setBatchDetails({
                        data: {
                            ...batch,
                            ownedBy: user,
                        },
                    })
                );
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, users, batch]);

    return (
        <React.Fragment>
            <Card className="shadow-none mb-3">
                <CardBody isOpen={isOpen} isLoading={loading} className="pb-0">
                    <Label for="batchAssignedId">Assigned To</Label>
                    <FormGroup>
                        <Select
                            className="align-middle"
                            isMulti={false}
                            name="batchAssignedId"
                            value={
                                batch.assignedTo
                                    ? {
                                          id: batch.assignedTo.id,
                                          label: batch.assignedTo.displayName,
                                      }
                                    : { id: -1, label: "Unassigned" }
                            }
                            options={[
                                { value: -1, label: "Unassigned" },
                            ].concat(
                                users.map((u) => ({
                                    value: u.id,
                                    label: u.displayName,
                                }))
                            )}
                            onChange={(e) => {
                                dispatch(
                                    setBatchDetails({
                                        data: {
                                            ...batch,
                                            assignedTo: users.find(
                                                (u) =>
                                                    u.id === parseInt(e.value)
                                            ),
                                        },
                                    })
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
                    <Label for="batchOwnerId">Owner</Label>
                    <FormGroup>
                        <Select
                            className="align-middle"
                            isMulti={false}
                            name="batchOwnerId"
                            value={
                                batch.ownedBy
                                    ? {
                                          id: batch.ownedBy.id,
                                          label: batch.ownedBy.displayName,
                                      }
                                    : { id: -1, label: "Unassigned" }
                            }
                            options={[
                                { value: -1, label: "Unassigned" },
                            ].concat(
                                users.map((u) => ({
                                    value: u.id,
                                    label: u.displayName,
                                }))
                            )}
                            onChange={(e) => {
                                dispatch(
                                    setBatchDetails({
                                        data: {
                                            ...batch,
                                            ownedBy: users.find(
                                                (u) =>
                                                    u.id === parseInt(e.value)
                                            ),
                                        },
                                    })
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
                    <Label>Created Date</Label>
                    <div className="clearfix"></div>
                    <div style={{ paddingBottom: "10px" }}>
                        {batch.createdAt
                            ? formatDatetime(batch.createdAt)
                            : "-"}
                    </div>
                    <div className="clearfix"></div>
                    <Label>Last Updated</Label>
                    <div className="clearfix"></div>
                    <span>-</span>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}
