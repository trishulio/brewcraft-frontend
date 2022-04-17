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
import BatchStage, { StageHeader, StageModal } from "../common/stage";
import { MixtureRecordingsModal } from "../common/mixture-recordings";
import TooltipButton from "../../../../component/Common/tooltip-button";
import { Card } from "../../../../component/Common/Card";
import StageIngredients from "../common/stage-ingredients";
import StageRecordings from "../common/stage-recordings";
import StatusDropdownItems from "../common/stage-status-dropdown";

export default function BrewMash({
    mashMixture,
    kettleMixture,
    isOpen,
    toggleIsOpen,
}) {
    const [isOpenMoreDropdown, setIsOpenMoreDropdown] = useState(false);
    const [isShowEditStage, setIsShowEditStage] = useState(false);
    const [isShowIngredients, setIsShowIngredients] = useState(false);
    const [isShowMixtureRecordings, setIsShowMixtureRecordings] =
        useState(false);
    const dispatch = useDispatch();

    const mashStage = useSelector((state) => {
        return state.Batch.Stages.content.find(
            (s) => s.id === mashMixture.brewStage.id
        );
    });

    const measures = useSelector((state) => {
        return state.Measures.data.filter((measure) =>
            [3, 4, 5].includes(measure.id)
        );
    });

    const maltPortions = useSelector((state) => {
        return state.Batch.MaterialPortions.initial.filter(
            (mp) =>
                mp.mixture.id === mashMixture.id &&
                mp.materialLot.invoiceItem.material.category.name === "Malt"
        );
    });

    const hopPortions = useSelector((state) => {
        return state.Batch.MaterialPortions.initial.filter(
            (mp) =>
                mp.mixture.id === mashMixture.id &&
                mp.materialLot.invoiceItem.material.category.name === "Hop"
        );
    });

    const otherPortions = useSelector((state) => {
        return state.Batch.MaterialPortions.initial.filter(
            (mp) =>
                mp.mixture.id === mashMixture.id &&
                mp.materialLot.invoiceItem.material.category.name !== "Malt" &&
                mp.materialLot.invoiceItem.material.category.name !== "Hop"
        );
    });

    const phRecordings = useSelector((state) => {
        return state.Batch.MixtureRecordings.initial.filter(
            (mr) => mr.mixture.id === mashMixture.id && mr.measure.id === 3
        );
    });

    const temperatureRecordings = useSelector((state) => {
        return state.Batch.MixtureRecordings.initial.filter(
            (mr) => mr.mixture.id === mashMixture.id && mr.measure.id === 4
        );
    });

    const gravityRecordings = useSelector((state) => {
        return state.Batch.MixtureRecordings.initial.filter(
            (mr) => mr.mixture.id === mashMixture.id && mr.measure.id === 5
        );
    });

    const stageProps = {
        isOpen,
        stage: mashStage,
        mixture: mashMixture,
    };

    const modalProps = {
        mixture: mashMixture,
        afterSave: () => {
            toggleIsOpen("mash", true);
        },
    };

    function Toolbar() {
        return (
            <React.Fragment>
                <TooltipButton
                    id="editMashButton"
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
                    id="ingredientsMashButton"
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
                    id="recordingsMashButton"
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
                        <StatusDropdownItems
                            stage={mashStage}
                            startDisabled={!!kettleMixture?.id}
                        />
                        {mashStage.status.id === 2 && (
                            <DropdownItem
                                disabled={!!kettleMixture?.id}
                                onClick={() => {
                                    dispatch(
                                        addBatchStage({
                                            parentMixtureIds: [mashMixture.id],
                                            taskId: 2,
                                            statusId: 4,
                                        })
                                    );
                                }}
                            >
                                <span className="text-dark">
                                    Move to Kettle
                                </span>
                            </DropdownItem>
                        )}
                        <DropdownItem
                            disabled={!!kettleMixture?.id}
                            onClick={() => {
                                dispatch(deleteBatchMixture(mashMixture));
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
            {mashStage && (
                <Card className="shadow-none m-0 p-0">
                    <StageHeader
                        title="Stage: Mash Lauter"
                        toggleIsOpen={() => {
                            toggleIsOpen("mash");
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
            {mashStage && (
                <StageModal
                    show={isShowEditStage}
                    setShow={setIsShowEditStage}
                    stage={mashStage}
                    title={"Edit Stage: Mash lauter"}
                    {...modalProps}
                />
            )}
            {mashStage && (
                <BatchIngredientsModal
                    show={isShowIngredients}
                    setShow={setIsShowIngredients}
                    {...modalProps}
                />
            )}
            {mashStage && (
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
