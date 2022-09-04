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
import { addBatchStage, deleteBatchMixture } from "../../../../store/actions";
import BatchStage, { StageHeader } from "../common/stage";
import { Card } from "../../../../component/Common/Card";
import TooltipButton from "../../../../component/Common/tooltip-button";
import StageIngredients from "../common/stage-ingredients";
import StageRecordings from "../common/stage-recordings";
import StageFinishedGoods from "../common/stage-finished-goods";
import StatusDropdownItems from "../common/stage-status-dropdown";
import {
    AbvLine,
    FinishedGoodsBar,
    GravityLine,
    IngredientsBar,
    PhLine,
    TemperatureLine,
} from "../common/charts";
import StageInitModal from "../common/stage-init-modal";

export default function BatchFerment({
    transferStage,
    transferMixture,
    fermentMixture,
    conditionMixture,
    briteTankMixture,
    isOpen,
    toggleIsOpen,
}) {
    const [isOpenMoreDropdown, setIsOpenMoreDropdown] = useState(false);
    const [isShowEditStage, setIsShowEditStage] = useState(false);
    const [isShowIngredients, setIsShowIngredients] = useState(false);
    const [isShowMixtureRecordings, setIsShowMixtureRecordings] =
        useState(false);
    const [isShowFinishedGoods, setIsShowFinishedGoods] = useState(false);
    const [showInitConditionStage, setShowInitConditionStage] = useState(false);
    const [showInitBritetankStage, setShowInitBritetankStage] = useState(false);
    const [showStageStart, setShowStageStart] = useState(false);
    const [showStageComplete, setShowStageComplete] = useState(false);
    const [showStageFailed, setShowStageFailed] = useState(false);
    const [toggleCharts, setToggleCharts] = useState(false);
    const dispatch = useDispatch();

    const fermentStage = useSelector((state) => {
        return state.Batch.Stages.content.find(
            (s) => s.id === fermentMixture.brewStage.id
        );
    });

    const measures = useSelector((state) => {
        return state.Measures.data.filter((measure) =>
            [3, 4, 5].includes(measure.id)
        );
    });

    const materialPortions = useSelector((state) => {
        return state.Batch.MaterialPortions.initial.filter(
            (mp) => mp.mixture.id === fermentMixture.id
        );
    });

    const phRecordings = useSelector((state) => {
        return state.Batch.MixtureRecordings.initial.filter(
            (mr) => mr.mixture.id === fermentMixture.id && mr.measure.id === 3
        );
    });

    const temperatureRecordings = useSelector((state) => {
        return state.Batch.MixtureRecordings.initial.filter(
            (mr) => mr.mixture.id === fermentMixture.id && mr.measure.id === 4
        );
    });

    const gravityRecordings = useSelector((state) => {
        return state.Batch.MixtureRecordings.initial.filter(
            (mr) => mr.mixture.id === fermentMixture.id && mr.measure.id === 5
        );
    });

    const originalGravity = useSelector((state) => {
        const record =
            transferStage.task.id === 6 &&
            state.Batch.MixtureRecordings.content.find((mr) => {
                return (
                    mr.mixture.id === transferMixture.id && mr.measure.id === 5
                );
            });
        return record ? record.value : "";
    });

    const abvRecordings = useSelector((state) => {
        return state.Batch.MixtureRecordings.initial
            .filter(
                (mr) =>
                    mr.mixture.id === fermentMixture.id && mr.measure.id === 5
            )
            .map((r) => ({
                ...r,
                value: Math.ceil((originalGravity - r.value) * 131.25),
            }));
    });

    const skuLots = useSelector((state) => {
        return state.Batch.BatchFinishedGoods.content.filter(
            (fg) => fg.mixturePortions[0].mixture.id === fermentMixture.id
        );
    });

    const stageProps = {
        isOpen,
        mixture: fermentMixture,
        stage: fermentStage,
        isShowEditStage,
        setIsShowEditStage,
        isShowIngredients,
        setIsShowIngredients,
        isShowMixtureRecordings,
        setIsShowMixtureRecordings,
        isShowFinishedGoods,
        setIsShowFinishedGoods,
        showStageStart,
        setShowStageStart,
        showStageComplete,
        setShowStageComplete,
        showStageFailed,
        setShowStageFailed,
        measures,
        afterSave: () => {
            toggleIsOpen("ferment", true);
        },
    };

    function Toolbar() {
        return (
            <React.Fragment>
                <TooltipButton
                    id="editFermentButton"
                    className="waves-effect mr-2 mb-1"
                    outline={true}
                    tooltipText="Edit Stage"
                    placement="bottom"
                    onClick={() => setIsShowEditStage(true)}
                >
                    <i className="mdi mdi-pencil"></i>
                </TooltipButton>
                <TooltipButton
                    id="ingredientsFermentButton"
                    className="waves-effect m-0 mr-2 mb-1"
                    outline={true}
                    tooltipText="Ingredients"
                    placement="bottom"
                    onClick={() => setIsShowIngredients(true)}
                >
                    <i className="mdi mdi-barley"></i>
                </TooltipButton>
                <TooltipButton
                    id="recordingsFermentButton"
                    className="waves-effect m-0 mr-2 mb-1"
                    outline={true}
                    tooltipText="Recordings"
                    placement="bottom"
                    onClick={() => setIsShowMixtureRecordings(true)}
                >
                    <i className="mdi mdi-clipboard-outline"></i>
                </TooltipButton>
                <TooltipButton
                    id="finishedGoodsFermentButton"
                    className="waves-effect m-0 mr-2 mb-1"
                    outline={true}
                    tooltipText="Finished Goods"
                    placement="bottom"
                    onClick={() => setIsShowFinishedGoods(true)}
                >
                    <i className="mdi mdi-beer"></i>
                </TooltipButton>
                <TooltipButton
                    id="chartsFermentButton"
                    className="waves-effect m-0 mr-2 mb-1"
                    outline={true}
                    tooltipText={toggleCharts ? "Hide Charts" : "Show Charts"}
                    placement="bottom"
                    onClick={() => {
                        setToggleCharts(!toggleCharts);
                        toggleIsOpen("ferment", true);
                    }}
                >
                    {toggleCharts ? (
                        <i className="mdi mdi-table"></i>
                    ) : (
                        <i className="mdi mdi-chart-bar"></i>
                    )}
                </TooltipButton>
                <TooltipButton
                    id="toggleFermentButton"
                    className="waves-effect m-0 mr-2 mb-1"
                    outline={true}
                    tooltipText={isOpen ? "Show Less" : "Show More"}
                    placement="bottom"
                    onClick={() => {
                        toggleIsOpen("ferment");
                    }}
                >
                    <i className="mdi mdi-arrow-up-down"></i>
                </TooltipButton>
                <Dropdown
                    isOpen={isOpenMoreDropdown}
                    toggle={() => setIsOpenMoreDropdown(!isOpenMoreDropdown)}
                    className="d-inline-block m-0"
                >
                    <DropdownToggle
                        tag="button"
                        className="waves-effect btn btn-outline-secondary mr-2 mb-1"
                        data-toggle="dropdown"
                    >
                        <i className="mdi mdi-dots-horizontal"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <StatusDropdownItems
                            mixture={fermentMixture}
                            stage={fermentStage}
                            startDisabled={
                                !!conditionMixture?.id || !!briteTankMixture?.id
                            }
                            setShowStageStart={setShowStageStart}
                            setShowStageComplete={setShowStageComplete}
                            setShowStageFailed={setShowStageFailed}
                        />
                        {fermentStage.status.id === 2 && (
                            <React.Fragment>
                                <DropdownItem
                                    disabled={
                                        !!conditionMixture?.id ||
                                        !!briteTankMixture?.id
                                    }
                                    onClick={() => {
                                        setShowInitConditionStage(true);
                                    }}
                                >
                                    <span className="text-dark">
                                        Move to Conditioner
                                    </span>
                                </DropdownItem>
                                <DropdownItem
                                    disabled={
                                        !!conditionMixture?.id ||
                                        !!briteTankMixture?.id
                                    }
                                    onClick={() => {
                                        setShowInitBritetankStage(true);
                                    }}
                                >
                                    <span className="text-dark">
                                        Move to Bite Tank
                                    </span>
                                </DropdownItem>
                            </React.Fragment>
                        )}
                        <DropdownItem
                            disabled={
                                !!conditionMixture?.id || !!briteTankMixture?.id
                            }
                            onClick={() => {
                                dispatch(deleteBatchMixture(fermentMixture));
                            }}
                        >
                            <span className="text-dark">Delete</span>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            {fermentStage && (
                <Card className="shadow-none m-0 p-0">
                    <StageHeader
                        title="Stage: Ferment"
                        toggleIsOpen={() => {
                            toggleIsOpen("ferment");
                        }}
                        toolbar={<Toolbar />}
                    />
                    <BatchStage {...stageProps}>
                        <Row>
                            <Col className="mb-3" sm={6}>
                                <StageIngredients
                                    lotPortions={materialPortions}
                                    chart={
                                        <IngredientsBar
                                            ingredients={materialPortions}
                                        />
                                    }
                                    toggleCharts={toggleCharts}
                                    title="Ingredients"
                                    noData="No Ingredients"
                                />
                            </Col>
                            <Col className="mb-3" sm={6}>
                                <StageRecordings
                                    recordings={temperatureRecordings}
                                    chart={
                                        <TemperatureLine
                                            recordings={temperatureRecordings}
                                        />
                                    }
                                    toggleCharts={toggleCharts}
                                    title="Temperature"
                                    noData="No Readings"
                                />
                            </Col>
                            <Col className="mb-3" sm={6}>
                                <StageRecordings
                                    recordings={phRecordings}
                                    chart={<PhLine recordings={phRecordings} />}
                                    toggleCharts={toggleCharts}
                                    title="Ph"
                                    noData="No Readings"
                                />
                            </Col>
                            <Col className="mb-3" sm={6}>
                                <StageRecordings
                                    recordings={gravityRecordings}
                                    chart={
                                        <GravityLine
                                            recordings={gravityRecordings}
                                        />
                                    }
                                    toggleCharts={toggleCharts}
                                    title="Gravity"
                                    noData="No Readings"
                                />
                            </Col>
                            <Col className="mb-3" sm={6}>
                                <StageRecordings
                                    recordings={abvRecordings}
                                    chart={
                                        <AbvLine recordings={abvRecordings} />
                                    }
                                    toggleCharts={toggleCharts}
                                    title="ABV"
                                    noData="No Readings"
                                />
                            </Col>
                            <Col sm="6">
                                <StageFinishedGoods
                                    finishedGoods={skuLots}
                                    chart={
                                        <FinishedGoodsBar skuLots={skuLots} />
                                    }
                                    toggleCharts={toggleCharts}
                                    title="Finished Goods"
                                    noData="No Finished Goods"
                                />
                            </Col>
                        </Row>
                    </BatchStage>
                </Card>
            )}
            {fermentStage && (
                <StageInitModal
                    show={showInitConditionStage}
                    setShow={setShowInitConditionStage}
                    title="Initialize Condition Stage"
                    addBatchStage={(equipmentItem) => {
                        dispatch(
                            addBatchStage({
                                parentMixtureIds: [fermentMixture.id],
                                taskId: 5,
                                statusId: 4,
                                equipment: equipmentItem,
                            })
                        );
                    }}
                />
            )}
            {fermentStage && (
                <StageInitModal
                    show={showInitBritetankStage}
                    setShow={setShowInitBritetankStage}
                    title="Initialize Brite Tank Stage"
                    addBatchStage={(equipmentItem) => {
                        dispatch(
                            addBatchStage({
                                parentMixtureIds: [fermentMixture.id],
                                taskId: 8,
                                statusId: 4,
                                equipment: equipmentItem,
                            })
                        );
                    }}
                />
            )}
        </React.Fragment>
    );
}
