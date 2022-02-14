import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import {
    Row,
    Col,
    Button,
    FormFeedback,
    FormGroup,
    Input,
    Label,
} from "reactstrap";
import CommonTable from "../../../component/Common/table";
import { isValidNumberString } from "../../../helpers/utils";
import { setFinishedGoodInvalidFinishedGoodLotPortions } from "../../../store/actions";

export default function FinishedGoodLotPortions({
    label,
    editable,
    finishedGoodLotPortions,
    setFinishedGoodLotPortions,
}) {
    const [invalidQuantity, setInvalidQuantity] = useState(false);
    const [lots, setLots] = useState([]);
    const [selectedLot, setSelectedLot] = useState("");
    const [selectedLotQuantity, setSelectedLotQuantity] = useState(0);
    const dispatch = useDispatch();

    const { invalidFinishedGoodLotPortions } = useSelector((state) => {
        return state.FinishedGood;
    });

    const finishedGoodLots = useSelector((state) => {
        return state.FinishedGoodsInventory.content;
    });

    const batches = useSelector((state) => {
        return state.Batches.all;
    });

    if (!finishedGoodLotPortions) {
        finishedGoodLotPortions = [];
    }

    function getBatchId(finishedGood) {
        let batchId = null;
        if (
            finishedGood &&
            finishedGood.mixturePortions &&
            finishedGood.mixturePortions[0]
        ) {
            const batch = batches.find(
                (b) =>
                    b.id ===
                    finishedGood.mixturePortions[0].mixture?.brewStage?.brew?.id
            );
            batchId = batch?.id;
        }
        return batchId;
    }

    return (
        <React.Fragment>
            <Label>{label}</Label>
            <div className="mb-3">
                <CommonTable>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Sku</th>
                            <th>Product</th>
                            <th>Batch Ids</th>
                            <th>Packaged On</th>
                            <th>Quantity</th>
                            {/* <th>Cost</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {(!finishedGoodLotPortions ||
                            !finishedGoodLotPortions.length) && (
                            <tr>
                                <td></td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        )}
                        {finishedGoodLotPortions &&
                            map(finishedGoodLotPortions, (portion, index) => (
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
                                                            setLots([
                                                                ...lots,
                                                                index,
                                                            ]);
                                                        } else {
                                                            setLots(
                                                                lots.filter(
                                                                    (l) =>
                                                                        l !==
                                                                        index
                                                                )
                                                            );
                                                        }
                                                    }}
                                                    checked={
                                                        lots.includes(index) &&
                                                        editable
                                                    }
                                                />
                                            )}
                                        </div>
                                    </td>
                                    <td>{portion.finishedGoodLot.sku.name}</td>
                                    <td>
                                        {
                                            portion.finishedGoodLot.sku.product
                                                .name
                                        }
                                    </td>
                                    <td>
                                        {getBatchId(portion.finishedGoodLot)}
                                    </td>
                                    <td>
                                        {portion.finishedGoodLot.packagedOn}
                                    </td>
                                    <td>
                                        {portion.quantity.value}{" "}
                                        {portion.quantity.symbol}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </CommonTable>
            </div>
            {editable && (
                <div>
                    <Row>
                        <FormGroup className="d-block d-sm-inline-block mr-2 mb-0">
                            <Input
                                type="select"
                                className="waves-effect"
                                style={{ width: "14rem" }}
                                value={selectedLot.id || ""}
                                invalid={invalidFinishedGoodLotPortions}
                                onChange={(e) => {
                                    const finishedGoodLot =
                                        finishedGoodLots.find((s) => {
                                            return (
                                                s.id ===
                                                parseInt(e.target.value)
                                            );
                                        });
                                    if (finishedGoodLotPortions?.length < 1) {
                                        dispatch(
                                            setFinishedGoodInvalidFinishedGoodLotPortions(
                                                !e.target.value
                                            )
                                        );
                                    }
                                    setSelectedLot(finishedGoodLot || "");
                                }}
                            >
                                <option value="">Finished Good Lot</option>
                                {map(finishedGoodLots, (value, index) => (
                                    <option value={value.id} key={index}>
                                        {value.sku.name} ({"Batch Ids: "}{" "}
                                        {getBatchId(value)}) (
                                        {value.quantity.value}
                                        {value.quantity.symbol})
                                    </option>
                                ))}
                            </Input>
                            <FormFeedback>
                                Select at least one finished good lot.
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup className="d-block d-sm-inline-block mr-2 mb-0">
                            <Input
                                type="text"
                                className="waves-effect"
                                style={{ width: "8rem" }}
                                value={selectedLotQuantity}
                                invalid={invalidQuantity}
                                onChange={(e) => {
                                    setSelectedLotQuantity(e.target.value);
                                    if (!e.target.value) {
                                        setInvalidQuantity(false);
                                    } else {
                                        setInvalidQuantity(
                                            !isValidNumberString(e.target.value)
                                        );
                                    }
                                }}
                            />
                            <FormFeedback>Enter a valid number.</FormFeedback>
                        </FormGroup>
                        <Col>
                            <Button
                                size="sm"
                                className="waves-effect mr-2 mb-0"
                                onClick={() => {
                                    const finishedGoodLotPortion =
                                        finishedGoodLotPortions.find(
                                            (fgp) =>
                                                fgp.finishedGoodLot.id ===
                                                selectedLot.id
                                        );
                                    if (finishedGoodLotPortion) {
                                        finishedGoodLotPortion.quantity.value +=
                                            parseFloat(selectedLotQuantity);
                                        setFinishedGoodLotPortions([
                                            ...finishedGoodLotPortions,
                                        ]);
                                    } else {
                                        setFinishedGoodLotPortions([
                                            ...finishedGoodLotPortions,
                                            {
                                                finishedGoodLot: selectedLot,
                                                quantity: {
                                                    symbol: selectedLot.quantity
                                                        .symbol,
                                                    value: parseFloat(
                                                        selectedLotQuantity
                                                    ),
                                                },
                                            },
                                        ]);
                                    }
                                }}
                                disabled={!selectedLot || !selectedLotQuantity}
                            >
                                Enter
                            </Button>
                            <Button
                                size="sm"
                                color="warning"
                                className="waves-effect"
                                onClick={() => {
                                    setFinishedGoodLotPortions(
                                        finishedGoodLotPortions.filter(
                                            (_, index) => !lots.includes(index)
                                        )
                                    );
                                    setLots([]);
                                }}
                                disabled={!lots.length}
                            >
                                Remove
                            </Button>
                        </Col>
                    </Row>
                </div>
            )}
        </React.Fragment>
    );
}
