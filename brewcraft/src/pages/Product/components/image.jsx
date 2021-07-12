import React from "react";
import {
  Card,
  CardBody,
  Button
} from "reactstrap";
import fantasticLager from "../../../assets/images/products/fantastic-lager.jpg";


export default function ProductImage({ editable }) {
    return (
        <Card>
        <CardBody>
                <h4 className="card-title mb-4">Product Image</h4>
                <img style={{ width: "100%" }} src={fantasticLager} alt="material" className="border d-block mr-2 mb-2 p-1" />
                <span className="d-block mb-2">fantastic-lager.jpg</span>
                <Button
                    type="button"
                    color="primary"
                    size="sm"
                    className="waves-effect mr-2"
                    disabled={true}
                    disabled={!editable}
                >
                    Upload
                </Button>
            </CardBody>
        </Card>
    );
}