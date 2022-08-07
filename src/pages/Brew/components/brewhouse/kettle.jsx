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
import {
    GravityLine,
    IngredientsBar,
    PhLine,
    TemperatureLine,
} from "../common/charts";
import BatchStage, { StageHeader } from "../common/stage";
import StageIngredients from "../common/stage-ingredients";
import StageInitModal from "../common/stage-init-modal";
import StageRecordings from "../common/stage-recordings";
import StatusDropdownItems from "../common/stage-status-dropdown";

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
    useState(false);
    const [showInitWhirlpoolStage, setShowInitWhirlpoolStage] = useState(false);
    const [showStageStart, setShowStageStart] = useState(false);
    const [showStageComplete, setShowStageComplete] = useState(false);
    const [showStageFailed, setShowStageFailed] = useState(false);
    const [toggleCharts, setToggleCharts] = useState(false);
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

    const maltPortions = useSelector((state) => {
        return state.Batch.MaterialPortions.initial.filter(
            (mp) =>
                mp.mixture.id === kettleMixture.id &&
                mp.materialLot.invoiceItem.material.category?.name === "Malt"
        );
    });

    const hopPortions = useSelector((state) => {
        return state.Batch.MaterialPortions.initial.filter(
            (mp) =>
                mp.mixture.id === kettleMixture.id &&
                mp.materialLot.invoiceItem.material.category?.name === "Hop"
        );
    });

    const otherPortions = useSelector((state) => {
        return state.Batch.MaterialPortions.initial.filter(
            (mp) =>
                mp.mixture.id === kettleMixture.id &&
                mp.materialLot.invoiceItem.material.category?.name !== "Malt" &&
                mp.materialLot.invoiceItem.material.category?.name !== "Hop"
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
        mixture: kettleMixture,
        stage: kettleStage,
        isShowEditStage,
        setIsShowEditStage,
        isShowIngredients,
        setIsShowIngredients,
        isShowMixtureRecordings,
        setIsShowMixtureRecordings,
        showStageStart,
        setShowStageStart,
        showStageComplete,
        setShowStageComplete,
        showStageFailed,
        setShowStageFailed,
        measures,
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
                    outline={true}
                    tooltipText="Recordings"
                    placement="bottom"
                    onClick={() => setIsShowMixtureRecordings(true)}
                >
                    <i className="mdi mdi-clipboard-outline"></i>
                </TooltipButton>
                <TooltipButton
                    id="chartsKettleButton"
                    className="waves-effect m-0 mr-1 mb-1"
                    outline={true}
                    tooltipText={toggleCharts ? "Hide Charts" : "Show Charts"}
                    placement="bottom"
                    onClick={() => {
                        setToggleCharts(!toggleCharts);
                        toggleIsOpen("kettle", true);
                    }}
                >
                    {toggleCharts ? (
                        <i className="mdi mdi-table"></i>
                    ) : (
                        <i className="mdi mdi-chart-bar"></i>
                    )}
                </TooltipButton>
                <TooltipButton
                    id="toggleKettleButton"
                    className="waves-effect m-0 mr-1 mb-1"
                    outline={true}
                    tooltipText={isOpen ? "Show Less" : "Show More"}
                    placement="bottom"
                    onClick={() => {
                        toggleIsOpen("kettle");
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
                        className="waves-effect btn btn-outline-secondary btn-sm mr-1 mb-1"
                        data-toggle="dropdown"
                    >
                        <i className="mdi mdi-dots-horizontal"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <StatusDropdownItems
                            mixture={kettleMixture}
                            stage={kettleStage}
                            startDisabled={
                                !!whirlpoolMixture?.id || !!transferMixture?.id
                            }
                            setShowStageStart={setShowStageStart}
                            setShowStageComplete={setShowStageComplete}
                            setShowStageFailed={setShowStageFailed}
                        />
                        {kettleStage.status.id === 2 && (
                            <DropdownItem
                                disabled={
                                    !!whirlpoolMixture?.id ||
                                    !!transferMixture?.id
                                }
                                onClick={() => {
                                    setShowInitWhirlpoolStage(true);
                                }}
                            >
                                <span className="text-dark">
                                    Move to Whirlpool
                                </span>
                            </DropdownItem>
                        )}
                        {kettleStage.status.id === 2 && (
                            <DropdownItem
                                disabled={
                                    !!whirlpoolMixture?.id ||
                                    !!transferMixture?.id
                                }
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
                                <span className="text-dark">Transfer</span>
                            </DropdownItem>
                        )}
                        <DropdownItem
                            disabled={
                                !!whirlpoolMixture?.id || !!transferMixture?.id
                            }
                            onClick={() => {
                                dispatch(deleteBatchMixture(kettleMixture));
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
                                    chart={
                                        <IngredientsBar
                                            ingredients={maltPortions}
                                        />
                                    }
                                    toggleCharts={toggleCharts}
                                    title="Malt"
                                    noData="No Malt"
                                />
                            </Col>
                            <Col className="mb-3" sm={6}>
                                <StageIngredients
                                    lotPortions={hopPortions}
                                    chart={
                                        <IngredientsBar
                                            ingredients={hopPortions}
                                        />
                                    }
                                    toggleCharts={toggleCharts}
                                    title="Hops"
                                    noData="No Hops"
                                />
                            </Col>
                            <Col className="mb-3" sm={6}>
                                <StageIngredients
                                    lotPortions={otherPortions}
                                    chart={
                                        <IngredientsBar
                                            ingredients={otherPortions}
                                        />
                                    }
                                    toggleCharts={toggleCharts}
                                    title="Other Ingredients"
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
                        </Row>
                    </BatchStage>
                </Card>
            )}
            {kettleStage && (
                <StageInitModal
                    show={showInitWhirlpoolStage}
                    setShow={setShowInitWhirlpoolStage}
                    title="Initialize Whirlpool Stage"
                    addBatchStage={(equipmentItem) => {
                        dispatch(
                            addBatchStage({
                                parentMixtureIds: [kettleMixture.id],
                                taskId: 3,
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
