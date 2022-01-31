import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";
import {
    addBrewStage,
    transferToFermentStage,
} from "../../../../store/actions";
import Ingredients from "../common/ingredients";
import BatchStage from "../common/stage";

export default function BrewKettle({
    kettleMixture,
    kettleStage,
    kettleMaterialPortions,
    whirlpoolStage,
    isOpen,
    toggleIsOpen,
}) {
    const [isOpenMoreDropdown, setIsOpenMoreDropdown] = useState(false);
    const dispatch = useDispatch();

    const { data: batch } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const fermentStage = useSelector((state) => {
        return state.Batch.FermentStage.data;
    });

    const ingredientsProps = {
        mixture: kettleMixture,
        materialPortions: kettleMaterialPortions,
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
                <Button
                    className="mr-2"
                    type="button"
                    color="secondary"
                    size="sm"
                    outline={true}
                    onClick={() => {}}
                >
                    Ingredients
                </Button>
                <Button
                    className="mr-2"
                    type="button"
                    color="secondary"
                    size="sm"
                    outline={true}
                    onClick={() => {}}
                >
                    Temperature
                </Button>
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
                        <DropdownItem
                            disabled={
                                !!whirlpoolStage?.id || !!fermentStage?.id
                            }
                        >
                            <span
                                className="text-dark"
                                onClick={() => {
                                    dispatch(
                                        addBrewStage({
                                            parentMixtureIds: [
                                                kettleMixture.id,
                                            ],
                                            form: [
                                                {
                                                    brewId: batch.id,
                                                    taskId: 3,
                                                    statusId: 4,
                                                    startedAt:
                                                        new Date().toISOString(),
                                                },
                                            ],
                                        })
                                    );
                                }}
                            >
                                Move to Whirlpool
                            </span>
                        </DropdownItem>
                        <DropdownItem
                            disabled={
                                !!whirlpoolStage?.id || !!fermentStage?.id
                            }
                        >
                            <span
                                className="text-dark"
                                onClick={() => {
                                    dispatch(transferToFermentStage());
                                }}
                            >
                                Move to Fermenter
                            </span>
                        </DropdownItem>
                        <DropdownItem>
                            <span className="text-dark">Delete Mixture</span>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </React.Fragment>
        ),
    };

    return (
        <React.Fragment>
            {kettleStage?.id && (
                <BatchStage {...stageProps}>
                    <div className="clearfix mb-3">
                        <Ingredients {...ingredientsProps} />
                    </div>
                </BatchStage>
            )}
        </React.Fragment>
    );
}
