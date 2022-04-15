import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row,
} from "reactstrap";
import { Card } from "../../../../component/Common/Card";
import TooltipButton from "../../../../component/Common/tooltip-button";
import { addBatchStage, deleteBatchMixture } from "../../../../store/actions";
import { BatchIngredientsModal } from "../common/ingredients";
import { MixtureRecordingsModal } from "../common/mixture-recordings";
import BatchStage, { StageHeader, StageModal } from "../common/stage";
import StageIngredients from "../common/stage-ingredients";
import StageRecordings from "../common/stage-recordings";

export default function BrewKettle({
    kettleMixture,
    whirlpoolMixture,
    transferMixture,
    isOpen,
    toggleIsOpen,
}) {
    const [isOpenMoreDropdown, setIsOpenMoreDropdown] = useState(false);
    const [isShowEditStage, setIsShowEditStage] = useState(false);
    const [isShowIngredients, setIsShowIngredients] = useState(false);
    const [isShowMixtureRecordings, setIsShowMixtureRecordings] =
        useState(false);
    const dispatch = useDispatch();

    const measures = useSelector((state) => {
        return state.Measures.data.filter((measure) =>
            [3, 4, 5].includes(measure.id)
        );
    });

    const kettleStage = useSelector((state) => {
        return (
            kettleMixture &&
            state.Batch.Stages.content.find(
                (s) => s.id === kettleMixture.brewStage.id
            )
        );
    });

    const whirlpoolStage = useSelector((state) => {
        return (
            whirlpoolMixture &&
            state.Batch.Stages.content.find(
                (s) => s.id === whirlpoolMixture.brewStage.id
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

    const maltPortions = useSelector((state) => {
        return state.Batch.MaterialPortions.initial.filter(
            (mp) =>
                mp.mixture.id === kettleMixture.id &&
                mp.materialLot.invoiceItem.material.category.name === "Malt"
        );
    });

    const hopPortions = useSelector((state) => {
        return state.Batch.MaterialPortions.initial.filter(
            (mp) =>
                mp.mixture.id === kettleMixture.id &&
                mp.materialLot.invoiceItem.material.category.name === "Hop"
        );
    });

    const otherPortions = useSelector((state) => {
        return state.Batch.MaterialPortions.initial.filter(
            (mp) =>
                mp.mixture.id === kettleMixture.id &&
                mp.materialLot.invoiceItem.material.category.name !== "Malt" &&
                mp.materialLot.invoiceItem.material.category.name !== "Hop"
        );
    });

    const phRecordings = useSelector((state) => {
        return state.Batch.MixtureRecordings.initial.filter(
            (mr) => mr.mixture.id === kettleMixture.id && mr.measure.id === 3
        );
    });

    const temperatureRecordings = useSelector((state) => {
        return state.Batch.MixtureRecordings.initial.filter(
            (mr) => mr.mixture.id === kettleMixture.id && mr.measure.id === 4
        );
    });

    const gravityRecordings = useSelector((state) => {
        return state.Batch.MixtureRecordings.initial.filter(
            (mr) => mr.mixture.id === kettleMixture.id && mr.measure.id === 5
        );
    });

    const stageProps = {
        isOpen,
        stage: kettleStage,
        mixture: kettleMixture,
    };

    const modalProps = {
        mixture: kettleMixture,
        afterSave: () => {
            toggleIsOpen("kettle", true);
        },
    };

    function Toolbar() {
        return (
            <React.Fragment>
                <TooltipButton
                    id="editKettleButton"
                    className="waves-effect mr-1 mb-1"
                    size="sm"
                    outline={true}
                    tooltipText="Edit Stage"
                    placement="bottom"
                    onClick={() => setIsShowEditStage(true)}
                >
                    <i className="mdi mdi-pencil"></i>
                </TooltipButton>
                <TooltipButton
                    id="ingredientsKettleButton"
                    className="waves-effect m-0 mr-1 mb-1"
                    size="sm"
                    outline={true}
                    tooltipText="Ingredients"
                    placement="bottom"
                    onClick={() => setIsShowIngredients(true)}
                >
                    <i className="mdi mdi-barley"></i>
                </TooltipButton>
                <TooltipButton
                    id="recordingsKettleButton"
                    className="waves-effect m-0 mr-1 mb-1"
                    size="sm"
                    outline={true}
                    tooltipText="Recordings"
                    placement="bottom"
                    onClick={() => setIsShowMixtureRecordings(true)}
                >
                    <i className="mdi mdi-clipboard-outline"></i>
                </TooltipButton>
                <Dropdown
                    isOpen={isOpenMoreDropdown}
                    toggle={() => setIsOpenMoreDropdown(!isOpenMoreDropdown)}
                    className="d-inline-block m-0"
                >
                    <DropdownToggle
                        tag="button"
                        className="waves-effect btn btn-outline-secondary btn-sm mr-1 mb-1"
                        data-toggle="dropdown"
                    >
                        <i className="mdi mdi-dots-horizontal"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem
                            disabled={
                                !!whirlpoolStage?.id || !!transferStage?.id
                            }
                        >
                            <span
                                className="text-dark"
                                onClick={() => {
                                    dispatch(
                                        addBatchStage({
                                            parentMixtureIds: [
                                                kettleMixture.id,
                                            ],
                                            taskId: 3,
                                            statusId: 4,
                                        })
                                    );
                                }}
                            >
                                Move to Whirlpool
                            </span>
                        </DropdownItem>
                        <DropdownItem
                            disabled={
                                !!whirlpoolStage?.id || !!transferStage?.id
                            }
                        >
                            <span
                                className="text-dark"
                                onClick={() => {
                                    dispatch(
                                        addBatchStage({
                                            parentMixtureIds: [
                                                kettleMixture.id,
                                            ],
                                            taskId: 6, // transfer
                                            statusId: 4,
                                        })
                                    );
                                }}
                            >
                                Complete Brew
                            </span>
                        </DropdownItem>
                        <DropdownItem
                            disabled={
                                !!whirlpoolMixture?.id || !!transferMixture?.id
                            }
                        >
                            <span
                                className="text-dark"
                                onClick={() => {
                                    dispatch(deleteBatchMixture(kettleMixture));
                                }}
                            >
                                Delete
                            </span>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            {kettleStage && (
                <Card className="shadow-none m-0 p-0">
                    <StageHeader
                        title="Stage: Kettle"
                        toggleIsOpen={() => {
                            toggleIsOpen("kettle");
                        }}
                        toolbar={<Toolbar />}
                    />
                    <BatchStage {...stageProps}>
                        <Row>
                            <Col className="mb-3" sm={6}>
                                <StageIngredients
                                    lotPortions={maltPortions}
                                    title="Malt"
                                    noData="No Malt"
                                />
                            </Col>
                            <Col className="mb-3" sm={6}>
                                <StageIngredients
                                    lotPortions={hopPortions}
                                    title="Hops"
                                    noData="No Hops"
                                />
                            </Col>
                            <Col className="mb-3" sm={6}>
                                <StageIngredients
                                    lotPortions={otherPortions}
                                    title="Other Ingredients"
                                    noData="No Ingredients"
                                />
                            </Col>
                            <Col className="mb-3" sm={6}>
                                <StageRecordings
                                    recordings={temperatureRecordings}
                                    title="Temperature"
                                    noData="No Readings"
                                />
                            </Col>
                            <Col className="mb-3" sm={6}>
                                <StageRecordings
                                    recordings={phRecordings}
                                    title="Ph"
                                    noData="No Readings"
                                />
                            </Col>
                            <Col className="mb-3" sm={6}>
                                <StageRecordings
                                    recordings={gravityRecordings}
                                    title="Gravity"
                                    noData="No Readings"
                                />
                            </Col>
                        </Row>
                    </BatchStage>
                </Card>
            )}
            {kettleStage && (
                <StageModal
                    show={isShowEditStage}
                    setShow={setIsShowEditStage}
                    stage={kettleStage}
                    title={"Edit Stage: Kettle"}
                    {...modalProps}
                />
            )}
            {kettleStage && (
                <BatchIngredientsModal
                    show={isShowIngredients}
                    setShow={setIsShowIngredients}
                    {...modalProps}
                />
            )}
            {kettleStage && (
                <MixtureRecordingsModal
                    show={isShowMixtureRecordings}
                    setShow={setIsShowMixtureRecordings}
                    measures={measures}
                    {...modalProps}
                />
            )}
        </React.Fragment>
    );
}
