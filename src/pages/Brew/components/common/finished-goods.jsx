import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import { Button, Input, Label } from "reactstrap";
import CommonTable from "../../../../component/Common/table";
import { editBatch, fetchSkus } from "../../../../store/actions";
import { formatDatetime, prettyVolume } from "../../../../helpers/textUtils";
import FinishedGoodModal from "../../../../component/FinishedGoods";
import { setBatchFinishedGoods } from "../../../../store/BatchFinishedGoods/actions";
import {
    Modal,
    ModalBody,
    ModalFooter,
} from "../../../../component/Common/modal";

export function FinishedGoodsModal({ show, setShow, afterSave, mixture }) {
    const dispatch = useDispatch();
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
                    color="primary"
                    onClick={() => {
                        dispatch(editBatch());
                        afterSave();
                        setShow(false);
                    }}
                >
                    Save
                </Button>{" "}
                <Button
                    onClick={() => {
                        setShow(false);
                    }}
                >
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default function FinishedGoods({ mixture }) {
    const initialFinishedGood = {
        id: "",
        sku: {
            name: "",
            quantity: {
                symbol: "",
                value: null,
            },
        },
        mixturePortions: [
            {
                mixture,
            },
        ],
        materialPortions: [],
        finishedGoodLotPortions: [],
        quantity: {
            symbol: "",
            value: null,
        },
        packagedOn: null,
    };
    const [items, setItems] = useState([]);
    const [finishedGood, setFinishedGood] = useState(initialFinishedGood);
    const [editFinishedGood, setEditFinishedGood] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    const { editable } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const finishedGoods = useSelector((state) => {
        return state.Batch.BatchFinishedGoods.content.filter(
            (fg) => fg.mixturePortions[0].mixture.id === mixture.id
        );
    });

    useEffect(() => {
        dispatch(
            fetchSkus({
                pageSize: 500,
            })
        );
        // eslint-disable-next-line
    }, []);

    const modalProps = {
        finishedGood,
        setFinishedGood,
        show: showModal,
        editable: true,
        repackage: false,
        handleClose: () => {
            setShowModal(false);
        },
        handleSave: () => {
            if (editFinishedGood) {
                // const mp = finishedGood.mixturePortions.find(
                //     (mp) => mp.addedAt === finishedGood.datetime
                // );
                // mp.quantity.value =
                //     toL(mp.quantity.value, mp.quantity.symbol) +
                //     toL(
                //         finishedGood.sku.quantity.value,
                //         finishedGood.sku.quantity.symbol
                //     ) *
                //         parseFloat(finishedGood.quantity);
                // finishedGood.quantity.value += parseFloat(quantity);
                const index = finishedGoods.findIndex((fg) => {
                    return fg.id === finishedGood.id;
                });
                const content = JSON.parse(JSON.stringify(finishedGoods));
                content[index] = finishedGood;
                dispatch(
                    setBatchFinishedGoods({
                        content,
                    })
                );
            } else {
                dispatch(
                    setBatchFinishedGoods({
                        content: [
                            ...finishedGoods,
                            {
                                ...finishedGood,
                            },
                        ],
                    })
                );
            }
            setShowModal(false);
        },
    };

    return (
        <React.Fragment>
            <Label>Packaged Items</Label>
            <CommonTable>
                <thead>
                    <tr>
                        <th></th>
                        <th>SKU</th>
                        <th>Time</th>
                        <th>Total Vol.</th>
                        <th>Num. Units</th>
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
                                    setEditFinishedGood(true);
                                    setShowModal(true);
                                }}
                            >
                                <td style={{ width: "2rem" }}>
                                    <div className="d-flex align-items-center vertical-center">
                                        {editable && (
                                            <Input
                                                className="ml-1"
                                                type="checkbox"
                                                disabled={!editable}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setItems([
                                                            ...items,
                                                            index,
                                                        ]);
                                                    } else {
                                                        setItems(
                                                            items.filter(
                                                                (item) =>
                                                                    item !==
                                                                    index
                                                            )
                                                        );
                                                    }
                                                }}
                                                checked={
                                                    items.includes(index) &&
                                                    editable
                                                }
                                            />
                                        )}
                                    </div>
                                </td>
                                <td>
                                    {finishedGood.sku.number} -{" "}
                                    {finishedGood.sku.name}
                                </td>
                                <td>
                                    {formatDatetime(finishedGood.packagedOn)}
                                </td>
                                <td>
                                    {prettyVolume(
                                        finishedGood.mixturePortions[0].quantity
                                            .value,
                                        finishedGood.mixturePortions[0].quantity
                                            .symbol
                                    )}
                                </td>
                                <td>{finishedGood.quantity.value}</td>
                            </tr>
                        ))}
                </tbody>
            </CommonTable>
            {editable && (
                <Button
                    className="waves-effect mr-2"
                    onClick={() => {
                        setFinishedGood(initialFinishedGood);
                        setEditFinishedGood(false);
                        setShowModal(true);
                    }}
                >
                    Add Item
                </Button>
            )}
            {/* {editable && (
                <Button

                    className="waves-effect mr-2"
                    onClick={() => {}}
                    disabled={!sku.id || !quantity}
                >
                    Enter
                </Button>
            )}
            {editable && (
                <Button

                    color="warning"
                    className="waves-effect"
                    onClick={() => {
                        dispatch(
                            setBatchFinishedGoods({
                                content: finishedGoods.filter(
                                    (_, index) => !items.includes(index)
                                ),
                            })
                        );
                        setItems([]);
                    }}
                    disabled={!items.length}
                >
                    Remove
                </Button>
            )} */}
            <FinishedGoodModal {...modalProps} />
        </React.Fragment>
    );
}
