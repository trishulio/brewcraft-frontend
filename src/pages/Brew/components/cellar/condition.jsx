import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";
import { addBatchStage, deleteBrewStage } from "../../../../store/actions";
import Ingredients from "../common/ingredients";
import Recordings from "../common/mixture-recordings";
import FinishedGoods from "../common/finished-goods";
import BatchStage from "../common/stage";

export default function BatchCondition({
    conditionMixture,
    briteTankMixture,
    isOpen,
    toggleIsOpen,
}) {
    const [isOpenMoreDropdown, setIsOpenMoreDropdown] = useState(false);
    const dispatch = useDispatch();

    const conditionStage = useSelector((state) => {
        return state.Batch.Stages.content.find(
            (s) => s.id === conditionMixture.brewStage.id
        );
    });

    const measures = useSelector((state) => {
        return state.Measures.data.filter((measure) =>
            [3, 4, 5].includes(measure.id)
        );
    });

    const ingredientsProps = {
        mixture: conditionMixture,
    };

    const recordingsProps = {
        measures,
        mixture: conditionMixture,
    };

    const finishedGoodsProps = {
        mixture: conditionMixture,
    };

    const stageProps = {
        title: "Condition",
        stage: conditionStage,
        mixture: conditionMixture,
        isOpen,
        toggleIsOpen: () => {
            toggleIsOpen("condition");
        },
        toolbar: (
            <React.Fragment>
                {!briteTankMixture && (
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
                                            addBatchStage({
                                                parentMixtureIds: [
                                                    conditionMixture.id,
                                                ],
                                                taskId: 8,
                                                statusId: 4,
                                            })
                                        );
                                    }}
                                >
                                    Move to Bite Tank
                                </span>
                            </DropdownItem>
                            <DropdownItem>
                                <span
                                    className="text-dark"
                                    onClick={() => {
                                        dispatch(
                                            deleteBrewStage(conditionStage)
                                        );
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
            {conditionStage?.id && (
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
