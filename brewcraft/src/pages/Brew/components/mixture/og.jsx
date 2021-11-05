import React from "react";
import {
    Col,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Row
} from "reactstrap";

export default function BatchOriginalGravity({ mixture, editable }) {

    return (
        <React.Fragment>
            <h4 className="font-size-12 pt-3 pt-sm-0">Gravity</h4>
            <hr/>
            <Label
                for="mixtureOriginalGravityValue"
                className="d-inline-block font-size-12 mb-3"
                style={{
                    width: "7rem"
                }}
            >
                Original Gravity
            </Label>
            <FormGroup
                className="d-sm-inline-block mb-3"
                hidden={!editable}
            >
                <Input
                    type="text"
                    className="waves-effect"
                    // bsSize="sm"
                    // value={mixture?.quantity?.value}
                    placeholder="Enter"
                    name="mixtureOriginalGravityValue"
                    // onChange={onFormInputChange}
                    style={{ width: "8rem" }}
                    hidden={!editable}
                />
                <FormFeedback>Enter a valid number.</FormFeedback>
            </FormGroup>
            {
                !editable && <div
                        className="d-sm-inline-block mb-3"
                    >
                    {mixture?.name ? mixture.name : "-"}
                </div>
            }
        </React.Fragment>
    );
}