import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import { Button, Input, Label } from "reactstrap";
import CommonTable from "../../../../component/Common/table";
import { formatDatetime, prettyVolume } from "../../../../helpers/textUtils";
import FinishedGoodModal from "../../../../component/FinishedGoodsModal";
import {
    setBatchFinishedGoods,
    showFinishedGoodModal,
} from "../../../../store/BatchFinishedGoods/actions";
import {
    Modal,
    ModalBody,
    ModalFooter,
} from "../../../../component/Common/modal";
import { editBatch, setBatchDetails } from "../../../../store/actions";

export function FinishedGoodsModal({ show, setShow, mixture }) {
    console.log(mixture);
    return (
        <Modal
            title="Finished Goods"
            size="lg"
            show={show}
            close={() => {
                setShow(false);
            }}
        >
            <ModalBody>
                <FinishedGoods mixture={mixture} />
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={() => {
                        setShow(false);
                    }}
                >
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
}

function FinishedGoods({ mixture }) {
    console.log(mixture);
    const initialFinishedGood = {
        id: "",
        mixturePortions: [],
        materialPortions: [],
        quantity: {
            symbol: "",
            value: "",
        },
        packagedOn: "",
    };
    const [finishedGood, setFinishedGood] = useState(initialFinishedGood);
    const [items, setItems] = useState([]);

    const dispatch = useDispatch();

    const finishedGoods = useSelector((state) => {
        return state.Batch.BatchFinishedGoods.content.filter(
            (fg) => fg.mixturePortions[0].mixture.id === mixture.id
        );
    });

    const { error } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const { showModal } = useSelector((state) => {
        return state.Batch.BatchFinishedGoods;
    });

    const modalProps = {
        mixture,
        finishedGood,
        setFinishedGood: (finishedGood) => {
            debugger;
            dispatch(
                setBatchFinishedGoods({
                    content: [
                        ...finishedGoods.filter(
                            (fg) => fg.id !== finishedGood.id
                        ),
                        finishedGood,
                    ],
                })
            );
        },
        show: showModal,
        error,
        onClose: () => {
            dispatch(showFinishedGoodModal(false));
        },
        onSave: () => {
            debugger;
            dispatch(editBatch());
        },
    };

    return (
        <React.Fragment>
            <Label>Packaged Items</Label>
            <CommonTable>
                <thead>
                    <tr>
                        <th></th>
                        <th>Vol. / Unit</th>
                        <th>Quantity</th>
                        <th>Total Vol.</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {!finishedGoods.length && (
                        <tr>
                            <td></td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    )}
                    {finishedGoods &&
                        map(finishedGoods, (finishedGood, index) => (
                            <tr
                                key={index}
                                onClick={() => {
                                    setFinishedGood(finishedGood);
                                    dispatch(showFinishedGoodModal(true));
                                    dispatch(setBatchDetails({ error: null }));
                                }}
                            >
                                <td style={{ width: "2rem" }}>
                                    <div className="d-flex align-items-center vertical-center">
                                        <Input
                                            className="ml-1"
                                            type="checkbox"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setItems([...items, index]);
                                                } else {
                                                    setItems(
                                                        items.filter(
                                                            (item) =>
                                                                item !== index
                                                        )
                                                    );
                                                }
                                            }}
                                            checked={items.includes(index)}
                                        />
                                    </div>
                                </td>
                                <td>
                                    {prettyVolume(
                                        finishedGood.mixturePortions[0].quantity
                                            .value /
                                            finishedGood.quantity.value,
                                        finishedGood.mixturePortions[0].quantity
                                            .symbol
                                    )}
                                </td>
                                <td>{finishedGood.quantity.value}</td>
                                <td>
                                    {finishedGood.mixturePortions &&
                                        prettyVolume(
                                            finishedGood.mixturePortions[0]
                                                .quantity.value,
                                            finishedGood.mixturePortions[0]
                                                .quantity.symbol
                                        )}
                                </td>
                                <td>
                                    {formatDatetime(finishedGood.packagedOn)}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </CommonTable>
            <Button
                className="waves-effect mr-2"
                onClick={() => {
                    setFinishedGood(initialFinishedGood);
                    dispatch(showFinishedGoodModal(true));
                    dispatch(setBatchDetails({ error: null }));
                }}
            >
                Add Item
            </Button>
            <FinishedGoodModal {...modalProps} />
        </React.Fragment>
    );
}
