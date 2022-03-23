import React, { useState } from "react";
import { useSelector } from "react-redux";
import { map } from "lodash";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import CommonTable from "../../../../component/Common/table";
import { formatDatetime } from "../../.././../helpers/textUtils";
import { isValidNumberString } from "../../../../helpers/utils";
import { useDispatch } from "react-redux";
import { setBatchMixtureRecordings } from "../../../../store/actions";

export default function MixtureRecordings({ mixture }) {
    const [items, setItems] = useState([]);
    const [measure, setMeasure] = useState("");
    const [datetime, setDatetime] = useState("");
    const [recordValue, setRecordValue] = useState(0);
    const [invalidQuantity, setInvalidQuantity] = useState(false);
    const dispatch = useDispatch();

    const { editable } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const measures = useSelector((state) => {
        return state.Measures.data;
    });

    const mixtureRecordings = useSelector((state) => {
        return state.Batch.MixtureRecordings.content.filter(
            (mr) => mr.mixture.id === mixture.id
        );
    });

    return (
        <React.Fragment>
            <Label>Mixture Data</Label>
            <div className="mb-3">
                <CommonTable>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Measure</th>
                            <th>Time</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!mixtureRecordings.length && (
                            <tr>
                                <td></td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        )}
                        {mixtureRecordings &&
                            map(mixtureRecordings, (record, index) => (
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
                                                                    (l) =>
                                                                        l !==
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
                                    <td>{record.measure.name}</td>
                                    <td>{formatDatetime(record.recordedAt)}</td>
                                    <td>{record.value}</td>
                                </tr>
                            ))}
                    </tbody>
                </CommonTable>
            </div>
            {editable && (
                <div>
                    <FormGroup className="d-block d-sm-inline-block mr-2 mb-0">
                        <Input
                            type="select"
                            className="waves-effect"
                            style={{ width: "8rem" }}
                            value={measure?.id || ""}
                            onChange={(e) => {
                                const measure = measures.find((m) => {
                                    return m.id === parseInt(e.target.value);
                                });
                                setMeasure(measure || "");
                            }}
                        >
                            <option value="">Measure</option>
                            {map(measures, (value, index) => (
                                <option value={value.id} key={index}>
                                    {value.name}
                                </option>
                            ))}
                        </Input>
                        <FormFeedback>Enter a valid measure.</FormFeedback>
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
                            style={{ width: "8rem" }}
                            value={recordValue}
                            invalid={invalidQuantity}
                            onChange={(e) => {
                                setRecordValue(e.target.value);
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
                    <Button
                        size="sm"
                        className="waves-effect mr-2"
                        onClick={() => {
                            dispatch(
                                setBatchMixtureRecordings({
                                    content: [
                                        ...mixtureRecordings,
                                        {
                                            measure,
                                            value: recordValue,
                                            recordedAt: datetime,
                                            mixture: mixture,
                                        },
                                    ],
                                })
                            );
                        }}
                        disabled={!measure || !datetime}
                    >
                        Enter
                    </Button>
                    <Button
                        size="sm"
                        color="warning"
                        className="waves-effect"
                        onClick={() => {
                            dispatch(
                                setBatchMixtureRecordings({
                                    content: mixtureRecordings.filter(
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
                </div>
            )}
        </React.Fragment>
    );
}
