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
import { deleteBatchMixture } from "../../../../store/actions";
import { BatchIngredientsModal } from "../common/ingredients";
import { MixtureRecordingsModal } from "../common/mixture-recordings";
import { FinishedGoodsModal } from "../common/finished-goods";
import BatchStage, { StageHeader, StageModal } from "../common/stage";
import { Card } from "../../../../component/Common/Card";
import TooltipButton from "../../../../component/Common/tooltip-button";
import StageIngredients from "../common/stage-ingredients";
import StageRecordings from "../common/stage-recordings";
import StageFinishedGoods from "../common/stage-finished-goods";
import StatusDropdownItems from "../common/stage-status-dropdown";
import {
    FinishedGoodsBar,
    GravityLine,
    PhLine,
    TemperatureLine,
} from "../common/charts";

export default function BatchBriteTank({
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
    const [toggleCharts, setToggleCharts] = useState(false);
    const dispatch = useDispatch();

    const briteTankStage = useSelector((state) => {
        return state.Batch.Stages.content.find(
            (s) => s.id === briteTankMixture.brewStage.id
        );
    });

    const measures = useSelector((state) => {
        return state.Measures.data.filter((measure) =>
            [3, 4, 5].includes(measure.id)
        );
    });

    const materialPortions = useSelector((state) => {
        return state.Batch.MaterialPortions.initial.filter(
            (mp) => mp.mixture.id === briteTankMixture.id
        );
    });

    const phRecordings = useSelector((state) => {
        return state.Batch.MixtureRecordings.initial.filter(
            (mr) => mr.mixture.id === briteTankMixture.id && mr.measure.id === 3
        );
    });

    const temperatureRecordings = useSelector((state) => {
        return state.Batch.MixtureRecordings.initial.filter(
            (mr) => mr.mixture.id === briteTankMixture.id && mr.measure.id === 4
        );
    });

    const gravityRecordings = useSelector((state) => {
        return state.Batch.MixtureRecordings.initial.filter(
            (mr) => mr.mixture.id === briteTankMixture.id && mr.measure.id === 5
        );
    });

    const skuLots = useSelector((state) => {
        return state.Batch.BatchFinishedGoods.content.filter(
            (fg) => fg.mixturePortions[0].mixture.id === briteTankMixture.id
        );
    });

    const stageProps = {
        isOpen,
        stage: briteTankStage,
        mixture: briteTankMixture,
    };

    const modalProps = {
        mixture: briteTankMixture,
        afterSave: () => {
            toggleIsOpen("britetank", true);
        },
    };

    function Toolbar() {
        return (
            <React.Fragment>
                <TooltipButton
                    id="editBriteTankButton"
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
                    id="ingredientsBriteTankButton"
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
                    id="recordingsBriteTankButton"
                    className="waves-effect m-0 mr-1 mb-1"
                    size="sm"
                    outline={true}
                    tooltipText="Recordings"
                    placement="bottom"
                    onClick={() => setIsShowMixtureRecordings(true)}
                >
                    <i className="mdi mdi-clipboard-outline"></i>
                </TooltipButton>
                <TooltipButton
                    id="finishedGoodsBriteTankButton"
                    className="waves-effect m-0 mr-1 mb-1"
                    size="sm"
                    outline={true}
                    tooltipText="Finished Goods"
                    placement="bottom"
                    onClick={() => setIsShowFinishedGoods(true)}
                >
                    <i className="mdi mdi-beer"></i>
                </TooltipButton>
                <TooltipButton
                    id="chartsBriteTankButton"
                    className="waves-effect m-0 mr-1 mb-1"
                    size="sm"
                    outline={true}
                    tooltipText={toggleCharts ? "Hide Charts" : "Show Charts"}
                    placement="bottom"
                    onClick={() => {
                        setToggleCharts(!toggleCharts);
                        toggleIsOpen("britetank", true);
                    }}
                >
                    {toggleCharts ? (
                        <i className="mdi mdi-table"></i>
                    ) : (
                        <i className="mdi mdi-chart-bar"></i>
                    )}
                </TooltipButton>
                <TooltipButton
                    id="toggleBriteTankButton"
                    className="waves-effect m-0 mr-1 mb-1"
                    size="sm"
                    outline={true}
                    tooltipText={isOpen ? "Show Less" : "Show More"}
                    placement="bottom"
                    onClick={() => {
                        toggleIsOpen("britetank");
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
                        <StatusDropdownItems stage={briteTankStage} />
                        <DropdownItem>
                            <span
                                className="text-dark"
                                onClick={() => {
                                    dispatch(
                                        deleteBatchMixture(briteTankMixture)
                                    );
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
            {briteTankStage && (
                <Card className="shadow-none m-0 p-0">
                    <StageHeader
                        title="Stage: Brite Tank"
                        toggleIsOpen={() => {
                            toggleIsOpen("britetank");
                        }}
                        toolbar={<Toolbar />}
                    />
                    <BatchStage {...stageProps}>
                        <Row>
                            <Col className="mb-3" sm={6}>
                                <StageIngredients
                                    lotPortions={materialPortions}
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
            {briteTankStage && (
                <StageModal
                    show={isShowEditStage}
                    setShow={setIsShowEditStage}
                    stage={briteTankStage}
                    title={"Edit Stage: Brite Tank"}
                    {...modalProps}
                />
            )}
            {briteTankStage && (
                <BatchIngredientsModal
                    show={isShowIngredients}
                    setShow={setIsShowIngredients}
                    {...modalProps}
                />
            )}
            {briteTankStage && (
                <MixtureRecordingsModal
                    show={isShowMixtureRecordings}
                    setShow={setIsShowMixtureRecordings}
                    measures={measures}
                    {...modalProps}
                />
            )}
            {briteTankStage && (
                <FinishedGoodsModal
                    show={isShowFinishedGoods}
                    setShow={setIsShowFinishedGoods}
                    {...modalProps}
                />
            )}
        </React.Fragment>
    );
}
