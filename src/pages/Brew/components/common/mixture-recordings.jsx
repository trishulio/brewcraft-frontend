import React, { useState } from "react";
import { useSelector } from "react-redux";
import { map } from "lodash";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import CommonTable from "../../../../component/Common/table";
import { formatDatetime, prettyName } from "../../.././../helpers/textUtils";
import { isValidNumberString } from "../../../../helpers/utils";
import { useDispatch } from "react-redux";
import {
    editBatch,
    setBatchMixtureRecordings,
} from "../../../../store/actions";
import {
    Modal,
    ModalBody,
    ModalFooter,
} from "../../../../component/Common/modal";

export function MixtureRecordingsModal({
    show,
    setShow,
    afterSave,
    mixture,
    measures,
}) {
    const dispatch = useDispatch();
    return (
        <Modal
            title="Recordings"
            size="lg"
            show={show}
            close={() => {
                setShow(false);
            }}
        >
            <ModalBody>
                <MixtureRecordings mixture={mixture} measures={measures} />
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

export default function MixtureRecordings({ mixture, measures }) {
    const [items, setItems] = useState([]);
    const [measure, setMeasure] = useState("");
    const [datetime, setDatetime] = useState("");
    const [recordValue, setRecordValue] = useState(0);
    const [invalidQuantity, setInvalidQuantity] = useState(false);
    const dispatch = useDispatch();

    const { editable } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const allMixtureRecordings = useSelector((state) => {
        return state.Batch.MixtureRecordings.content;
    });

    const mixtureRecordings = useSelector((state) => {
        return state.Batch.MixtureRecordings.content.filter(
            (mp) => mp.mixture.id === mixture.id
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
                            map(
                                mixtureRecordings.filter(
                                    (mr) =>
                                        mr.mixture.id === mixture.id &&
                                        [3, 4, 5].includes(mr.measure.id)
                                ),
                                (record, index) => (
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
                                                                        (l) =>
                                                                            l !==
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
                                            {prettyName(record.measure.name)}
                                        </td>
                                        <td>
                                            {formatDatetime(record.recordedAt)}
                                        </td>
                                        <td>{record.value}</td>
                                    </tr>
                                )
                            )}
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
                                    return m.id === parseFloat(e.target.value);
                                });
                                setMeasure(measure || "");
                            }}
                        >
                            <option value="">Measure</option>
                            {map(measures, (value, index) => (
                                <option value={value.id} key={index}>
                                    {prettyName(value.name)}
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
                        className="waves-effect mr-2"
                        onClick={() => {
                            dispatch(
                                setBatchMixtureRecordings({
                                    content: [
                                        ...allMixtureRecordings,
                                        {
                                            measure,
                                            value: parseFloat(recordValue),
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
                        color="warning"
                        className="waves-effect"
                        onClick={() => {
                            dispatch(
                                setBatchMixtureRecordings({
                                    content: allMixtureRecordings.filter(
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
