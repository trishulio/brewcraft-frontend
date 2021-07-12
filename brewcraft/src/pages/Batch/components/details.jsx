import React from "react";
import {
    Card,
    CardBody,
    CardHeader
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";


export default function DetailsForm({item}) {
    return (
        <Card>
            <CardHeader>
                <h4 className="card-title font-size-12 align-middle">Details</h4>
            </CardHeader>
            <CardBody>
                <AvForm className="custom-validation" model={item}>
                    <AvField
                        name="assignee"
                        label="Assignee"
                        placeholder="Select"
                        type="text"
                        errorMessage="You must select an assignee"
                        validate={{
                            // required: { value: true }
                        }}
                    />
                    <AvField
                        name="owner"
                        label="Owner"
                        placeholder="Select"
                        type="text"
                        errorMessage="You must select a creator"
                        validate={{
                            // required: { value: true }
                        }}
                    />
                    <AvField
                        name="tags"
                        label="Tags"
                        placeholder="Select"
                        type="text"
                    />
                    <AvField
                        name="priority"
                        label="Priority"
                        placeholder="Select"
                        type="text"
                    />
                    <hr
                        style={{
                            color: "#000000",
                            height: 50
                        }}
                    />
                </AvForm>
            </CardBody>
        </Card>
    );
}