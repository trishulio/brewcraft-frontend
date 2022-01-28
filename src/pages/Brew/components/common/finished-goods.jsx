import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import CommonTable from "../../../../component/Common/table";
import { fetchSkus } from "../../../../store/actions";
import {
    formatDatetime,
    prettyVolume,
    toL,
} from "../../../../helpers/textUtils";
import { isValidNumberString } from "../../../../helpers/utils";

export default function BatchIngredients({
    mixture,
    finishedGoods,
    setFinishedGoods,
}) {
    const [items, setItems] = useState([]);
    const [sku, setSku] = useState("");
    const [datetime, setDatetime] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [invalidQuantity, setInvalidQuantity] = useState(false);

    const dispatch = useDispatch();

    const { editable } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const skus = useSelector((state) => {
        return state.Skus.content;
    });

    useEffect(() => {
        if (editable) {
            dispatch(
                fetchSkus({
                    pageSize: 500,
                })
            );
        }
    }, [editable, dispatch]);

    return (
        <React.Fragment>
            <Label>Packaged Goods</Label>
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
                                    {finishedGood.sku.name} -{" "}
                                    {finishedGood.sku.description}
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
                <FormGroup className="d-block d-sm-inline-block mr-2 mb-0">
                    <Input
                        type="select"
                        className="waves-effect"
                        style={{ width: "8rem" }}
                        value={sku.id || ""}
                        onChange={(e) => {
                            const sku = skus.find(
                                (s) => s.id === parseInt(e.target.value)
                            );
                            setSku(sku);
                        }}
                    >
                        <option value="">SKU</option>
                        {map(skus, (value, index) => (
                            <option value={value.id} key={index}>
                                {value.name} - {value.description}
                            </option>
                        ))}
                    </Input>
                    <FormFeedback>Enter a valid sku.</FormFeedback>
                </FormGroup>
                <FormGroup className="d-block d-sm-inline-block mr-2 mb-0">
                    <Input
                        type="datetime-local"
                        className="waves-effect"
                        style={{ width: "8rem" }}
                        value={datetime}
                        onChange={(e) => {
                            setDatetime(e.target.value);
                        }}
                    />
                    <FormFeedback>Enter a valid datetime.</FormFeedback>
                </FormGroup>
                <FormGroup className="d-block d-sm-inline-block mr-2 mb-0">
                    <Input
                        type="text"
                        className="waves-effect"
                        style={{ width: "8" }}
                        value={quantity || ""}
                        invalid={invalidQuantity}
                        onChange={(e) => {
                            setQuantity(e.target.value);
                            if (!e.target.value) {
                                setInvalidQuantity(false);
                            } else {
                                setInvalidQuantity(
                                    !isValidNumberString(e.target.value)
                                );
                            }
                        }}
                        disabled={!sku.id || !datetime}
                    />
                    <FormFeedback>Enter a valid number.</FormFeedback>
                </FormGroup>
                {editable && (
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
                                mp.quantity.value +=
                                    toL(
                                        sku.quantity.value,
                                        sku.quantity.symbol
                                    ) * parseFloat(quantity);
                                finishedGood.quantity.value +=
                                    parseFloat(quantity);
                                setFinishedGoods([...finishedGoods]);
                            } else {
                                setFinishedGoods([
                                    ...finishedGoods,
                                    {
                                        sku,
                                        mixturePortions: [
                                            {
                                                mixture,
                                                quantity: {
                                                    value: toL(
                                                        sku.quantity.value /
                                                            parseFloat(
                                                                quantity
                                                            ),
                                                        sku.quantity.symbol
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
                                ]);
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
                            setFinishedGoods(
                                finishedGoods.filter(
                                    (_, index) => !items.includes(index)
                                )
                            );
                            setItems([]);
                        }}
                        disabled={!items.length}
                    >
                        Remove
                    </Button>
                )}
            </div>
        </React.Fragment>
    );
}
