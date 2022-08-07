import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";
import { Card } from "../../../../component/Common/Card";
import TooltipButton from "../../../../component/Common/tooltip-button";
import { addBatchStage, deleteBatchMixture } from "../../../../store/actions";
import BatchStage, { StageHeader, StageModal } from "../common/stage";
import StageInitModal from "../common/stage-init-modal";

export default function BrewTransfer({
    isOpen,
    transferMixture,
    fermentMixture,
}) {
    const [isOpenMoreDropdown, setIsOpenMoreDropdown] = useState(false);
    const [isShowEditStage, setIsShowEditStage] = useState(false);
    const [showInitStage, setShowInitStage] = useState(false);
    const dispatch = useDispatch();

    const transferStage = useSelector((state) => {
        return (
            transferMixture &&
            state.Batch.Stages.content.find(
                (s) => s.id === transferMixture.brewStage.id
            )
        );
    });

    const fermentStage = useSelector((state) => {
        return (
            fermentMixture &&
            state.Batch.Stages.content.find(
                (s) => s.id === fermentMixture.brewStage.id
            )
        );
    });

    const stageProps = {
        isOpen,
        stage: transferStage,
        mixture: transferMixture,
    };

    const modalProps = {
        mixture: transferMixture,
        afterSave: () => {},
    };

    function Toolbar() {
        return (
            <React.Fragment>
                <TooltipButton
                    id="editTransferButton"
                    className="waves-effect mr-1 mb-1"
                    outline={true}
                    tooltipText="Edit Stage"
                    placement="bottom"
                    onClick={() => setIsShowEditStage(true)}
                >
                    <i className="mdi mdi-pencil"></i>
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
                            disabled={!!fermentStage?.id}
                            onClick={() => {
                                setShowInitStage(true);
                            }}
                        >
                            <span className="text-dark">Move to Fermentor</span>
                        </DropdownItem>
                        <DropdownItem
                            disabled={!!fermentStage?.id}
                            onClick={() => {
                                dispatch(deleteBatchMixture(transferMixture));
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
            {transferStage && (
                <Card className="shadow-none m-0 p-0">
                    <StageHeader
                        title="Transfer: Details"
                        toolbar={<Toolbar />}
                    />
                    <BatchStage {...stageProps} />
                </Card>
            )}
            {transferStage && (
                <StageModal
                    show={isShowEditStage}
                    setShow={setIsShowEditStage}
                    stage={transferStage}
                    title={"Edit Details: Transfer"}
                    {...modalProps}
                />
            )}
            {transferStage && (
                <StageInitModal
                    show={showInitStage}
                    setShow={setShowInitStage}
                    title="Initialize Ferment Stage"
                    addBatchStage={(equipmentItem) => {
                        dispatch(
                            addBatchStage({
                                parentMixtureIds: [transferMixture.id],
                                taskId: 7, // ferment
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
