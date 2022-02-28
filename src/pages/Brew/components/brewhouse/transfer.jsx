import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import { isValidNumberString } from "../../../../helpers/utils";
import {
    setBrewMixtureDetails,
    setBrewMixtureRecordings,
} from "../../../../store/actions";

export default function BrewTransfer({ mashMixture }) {
    const [invalidOg, setInvalidOg] = useState(false);
    const [invalidQuantity, setInvalidQuantity] = useState(false);
    const dispatch = useDispatch();

    const mixtures = useSelector((state) => {
        return state.Batch.Mixtures.content;
    });

    const transferMixture = useSelector((state) => {
        const kettleMixture =
            mashMixture &&
            state.Batch.Mixtures.content.find((m) =>
                m.parentMixtureIds?.includes(mashMixture.id)
            );
        const mixture =
            kettleMixture &&
            state.Batch.Mixtures.content.find((m) =>
                m.parentMixtureIds?.includes(kettleMixture.id)
            );
        if (mixture?.brewStage.task.id === 6) {
            return mixture;
        }
        return (
            mixture &&
            state.Batch.Mixtures.content.find((m) =>
                m.parentMixtureIds?.includes(mixture.id)
            )
        );
    });

    const transferStage = useSelector((state) => {
        return (
            transferMixture &&
            state.Batch.Stages.content.find(
                (s) => s.id === transferMixture.brewStage.id
            )
        );
    });

    const mixtureRecordings = useSelector((state) => {
        return state.Batch.MixtureRecordings.content;
    });

    const originalGravity = useSelector((state) => {
        return (
            transferMixture &&
            state.Batch.MixtureRecordings.content.find(
                (mr) =>
                    mr.mixture.id === transferMixture.id && mr.measure.id === 5
            )
        );
    });

    function setMixture(mixture) {
        // insert mixture back into array
        const data = [...mixtures];
        const index = mixtures.findIndex((s) => s.id === mixture.id);
        data.splice(index, 1);
        data.splice(index, 0, { ...mixture });
        dispatch(
            setBrewMixtureDetails({
                content: data,
            })
        );
    }

    return (
        <React.Fragment>
            <Row>
                <Col sm="6">
                    <Label for="brewhouseOriginalGravity">
                        Original Gravity (OG)
                    </Label>
                    <FormGroup className="mb-3">
                        <Input
                            type="text"
                            className="waves-effect"
                            placeholder={"Enter"}
                            name="brewhouseOriginalGravity"
                            autoComplete="off"
                            disabled={!transferMixture}
                            invalid={invalidOg}
                            value={originalGravity?.value || ""}
                            onChange={(e) => {
                                if (originalGravity) {
                                    originalGravity.value = e.target.value;
                                } else {
                                    mixtureRecordings.push({
                                        value: e.target.value,
                                        measure: {
                                            id: 5,
                                        },
                                        recordedAt: transferStage.endedAt,
                                        mixture: transferMixture,
                                    });
                                }
                                dispatch(
                                    setBrewMixtureRecordings({
                                        content: [...mixtureRecordings],
                                    })
                                );
                                setInvalidOg(
                                    e.target.value &&
                                        !isValidNumberString(e.target.value)
                                );
                            }}
                        />
                        <FormFeedback>Enter a valid number.</FormFeedback>
                    </FormGroup>
                </Col>
                <Col sm="6">
                    <Label for="brewhouseTransferVolume">
                        Transfer Volume (l)
                    </Label>
                    <FormGroup className="mb-3">
                        <Input
                            type="text"
                            className="waves-effect"
                            placeholder={"Enter"}
                            name="brewhouseTransferVolume"
                            disabled={!transferMixture}
                            invalid={invalidQuantity}
                            autoComplete="off"
                            value={transferMixture?.quantity.value || ""}
                            onChange={(e) => {
                                setMixture({
                                    ...transferMixture,
                                    quantity: {
                                        symbol: "l",
                                        value: e.target.value,
                                    },
                                });
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
                </Col>
            </Row>
        </React.Fragment>
    );
}
