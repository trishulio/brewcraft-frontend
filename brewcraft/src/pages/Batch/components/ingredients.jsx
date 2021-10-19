import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
    Button
} from "reactstrap";
import Modal from "../../../component/MaterialLots/modal";

export default function BatchIngredients(mixture) {
    const [showMaterialLotsModal, setShowMaterialLotsModal] = useState(false);

    return (
        <React.Fragment>
            <h4 className="font-size-14 pt-3 pt-sm-0">Ingredients</h4>
            <hr/>
            <div
                className="d-sm-inline-block mb-3"
            >
                {
                    mixture && mixture.materialPortions && mixture.materialPortions.forEach(value => (
                        <span>{value.material.name}: {value.quantity.value}</span>
                    ))
                }
            </div>
            <Button
                size="sm"
                className="waves-effect d-sm-inline-block"
                onClick={() => setShowMaterialLotsModal(true)}
            >
                Add
            </Button>
            <Modal
                show={showMaterialLotsModal}
                setShow={setShowMaterialLotsModal}
                mixtureId={mixture.id}
            />
        </React.Fragment>
    );
}