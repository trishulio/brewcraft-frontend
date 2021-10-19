import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import {
    Button, FormGroup, Input
} from "reactstrap";
import {
    Modal,
    ModalBody,
    ModalFooter
} from "../Common/modal";
import {
    saveMaterialPortion
} from "../../store/actions"

export default function MaterialLotsModal(props) {
    const [materialLot, setMaterialLot] = useState("");
    const [quantity, setQuantity] = useState("");
    const dispatch = useDispatch();

    const materialLots = useSelector(state => {
        return state.MaterialLots;
    });

    function close() {
        props.setShow(false);
    }

    function onFormSubmit(e, values) {
        debugger;
        dispatch(
            saveMaterialPortion({
                mixtureId: props.mixtureId,
                materialLotId: materialLot.id,
                quantity: {
                    symbol: materialLot.quantity.symbol,
                    value: quantity
                }
            })
        );
    }

    return (
        <Modal
            size="md"
            show={props.show}
            onValidSubmit={onFormSubmit}
            close={close}
            title="Material Lot"
        >
            <ModalBody>
                <FormGroup
                    hidden={!props.editable}
                    className="d-sm-inline-block mt-0 mb-3"
                    style={{
                        width: "100%"
                    }}
                >
                    <Input
                        type="select"
                        className="waves-effect d-sm-inline-block mr-2 mb-3"
                        style={{ width: "16rem" }}
                        hidden={!props.editable}
                        value={materialLot.id || ""}
                        onChange={e => {
                            debugger;
                            const materialLot = materialLots.stock.find (s => s.id === parseInt(e.target.value));
                            setMaterialLot(materialLot);
                        }}
                    >
                        <option value="">Select</option>
                        {
                            map(materialLots.stock, (value, index) => (
                                <option value={value.id} key={index}>
                                    {value.material.name} ({value.quantity.value}{value.quantity.symbol})
                                </option>
                            ))
                        }
                    </Input>
                    <Input
                        type="text"
                        className="waves-effect d-sm-inline-block mr-2 mb-3"
                        placeholder={materialLot.quantity?.symbol || ""}
                        style={{ width: "4rem" }}
                        hidden={!props.editable}
                        value={quantity !== "" ? quantity : ""}
                        onChange={e => {
                            const value = parseInt(e.target.value);
                            if (Number.isInteger(value)) {
                                setQuantity(value);
                            } else {
                                setQuantity("");
                            }
                        }}
                    />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" type="submit" onClick={onFormSubmit}>Save</Button>
            </ModalFooter>
        </Modal>
    );
};