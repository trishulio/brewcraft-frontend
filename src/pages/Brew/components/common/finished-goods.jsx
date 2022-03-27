import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import { Button, Input, Label } from "reactstrap";
import CommonTable from "../../../../component/Common/table";
import { fetchSkus } from "../../../../store/actions";
import { formatDatetime, prettyVolume } from "../../../../helpers/textUtils";
import Modal from "../../../../component/FinishedGoods";

export default function FinishedGoods({ mixture }) {
    const [items, setItems] = useState([]);
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
        show: showModal,
        handleClose: () => {
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
                            <tr key={index}>
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
            <div hidden={!editable}>
                <Button
                    size="sm"
                    className="waves-effect mr-2"
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
                    Add Item
                </Button>
                {/* {editable && (
                    <Button
                        size="sm"
                        className="waves-effect mr-2"
                        onClick={() => {
                            const finishedGood = finishedGoods.find((fg) => {
                                return (
                                    fg.sku.id === sku.id &&
                                    fg.mixturePortions.find(
                                        (mp) => mp.addedAt === datetime
                                    )
                                );
                            });
                            if (finishedGood) {
                                const mp = finishedGood.mixturePortions.find(
                                    (mp) => mp.addedAt === datetime
                                );
                                mp.quantity.value =
                                    toL(mp.quantity.value, mp.quantity.symbol) +
                                    toL(
                                        sku.quantity.value,
                                        sku.quantity.symbol
                                    ) *
                                        parseFloat(quantity);
                                finishedGood.quantity.value +=
                                    parseFloat(quantity);
                                dispatch(
                                    setBatchFinishedGoods({
                                        content: finishedGoods,
                                    })
                                );
                            } else {
                                dispatch(
                                    setBatchFinishedGoods({
                                        content: [
                                            ...finishedGoods,
                                            {
                                                sku,
                                                mixturePortions: [
                                                    {
                                                        mixture,
                                                        quantity: {
                                                            value: toL(
                                                                sku.quantity
                                                                    .value *
                                                                    parseFloat(
                                                                        quantity
                                                                    ),
                                                                sku.quantity
                                                                    .symbol
                                                            ),
                                                            symbol: "l",
                                                        },
                                                        addedAt: datetime,
                                                    },
                                                ],
                                                materialPortions: [],
                                                packagedOn: datetime,
                                                quantity: {
                                                    value: parseInt(quantity),
                                                    symbol: "each",
                                                },
                                            },
                                        ],
                                    })
                                );
                            }
                        }}
                        disabled={!sku.id || !quantity}
                    >
                        Enter
                    </Button>
                )}
                {editable && (
                    <Button
                        size="sm"
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
            </div>
            <Modal {...modalProps} />
        </React.Fragment>
    );
}
