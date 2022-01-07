import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import {
    Button,
    Collapse,
    FormFeedback,
    FormGroup,
    Input,
    Label,
} from "reactstrap";
import CommonTable from "../../../../component/Common/table";
import { fetchSkus } from "../../../../store/actions";
import { formatDatetime } from "../../../../helpers/textUtils";
import { isValidNumberString } from "../../../../helpers/utils";

export default function BatchIngredients({
    mixture,
    finishedGoods,
    setFinishedGoods,
    editable,
}) {
    const [items, setItems] = useState([]);
    const [sku, setSku] = useState("");
    const [datetime, setDatetime] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [invalidQuantity, setInvalidQuantity] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (editable) {
            dispatch(
                fetchSkus({
                    pageSize: 500,
                })
            );
        }
    }, [editable, dispatch]);

    const skus = useSelector((state) => {
        return state.Skus.content;
    });

    return (
        <React.Fragment>
            <Label
                className="d-block d-sm-inline-block font-size-14 mb-3"
                style={{
                    width: "8rem",
                }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <i
                    className={`fa fa-caret-right font-size-14 mr-2 ${
                        isOpen ? " rotate-down" : ""
                    }`}
                ></i>
                Packaged SKUs
            </Label>
            <Collapse isOpen={isOpen}>
                <div className="mb-3">
                    <CommonTable>
                        <thead>
                            <tr>
                                <th></th>
                                <th>SKU</th>
                                <th>Time</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!finishedGoods.length && (
                                <tr>
                                    <td></td>
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
                                                            if (
                                                                e.target.checked
                                                            ) {
                                                                setItems([
                                                                    ...items,
                                                                    index,
                                                                ]);
                                                            } else {
                                                                setItems(
                                                                    items.filter(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item !==
                                                                            index
                                                                    )
                                                                );
                                                            }
                                                        }}
                                                        checked={
                                                            items.includes(
                                                                index
                                                            ) && editable
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
                                            {formatDatetime(
                                                finishedGood.packagedOn
                                            )}
                                        </td>
                                        <td>
                                            {
                                                finishedGood.mixturePortions[0]
                                                    .quantity.value
                                            }
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </CommonTable>
                </div>
                <div hidden={!editable}>
                    <FormGroup className="d-block d-sm-inline-block mr-2">
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
                    <FormGroup className="d-block d-sm-inline-block mr-2">
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
                    <FormGroup className="d-block d-sm-inline-block mr-2">
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
                                const finishedGood = finishedGoods.find(
                                    (fg) => {
                                        return (
                                            fg.sku.id === sku.id &&
                                            fg.mixturePortions.find(
                                                (mp) => mp.addedAt === datetime
                                            )
                                        );
                                    }
                                );
                                if (finishedGood) {
                                    finishedGood.mixturePortions.find(
                                        (mp) => mp.addedAt === datetime
                                    ).quantity.value += parseFloat(quantity);
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
                                                        value:
                                                            sku.quantity.value *
                                                            parseFloat(
                                                                quantity
                                                            ),
                                                        symbol: sku.quantity
                                                            .symbol,
                                                    },
                                                    addedAt: datetime,
                                                },
                                            ],
                                            materialPortions: [],
                                            packagedOn: datetime,
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
            </Collapse>
        </React.Fragment>
    );
}
