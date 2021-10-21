import { map } from "lodash";
import React from "react";
import {
    Button,
    Col,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Row
} from "reactstrap";

export default function BatchMixtureTransfers({ mixture, editable }) {

    const transfers = [{
        quantity: "100 hl",
        equipment: "Fermenter Tank 1"
    }, {
        quantity: "105 hl",
        equipment: "Fermenter Tank 2"
    }];

    return (
        <React.Fragment>
            <h4 className="font-size-12 pt-3 pt-sm-0">To tanks</h4>
            <hr/>
            <div className="">
                {
                    map(transfers, (transfer, index) => (
                        <div key={index} className="d-block mb-2">
                            <div style={{ width: "3rem"}} className="d-inline-block font-size-12">
                                {transfer.quantity}
                            </div>
                            <span className="font-size-12 mr-2">{transfer.equipment}</span>
                            <span className="font-size-12 align-middle mr-4"><i className="mdi mdi-delete"></i></span>
                        </div>
                    ))
                }
                <div className="clearfix"></div>
                <Button
                    size="sm"
                    className="waves-effect"
                    // onClick={() => setShowModal(true)}
                    // hidden={!editable || (!multiple && materialPortions.length)}
                    hidden={!editable}
                >
                    Add
                </Button>
            </div>
            {/* <Modal {...props}/> */}
        </React.Fragment>
    );
}