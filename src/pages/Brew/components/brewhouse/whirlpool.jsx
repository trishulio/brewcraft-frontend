import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
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
import StageRecordings from "../common/stage-recordings";
import StatusDropdownItems from "../common/stage-status-dropdown";

export default function BrewWhirlpool({
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
    const [showStageStart, setShowStageStart] = useState(false);
    const [showStageComplete, setShowStageComplete] = useState(false);
    const [showStageFailed, setShowStageFailed] = useState(false);
    const [toggleCharts, setToggleCharts] = useState(false);
    const dispatch = useDispatch();

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

    const measures = useSelector((state) => {
        return state.Measures.data.filter((measure) =>
            [3, 4, 5].includes(measure.id)
        );
    });

    const materialPortions = useSelector((state) => {
        return state.Batch.MaterialPortions.initial.filter(
            (mp) => mp.mixture.id === whirlpoolMixture.id
        );
    });

    const phRecordings = useSelector((state) => {
        return state.Batch.MixtureRecordings.initial.filter(
            (mr) => mr.mixture.id === whirlpoolMixture.id && mr.measure.id === 3
        );
    });

    const temperatureRecordings = useSelector((state) => {
        return state.Batch.MixtureRecordings.initial.filter(
            (mr) => mr.mixture.id === whirlpoolMixture.id && mr.measure.id === 4
        );
    });

    const gravityRecordings = useSelector((state) => {
        return state.Batch.MixtureRecordings.initial.filter(
            (mr) => mr.mixture.id === whirlpoolMixture.id && mr.measure.id === 5
        );
    });

    const stageProps = {
        isOpen,
        mixture: whirlpoolMixture,
        stage: whirlpoolStage,
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
            toggleIsOpen("whirlpool", true);
        },
    };

    function Toolbar() {
        return (
            <React.Fragment>
                <TooltipButton
                    id="editWhirlpoolButton"
                    className="waves-effect mr-1 mb-1"
                    outline={true}
                    tooltipText="Edit Stage"
                    placement="bottom"
                    onClick={() => setIsShowEditStage(true)}
                >
                    <i className="mdi mdi-pencil"></i>
                </TooltipButton>
                <TooltipButton
                    id="ingredientsWhirlpoolButton"
                    className="waves-effect m-0 mr-1 mb-1"
                    outline={true}
                    tooltipText="Ingredients"
                    placement="bottom"
                    onClick={() => setIsShowIngredients(true)}
                >
                    <i className="mdi mdi-barley"></i>
                </TooltipButton>
                <TooltipButton
                    id="recordingsWhirlpoolButton"
                    className="waves-effect m-0 mr-1 mb-1"
                    outline={true}
                    tooltipText="Recordings"
                    placement="bottom"
                    onClick={() => setIsShowMixtureRecordings(true)}
                >
                    <i className="mdi mdi-clipboard-outline"></i>
                </TooltipButton>
                <TooltipButton
                    id="chartsWhirlpoolButton"
                    className="waves-effect m-0 mr-1 mb-1"
                    outline={true}
                    tooltipText={toggleCharts ? "Hide Charts" : "Show Charts"}
                    placement="bottom"
                    onClick={() => {
                        setToggleCharts(!toggleCharts);
                        toggleIsOpen("whirlpool", true);
                    }}
                >
                    {toggleCharts ? (
                        <i className="mdi mdi-table"></i>
                    ) : (
                        <i className="mdi mdi-chart-bar"></i>
                    )}
                </TooltipButton>
                <TooltipButton
                    id="toggleWhirlpoolButton"
                    className="waves-effect m-0 mr-1 mb-1"
                    outline={true}
                    tooltipText={isOpen ? "Show Less" : "Show More"}
                    placement="bottom"
                    onClick={() => {
                        toggleIsOpen("whirlpool");
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
                            mixture={whirlpoolMixture}
                            stage={whirlpoolStage}
                            startDisabled={!!transferStage?.id}
                            setShowStageStart={setShowStageStart}
                            setShowStageComplete={setShowStageComplete}
                            setShowStageFailed={setShowStageFailed}
                        />
                        {whirlpoolStage.status.id === 2 && (
                            <DropdownItem
                                disabled={!!transferStage?.id}
                                onClick={() => {
                                    dispatch(
                                        addBatchStage({
                                            parentMixtureIds: [
                                                whirlpoolMixture.id,
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
                            disabled={!!transferStage?.id}
                            onClick={() => {
                                dispatch(deleteBatchMixture(whirlpoolMixture));
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
            {whirlpoolStage && (
                <Card className="shadow-none m-0 p-0">
                    <StageHeader
                        title="Stage: Whirlpool"
                        toggleIsOpen={() => {
                            toggleIsOpen("whirlpool");
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
                        </Row>
                    </BatchStage>
                </Card>
            )}
        </React.Fragment>
    );
}
