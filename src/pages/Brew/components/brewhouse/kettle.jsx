import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";
import { addBatchStage, deleteBatchMixture } from "../../../../store/actions";
import Ingredients from "../common/ingredients";
import MixtureRecordings from "../common/mixture-recordings";
import BatchStage from "../common/stage";

export default function BrewKettle({
    kettleMixture,
    whirlpoolMixture,
    transferMixture,
    isOpen,
    toggleIsOpen,
}) {
    const [isOpenMoreDropdown, setIsOpenMoreDropdown] = useState(false);
    const dispatch = useDispatch();

    const measures = useSelector((state) => {
        return state.Measures.data.filter((measure) =>
            [3, 4].includes(measure.id)
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

    const ingredientsProps = {
        mixture: kettleMixture,
    };

    const recordingsProps = {
        measures,
        mixture: kettleMixture,
    };

    const stageProps = {
        title: "Kettle",
        stage: kettleStage,
        mixture: kettleMixture,
        isOpen,
        toggleIsOpen: () => {
            toggleIsOpen("kettle");
        },
        toolbar: (
            <React.Fragment>
                {!whirlpoolMixture?.id && !transferMixture?.id && (
                    <Dropdown
                        isOpen={isOpenMoreDropdown}
                        toggle={() =>
                            setIsOpenMoreDropdown(!isOpenMoreDropdown)
                        }
                        className="d-inline-block mr-2"
                    >
                        <DropdownToggle
                            tag="button"
                            className="waves-effect btn btn-outline-secondary btn-sm"
                            data-toggle="dropdown"
                        >
                            Mixture <i className="fa fa-caret-down"></i>
                        </DropdownToggle>
                        <DropdownMenu>
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
                            <DropdownItem>
                                <span
                                    className="text-dark"
                                    onClick={() => {
                                        dispatch(
                                            deleteBatchMixture(kettleMixture)
                                        );
                                    }}
                                >
                                    Delete
                                </span>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                )}
            </React.Fragment>
        ),
    };

    return (
        <React.Fragment>
            {kettleStage && (
                <BatchStage {...stageProps}>
                    <div className="clearfix mb-3">
                        <Ingredients {...ingredientsProps} />
                    </div>
                    <div className="mb-3">
                        <MixtureRecordings {...recordingsProps} />
                    </div>
                </BatchStage>
            )}
        </React.Fragment>
    );
}
