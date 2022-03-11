import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";
import { addBrewStage, deleteBrewStage } from "../../../../store/actions";
import Ingredients from "../common/ingredients";
import Recordings from "../common/mixture-recordings";
import FinishedGoods from "../common/finished-goods";
import BatchStage from "../common/stage";

export default function BatchFerment({
    fermentMixture,
    conditionMixture,
    isOpen,
    toggleIsOpen,
}) {
    const [isOpenMoreDropdown, setIsOpenMoreDropdown] = useState(false);
    const dispatch = useDispatch();

    const batch = useSelector((state) => {
        return state.Batch.Batch.data;
    });

    const fermentStage = useSelector((state) => {
        return state.Batch.Stages.content.find(
            (s) => s.id === fermentMixture.brewStage.id
        );
    });

    const ingredientsProps = {
        mixture: fermentMixture,
    };

    const recordingsProps = {
        mixture: fermentMixture,
    };

    const finishedGoodsProps = {
        mixture: fermentMixture,
    };

    const stageProps = {
        title: "Ferment",
        stage: fermentStage,
        mixture: fermentMixture,
        isOpen,
        toggleIsOpen: () => {
            toggleIsOpen("ferment");
        },
        toolbar: (
            <React.Fragment>
                {!conditionMixture && (
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
                            <DropdownItem>
                                <span
                                    className="text-dark"
                                    onClick={() => {
                                        dispatch(
                                            addBrewStage({
                                                parentMixtureIds: [
                                                    fermentMixture.id,
                                                ],
                                                form: [
                                                    {
                                                        brewId: batch.id,
                                                        taskId: 5,
                                                        statusId: 4,
                                                        startedAt:
                                                            new Date().toISOString(),
                                                    },
                                                ],
                                            })
                                        );
                                    }}
                                >
                                    Move to Conditioner
                                </span>
                            </DropdownItem>
                            <DropdownItem>
                                <span
                                    className="text-dark"
                                    onClick={() => {
                                        dispatch(deleteBrewStage(fermentStage));
                                    }}
                                >
                                    Delete Mixture
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
            {fermentStage?.id && (
                <BatchStage {...stageProps}>
                    <div className="mb-3">
                        <Ingredients {...ingredientsProps} />
                    </div>
                    <div className="mb-3">
                        <Recordings {...recordingsProps} />
                    </div>
                    <div className="mb-3">
                        <FinishedGoods {...finishedGoodsProps} />
                    </div>
                </BatchStage>
            )}
        </React.Fragment>
    );
}
