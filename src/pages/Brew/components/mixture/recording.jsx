import React, { useState } from "react";
import { useSelector } from "react-redux";
import { map } from "lodash";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import CommonTable from "../../../../component/Common/table";
import { formatDatetime } from "../../../../helpers/textUtils";

export default function BatchRecordings({
    mixtureRecordings,
    setMixtureRecordings,
    editable,
}) {
    const [items, setItems] = useState([]);
    const [measure, setMeasure] = useState("");
    const [quantity, setQuantity] = useState(0);

    const measures = useSelector((state) => {
        return state.Measures.content;
    });

    return (
        <React.Fragment>
            {console.log(mixtureRecordings)}
            <Label
                for="mixtureRecording"
                className="d-block d-inline-block font-size-12 mb-3"
                style={{
                    width: "5rem",
                }}
            >
                Recordings
            </Label>
            <div className="mb-3">
                <CommonTable>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Recording</th>
                            <th>Value</th>
                            <th>Time</th>
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
                            map(mixtureRecordings, (recording, index) => (
                                <tr key={index}>
                                    <td>
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
                                                                recording
                                                                    .measure.id,
                                                            ]);
                                                        } else {
                                                            setItems(
                                                                items.filter(
                                                                    (l) =>
                                                                        l !==
                                                                        recording
                                                                            .measure
                                                                            .id
                                                                )
                                                            );
                                                        }
                                                    }}
                                                    checked={
                                                        items.includes(
                                                            recording.measure.id
                                                        ) && editable
                                                    }
                                                />
                                            )}
                                        </div>
                                    </td>
                                    <td>{recording.measure.name}</td>
                                    <td>{recording.value}</td>
                                    <td>
                                        {formatDatetime(recording.recordedAt)}
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
                        name="mixtureRecordingMeasure"
                        className="waves-effect"
                        style={{ width: "14rem" }}
                        value={measure.id || ""}
                        onChange={(e) => {
                            const measure = measures.find(
                                (s) => s.id === parseInt(e.target.value)
                            );
                            setMeasure(measure);
                        }}
                    >
                        <option value="">Recording</option>
                        {map(measures, (value, index) => (
                            <option value={value.id} key={index}>
                                {value.name}
                            </option>
                        ))}
                    </Input>
                    <FormFeedback>Enter a valid measure.</FormFeedback>
                </FormGroup>
                <FormGroup className="d-block d-sm-inline-block mr-2">
                    <Input
                        type="number"
                        name="MixtureRecordingQuantity"
                        className="waves-effect"
                        style={{ width: "8rem" }}
                        value={quantity || ""}
                        onChange={(e) => {
                            setQuantity(e.target.value);
                        }}
                        disabled={!measure.id}
                    />
                    <FormFeedback>Enter a valid number.</FormFeedback>
                </FormGroup>
                <Button
                    size="sm"
                    className="waves-effect mr-2"
                    onClick={() => {
                        setMixtureRecordings([
                            ...mixtureRecordings,
                            {
                                measure,
                                value: quantity,
                            },
                        ]);
                    }}
                    hidden={!editable}
                    disabled={!measure.id || !quantity}
                >
                    Enter
                </Button>
                <Button
                    size="sm"
                    color="warning"
                    className="waves-effect"
                    onClick={() => {
                        setMixtureRecordings(
                            mixtureRecordings.filter(
                                (p) => !items.includes(p.measure.id)
                            )
                        );
                        setItems([]);
                    }}
                    hidden={!editable}
                    disabled={!items.length}
                >
                    Remove
                </Button>
            </div>
        </React.Fragment>
    );
}
