import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    // Input
} from "reactstrap";

export default function DetailsForm({item}) {
    return (
        <Card>
            <CardHeader>
                <h4 className="card-title font-size-12 align-middle">Batch Owner</h4>
            </CardHeader>
            <CardBody>
                {/* <Input
                    name="batchAssignee"
                    type="text"
                />
                <Input
                    name="batchOwner"
                    label="Owner"
                    type="text"
                />
                <Input
                    name="batchTags"
                    label="Tags"
                    placeholder="Select"
                    type="text"
                />
                <Input
                    name="batchPriority"
                    type="text"
                />
                <hr
                    style={{
                        color: "#000000",
                        height: 50
                    }}
                /> */}
            </CardBody>
        </Card>
    );
}