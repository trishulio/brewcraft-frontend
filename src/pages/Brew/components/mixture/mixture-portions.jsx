import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import CommonTable from "../../../../component/Common/table";
import { fetchSkus } from "../../../../store/actions";

export default function BatchIngredients({
    mixture,
    mixturePortions,
    setMixturePortions,
    editable,
}) {
    const [selectedListItems, setSelectedListItems] = useState([]);
    const [sku, setSku] = useState("");
    const [quantity, setQuantity] = useState(0);

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
                for="mixtureStartDateTime"
                className="d-block d-sm-inline-block font-size-12 mb-3"
                style={{
                    width: "10rem",
                }}
            >
                Packaged Items
            </Label>
            <div className="mb-3">
                <CommonTable>
                    <thead>
                        <tr>
                            <th></th>
                            <th>SKU</th>
                            <th>Description</th>
                            <th>Lot Number</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!mixturePortions.length && (
                            <tr>
                                <td></td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        )}
                        {mixturePortions &&
                            map(mixturePortions, (mixturePortion, index) => (
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
                                                            setSelectedListItems(
                                                                [
                                                                    ...selectedListItems,
                                                                    index,
                                                                ]
                                                            );
                                                        } else {
                                                            setSelectedListItems(
                                                                selectedListItems.filter(
                                                                    (item) =>
                                                                        item !==
                                                                        index
                                                                )
                                                            );
                                                        }
                                                    }}
                                                    checked={
                                                        selectedListItems.includes(
                                                            index
                                                        ) && editable
                                                    }
                                                />
                                            )}
                                        </div>
                                    </td>
                                    <td>{mixturePortion.sku.name}</td>
                                    <td>{mixturePortion.sku.description}</td>
                                    <td>{mixturePortion.lotNumber || "-"}</td>
                                    <td>
                                        {mixturePortion.quantity.value +
                                            " " +
                                            mixturePortion.quantity.symbol}
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
                        style={{ width: "14rem" }}
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
                        type="number"
                        className="waves-effect"
                        style={{ width: "8rem" }}
                        value={quantity || ""}
                        onChange={(e) => {
                            setQuantity(e.target.value);
                        }}
                        disabled={!sku.id}
                    />
                    <FormFeedback>Enter a valid number.</FormFeedback>
                </FormGroup>
                <Button
                    size="sm"
                    className="waves-effect mr-2"
                    onClick={() => {
                        setMixturePortions([
                            ...mixturePortions,
                            {
                                sku,
                                mixturePortions: [
                                    {
                                        mixture,
                                        quantity: {
                                            value:
                                                mixture.quantity.value *
                                                quantity,
                                            symbol: "ml",
                                        },
                                    },
                                ],
                                materialPortions: [],
                            },
                        ]);
                    }}
                    hidden={!editable}
                    disabled={!sku.id || !quantity}
                >
                    Enter
                </Button>
                <Button
                    size="sm"
                    color="warning"
                    className="waves-effect"
                    onClick={() => {
                        debugger;
                        // setFinishedGoods(
                        //     mixturePortions.filter(p => !selectedListItems.includes(p.materialLot.id))
                        // );
                        // setSelectedListItems([]);
                    }}
                    hidden={!editable}
                    disabled={!selectedListItems.length}
                >
                    Remove
                </Button>
            </div>
        </React.Fragment>
    );
}
