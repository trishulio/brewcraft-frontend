import React from "react";
import {
  Button
} from "reactstrap";
import {
    Card,
    CardBody,
    CardHeader
} from "../../../component/Common/Card";
import fantasticLager from "../../../assets/images/products/fantastic-lager.jpg";

export default function ProductImage({ editable }) {
    return (
        <Card>
            <CardHeader>Product Image</CardHeader>
            <CardBody>
                <img style={{ width: "100%" }} src={fantasticLager} alt="material" className="border d-block mr-2 mb-2 p-1" />
                <span className="d-block mb-2">fantastic-lager.jpg</span>
                <Button
                    type="button"
                    color="primary"
                    size="sm"
                    className="waves-effect mr-2"
                    disabled={!editable}
                >
                    Upload
                </Button>
            </CardBody>
        </Card>
    );
}