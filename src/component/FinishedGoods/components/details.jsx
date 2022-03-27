import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import { Row, Col, FormGroup, FormFeedback, Input, Label } from "reactstrap";
import { fetchMixtures } from "../../../store/actions";
import { validDate } from "../../../helpers/utils";
import PackagingMaterials from "./materials";
import FinishedGoodLotPortions from "./lot-portions";

export default function FinishedGoodDetails({
    editable,
    repackageMode,
    finishedGood,
    setFinishedGood,
}) {
    const [invalidSku, setInvalidSku] = useState(false);
    const [invalidMixturePortions, setInvalidMixturePortions] = useState(false);
    const [invalidPackagedOn, setInvalidPackagedOn] = useState(false);
    const [invalidQuantity, setInvalidQuantity] = useState(false);

    const dispatch = useDispatch();

    const skus = useSelector((state) => {
        return state.Skus.all;
    });

    const materialPortions = useSelector((state) => {
        return state.FinishedGood.data.materialPortions;
    });

    const finishedGoodLotPortions = useSelector((state) => {
        return state.FinishedGood.data.finishedGoodLotPortions;
    });

    const batches = useSelector((state) => {
        return state.Batches.all;
    });

    const mixtures = useSelector((state) => {
        return state.Mixtures.content;
    });

    function setMaterialPortions(materialPortions) {
        setFinishedGood({
            ...finishedGood,
            materialPortions,
        });
    }

    function setFinishedGoodLotPortions(finishedGoodLotPortions) {
        setFinishedGood({
            ...finishedGood,
            finishedGoodLotPortions,
        });
    }

    const packagingMaterialsProps = {
        label: "Packaging Materials",
        editable,
        materialPortions,
        setMaterialPortions,
    };

    const finishedGoodLotPortionsProps = {
        label: "Finished Good Lots",
        editable,
        finishedGoodLotPortions,
        setFinishedGoodLotPortions,
    };

    function onFormInputChange(e) {
        switch (e.target.name) {
            case "finishedGoodSku":
                if (finishedGood.sku?.id !== e.target.value) {
                    setInvalidSku(!e.target.value);
                    const sku = skus.find(
                        (s) => s.id === parseInt(e.target.value)
                    );
                    if (e.target.value) {
                        if (!repackageMode) {
                            // Only set mixturePortion quantity when
                            // repackageMode is false.
                            let mixturePortions =
                                finishedGood?.mixturePortions?.length > 0
                                    ? JSON.parse(
                                          JSON.stringify(
                                              finishedGood.mixturePortions
                                          )
                                      )
                                    : initMixturePortions();

                            mixturePortions[0].quantity = JSON.parse(
                                JSON.stringify(sku.quantity)
                            );

                            if (finishedGood.quantity) {
                                mixturePortions[0].quantity.value =
                                    mixturePortions[0].quantity.value *
                                    finishedGood.quantity.value;
                            }
                            setFinishedGood({
                                ...finishedGood,
                                sku,
                                mixturePortions,
                            });
                        } else {
                            setFinishedGood({
                                ...finishedGood,
                                sku,
                            });
                        }
                    }
                }
                break;
            case "finishedGoodMixtureBatchId":
                let currentBatchId =
                    finishedGood?.mixturePortions?.length > 0
                        ? finishedGood.mixturePortions[0].mixture.brewStage.brew
                              .id
                        : null;
                let newBatchSelected = batches.find(
                    (b) => b.id === parseInt(e.target.value)
                );
                if (currentBatchId !== newBatchSelected?.id) {
                    let mixturePortions =
                        finishedGood?.mixturePortions?.length > 0
                            ? JSON.parse(
                                  JSON.stringify(finishedGood.mixturePortions)
                              )
                            : initMixturePortions();

                    mixturePortions[0].mixture.brewStage.brew.id =
                        newBatchSelected?.id;

                    setInvalidMixturePortions(!e.target.value);
                    setFinishedGood({
                        ...finishedGood,
                        mixturePortions,
                    });

                    if (newBatchSelected && newBatchSelected.id) {
                        dispatch(
                            fetchMixtures({
                                brewIds: newBatchSelected.id,
                                stageTaskIds: "5,7,8", //FinishedGoods can only be packaged from Fermenter,Conditioner,Storage Tank stages
                            })
                        );
                    }
                }
                break;
            case "finishedGoodMixtureId":
                let currentMixtureId =
                    finishedGood?.mixturePortions?.length > 0
                        ? finishedGood.mixturePortions[0].mixture.id
                        : null;
                let newMixture = mixtures.find(
                    (m) => m.id === parseInt(e.target.value)
                );
                if (currentMixtureId !== newMixture.id) {
                    let mixturePortions =
                        finishedGood?.mixturePortions?.length > 0
                            ? JSON.parse(
                                  JSON.stringify(finishedGood.mixturePortions)
                              )
                            : initMixturePortions();

                    mixturePortions[0].mixture.id = newMixture.id;

                    setInvalidMixturePortions(!e.target.value);
                    setFinishedGood({
                        ...finishedGood,
                        mixturePortions,
                    });
                }
                break;
            case "finishedGoodQuantity":
                if (finishedGood.quantity?.value !== e.target.value) {
                    setInvalidQuantity(!e.target.value);

                    if (!repackageMode) {
                        //Only set mixturePortion quantity when repackageMode is false
                        let mixturePortions;
                        if (finishedGood.sku) {
                            mixturePortions =
                                finishedGood?.mixturePortions?.length > 0
                                    ? JSON.parse(
                                          JSON.stringify(
                                              finishedGood.mixturePortions
                                          )
                                      )
                                    : initMixturePortions();

                            mixturePortions[0].quantity.symbol =
                                finishedGood.sku.quantity.symbol;
                            mixturePortions[0].quantity.value =
                                finishedGood.sku.quantity.value *
                                parseInt(e.target.value);
                        }
                        setFinishedGood({
                            ...finishedGood,
                            quantity: {
                                value: e.target.value,
                                symbol: "each",
                            },
                            mixturePortions,
                        });
                    } else {
                        setFinishedGood({
                            ...finishedGood,
                            quantity: {
                                value: e.target.value,
                                symbol: "each",
                            },
                        });
                    }
                }
                break;
            case "finishedGoodPackagedOn":
                if (finishedGood.packagedOn !== e.target.value) {
                    setInvalidPackagedOn(!validDate(e.target.value));
                    setFinishedGood({
                        ...finishedGood,
                        packagedOn: e.target.value,
                    });
                }
                break;
            default:
                break;
        }
    }

    function getBrew(finishedGood) {
        let brew = null;
        if (finishedGood?.mixturePortions?.length > 0) {
            brew = finishedGood.mixturePortions[0].mixture?.brewStage?.brew;
        }
        return brew;
    }

    function getMixture(finishedGood) {
        let mixture = null;
        if (finishedGood?.mixturePortions?.length > 0) {
            mixture = finishedGood.mixturePortions[0].mixture;
        }
        return mixture;
    }

    function initMixturePortions() {
        let mixturePortions = [
            {
                id: null,
                mixture: {
                    id: null,
                    brewStage: {
                        brew: {
                            id: null,
                        },
                    },
                },
                quantity: {
                    value: null,
                    symbol: null,
                },
                version: null,
            },
        ];
        return mixturePortions;
    }

    function calculateMixtureQuantity(finishedGood) {
        if (finishedGood.sku && finishedGood.quantity) {
            return (
                finishedGood.sku.quantity.value * finishedGood.quantity.value
            );
        } else if (finishedGood.sku) {
            return finishedGood.sku.quantity.value;
        } else {
            return "";
        }
    }

    return (
        <React.Fragment>
            <Row>
                <Col xs="2">
                    <Label for="name" className="mb-3">
                        SKU
                    </Label>
                </Col>
                <Col xs={8}>
                    <FormGroup
                        className="d-inline-block font-size-12 mb-2"
                        hidden={!editable}
                    >
                        <Input
                            type="select"
                            className="waves-effect"
                            name="finishedGoodSku"
                            style={{ width: "8rem" }}
                            disabled={!editable}
                            value={finishedGood.sku?.id || ""}
                            onChange={(e) => {
                                onFormInputChange(e);
                            }}
                            hidden={!editable}
                            invalid={invalidSku}
                        >
                            <option value="">Select</option>
                            {map(skus, (value, index) => (
                                <option value={value.id} key={index}>
                                    {`${value.name} (${value.number})`}
                                </option>
                            ))}
                        </Input>
                        <FormFeedback>Enter a valid sku.</FormFeedback>
                    </FormGroup>
                    <div className="d-inline-block font-size-12 mb-2">
                        <div hidden={editable}>
                            {finishedGood.sku
                                ? `${finishedGood.sku.name} (${finishedGood.sku.number})`
                                : "-"}
                        </div>
                    </div>
                    <div className="clearFix"></div>
                </Col>
            </Row>
            <Row hidden={repackageMode}>
                <Col xs="2">
                    <Label for="name" className="mb-3">
                        Batch
                    </Label>
                </Col>
                <Col xs={8}>
                    <FormGroup
                        className="d-inline-block font-size-12 pr-1"
                        hidden={!editable}
                    >
                        <Input
                            type="select"
                            className="waves-effect"
                            name="finishedGoodMixtureBatchId"
                            style={{ width: "8rem" }}
                            disabled={!editable}
                            value={getBrew(finishedGood)?.id || ""}
                            onChange={(e) => {
                                onFormInputChange(e);
                            }}
                            hidden={!editable}
                            invalid={invalidMixturePortions}
                        >
                            <option value="">Select Id</option>
                            {map(batches, (value, index) => (
                                <option value={value.id} key={index}>
                                    {value.batchId}
                                </option>
                            ))}
                        </Input>
                        <FormFeedback>Enter a valid batch id.</FormFeedback>
                    </FormGroup>
                    <FormGroup
                        className="d-inline-block font-size-12 mb-2"
                        hidden={!editable}
                    >
                        <Input
                            type="select"
                            className="waves-effect"
                            name="finishedGoodMixtureId"
                            style={{ width: "8rem" }}
                            disabled={!editable}
                            value={getMixture(finishedGood)?.id || ""}
                            onChange={(e) => {
                                onFormInputChange(e);
                            }}
                            hidden={!editable}
                            invalid={invalidMixturePortions}
                        >
                            <option value="">Select Stage</option>
                            {map(mixtures, (value, index) => (
                                <option value={value.id} key={index}>
                                    {value.brewStage.task.name}
                                </option>
                            ))}
                        </Input>
                        <FormFeedback>Enter a valid batch stage.</FormFeedback>
                    </FormGroup>
                    <div className="d-inline-block font-size-12 mb-2">
                        <div hidden={editable}>
                            {getBrew(finishedGood)?.batchId || "-"} (
                            {getMixture(finishedGood)?.brewStage?.task?.name ||
                                "-"}
                            )
                        </div>
                    </div>
                    <div className="clearFix"></div>
                </Col>
            </Row>
            <Row>
                <Col xs={2}>
                    <Label
                        for="finishedGoodMixtureQuantity"
                        className="d-inline-block font-size-12 mb-3"
                        style={{
                            width: "8rem",
                        }}
                    >
                        Batch Quantity
                    </Label>
                </Col>
                <Col xs={8}>
                    <Row className="m-0" xs={8}>
                        <FormGroup
                            className="d-inline-block font-size-12 pr-1"
                            hidden={!editable}
                        >
                            <Input
                                type="text"
                                className="waves-effect"
                                name="finishedGoodMixtureQuantity"
                                style={{ width: "8rem" }}
                                disabled={true}
                                value={`${calculateMixtureQuantity(
                                    finishedGood
                                )} ${finishedGood?.sku?.quantity.symbol || ""}`}
                                onChange={(e) => {
                                    onFormInputChange(e);
                                }}
                                hidden={!editable}
                            />
                        </FormGroup>
                        <div className="d-inline-block font-size-12 mb-2">
                            <div hidden={editable}>
                                {calculateMixtureQuantity(finishedGood) || "-"}
                            </div>
                        </div>
                        <div className="clearFix"></div>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <div className="clearfix mb-3">
                        <PackagingMaterials {...packagingMaterialsProps} />
                    </div>
                    <div className="clearFix"></div>
                </Col>
            </Row>
            <Row hidden={!repackageMode}>
                <Col xs={12}>
                    <div className="clearfix mb-3">
                        <FinishedGoodLotPortions
                            {...finishedGoodLotPortionsProps}
                        />
                    </div>
                    <div className="d-inline-block font-size-12 mb-2">
                        <div hidden={editable}>
                            {finishedGood.sku ? finishedGood.sku.name : "-"}
                        </div>
                    </div>
                    <div className="clearFix"></div>
                </Col>
            </Row>
            <Row>
                <Col xs="2">
                    <Label for="finishedGoodQuantity" className="mb-3">
                        Quantity
                    </Label>
                </Col>
                <Col xs="8">
                    <FormGroup hidden={!editable}>
                        <Input
                            type="text"
                            className="waves-effect"
                            value={finishedGood.quantity?.value || ""}
                            style={{ width: "8rem" }}
                            placeholder="Enter"
                            name="finishedGoodQuantity"
                            disabled={!editable}
                            onChange={onFormInputChange}
                            invalid={invalidQuantity}
                        />
                        <FormFeedback>Enter a valid quantity.</FormFeedback>
                    </FormGroup>
                    <div hidden={editable}>
                        {finishedGood.quantity
                            ? finishedGood.quantity.value
                            : "-"}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs="2">
                    <Label for="finishedGoodPackagedOn" className="align-top">
                        Packaged On
                    </Label>
                </Col>
                <Col xs={4}>
                    <FormGroup className="align-middle">
                        <Input
                            type="datetime-local"
                            name="finishedGoodPackagedOn"
                            className="waves-effect"
                            value={finishedGood?.packagedOn || ""}
                            onChange={onFormInputChange}
                            disabled={!editable}
                            invalid={invalidPackagedOn}
                        />
                        <FormFeedback>Enter a valid time and date</FormFeedback>
                    </FormGroup>
                    <div className="clearfix"></div>
                </Col>
            </Row>
        </React.Fragment>
    );
}
