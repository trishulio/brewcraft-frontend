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

export default function BatchFerment({
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

    const finishedGoods = useSelector((state) => {
        return state.Batch.BatchFinishedGoods.content.filter(
            (fg) => fg.mixturePortions[0].mixture.id === fermentMixture.id
        );
    });

    const stageProps = {
        isOpen,
        stage: fermentStage,
        mixture: fermentMixture,
    };

    const modalProps = {
        mixture: fermentMixture,
        afterSave: () => {
            toggleIsOpen("ferment", true);
        },
    };

    function Toolbar() {
        return (
            <React.Fragment>
                <TooltipButton
                    id="editFermentButton"
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
                    id="ingredientsFermentButton"
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
                    id="recordingsFermentButton"
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
                    id="finishedGoodsFermentButton"
                    className="waves-effect m-0 mr-1 mb-1"
                    size="sm"
                    outline={true}
                    tooltipText="Finished Goods"
                    placement="bottom"
                    onClick={() => setIsShowFinishedGoods(true)}
                >
                    <i className="mdi mdi-beer"></i>
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
                            stage={fermentStage}
                            startDisabled={
                                !!conditionMixture?.id || !!briteTankMixture?.id
                            }
                        />
                        {fermentStage.status.id === 2 && (
                            <React.Fragment>
                                <DropdownItem
                                    disabled={
                                        !!conditionMixture?.id ||
                                        !!briteTankMixture?.id
                                    }
                                    onClick={() => {
                                        dispatch(
                                            addBatchStage({
                                                parentMixtureIds: [
                                                    fermentMixture.id,
                                                ],
                                                taskId: 5,
                                                statusId: 4,
                                            })
                                        );
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
                                        dispatch(
                                            addBatchStage({
                                                parentMixtureIds: [
                                                    fermentMixture.id,
                                                ],
                                                taskId: 8,
                                                statusId: 4,
                                            })
                                        );
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
                                    title="Ingredients"
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
                            <Col sm="6">
                                <StageFinishedGoods
                                    finishedGoods={finishedGoods}
                                    title="Finished Goods"
                                    noData="No Finished Goods"
                                />
                            </Col>
                        </Row>
                    </BatchStage>
                </Card>
            )}
            {fermentStage && (
                <StageModal
                    show={isShowEditStage}
                    setShow={setIsShowEditStage}
                    stage={fermentStage}
                    title={"Edit Stage: Ferment"}
                    {...modalProps}
                />
            )}
            {fermentStage && (
                <BatchIngredientsModal
                    show={isShowIngredients}
                    setShow={setIsShowIngredients}
                    {...modalProps}
                />
            )}
            {fermentStage && (
                <MixtureRecordingsModal
                    show={isShowMixtureRecordings}
                    setShow={setIsShowMixtureRecordings}
                    measures={measures}
                    {...modalProps}
                />
            )}
            {fermentStage && (
                <FinishedGoodsModal
                    show={isShowFinishedGoods}
                    setShow={setIsShowFinishedGoods}
                    {...modalProps}
                />
            )}
        </React.Fragment>
    );
}
