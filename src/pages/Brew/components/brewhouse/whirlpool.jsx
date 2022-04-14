import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";
import { addBatchStage, deleteBatchMixture } from "../../../../store/actions";
import BatchIngredients from "../common/ingredients";
import MixtureRecordings from "../common/mixture-recordings";
import BatchStage from "../common/stage";

export default function BrewWhirlpool({
    whirlpoolMixture,
    transferMixture,
    isOpen,
    toggleIsOpen,
}) {
    const [isOpenMoreDropdown, setIsOpenMoreDropdown] = useState(false);
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
            [3, 4].includes(measure.id)
        );
    });

    const ingredientsProps = {
        mixture: whirlpoolMixture,
    };

    const recordingsProps = {
        measures,
        mixture: whirlpoolMixture,
    };

    const stageProps = {
        title: "Whirlpool",
        stage: whirlpoolStage,
        mixture: whirlpoolMixture,
        isOpen,
        toggleIsOpen: () => {
            toggleIsOpen("whirlpool");
        },
        toolbar: (
            <React.Fragment>
                <Dropdown
                    isOpen={isOpenMoreDropdown}
                    toggle={() => setIsOpenMoreDropdown(!isOpenMoreDropdown)}
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
                        <DropdownItem disabled={!!transferStage?.id}>
                            <span
                                className="text-dark"
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
                                Complete Brew
                            </span>
                        </DropdownItem>
                        <DropdownItem>
                            <span
                                className="text-dark"
                                onClick={() => {
                                    dispatch(
                                        deleteBatchMixture(whirlpoolMixture)
                                    );
                                }}
                            >
                                Delete Mixture
                            </span>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </React.Fragment>
        ),
    };

    return (
        <React.Fragment>
            {whirlpoolStage && (
                <BatchStage {...stageProps}>
                    <div className="clearfix mb-3">
                        <BatchIngredients {...ingredientsProps} />
                    </div>
                    <div className="mb-3">
                        <MixtureRecordings {...recordingsProps} />
                    </div>
                </BatchStage>
            )}
        </React.Fragment>
    );
}
