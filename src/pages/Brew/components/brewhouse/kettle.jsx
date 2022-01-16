import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";
import {
    saveFermentStage,
    saveWhirlpoolStage,
    setKettleMaterialPortionDetails,
    setKettleMixtureDetails,
    setKettleStageDetails,
} from "../../../../store/actions";
import Ingredients from "../common/ingredients";
import BatchStage from "../common/stage";

export default function BrewKettle(props) {
    const [isOpenMoreDropdown, setIsOpenMoreDropdown] = useState(false);
    const dispatch = useDispatch();

    const { data: batch, editable } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const {
        data: stage,
        initial: initialStage,
        loading: stageLoading,
        error: stageError,
    } = useSelector((state) => {
        return state.Batch.KettleStage;
    });

    const whirlpoolStage = useSelector((state) => {
        return state.Batch.WhirlpoolStage.data;
    });

    const fermentStage = useSelector((state) => {
        return state.Batch.FermentStage.data;
    });

    const {
        data: mixture,
        initial: initialMixture,
        loading: mixtureLoading,
        error: mixtureError,
    } = useSelector((state) => {
        return state.Batch.KettleMixture;
    });

    const {
        content: materialPortions,
        initial: initialMaterialPortions,
        loading: materialPortionsLoading,
        error: materialPortionsError,
    } = useSelector((state) => {
        return state.Batch.KettleMaterialPortion;
    });

    useEffect(() => {
        dispatch(
            setKettleStageDetails({
                changed: isChanged(),
            })
        );
        // eslint-disable-next-line
    }, [stage, mixture, materialPortions]);

    function isChanged() {
        return (
            JSON.stringify(initialStage) !== JSON.stringify(stage) ||
            JSON.stringify(initialMixture) !== JSON.stringify(mixture) ||
            JSON.stringify(initialMaterialPortions) !==
                JSON.stringify(materialPortions)
        );
    }

    function setStage(stage) {
        dispatch(
            setKettleStageDetails({
                data: stage,
            })
        );
    }

    function setMixture(mixture) {
        dispatch(
            setKettleMixtureDetails({
                data: mixture,
            })
        );
    }

    function setMaterialPortions(materialPortions) {
        dispatch(
            setKettleMaterialPortionDetails({
                content: materialPortions,
            })
        );
    }

    const ingredientsProps = {
        mixture,
        editable,
        materialPortions,
        setMaterialPortions,
    };

    const stageProps = {
        ...props,
        title: "Kettle",
        editable,
        setEditable: props.setEditable,
        initialStage,
        stage,
        setStage,
        stageLoading,
        mixture,
        setMixture,
        mixtureLoading,
        materialPortionsLoading,
        stageError,
        mixtureError,
        materialPortionsError,
        isOpen: props.isOpen,
        toggleIsOpen: () => {
            props.toggleIsOpen("kettle");
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
                        More <i className="fa fa-caret-down"></i>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem
                            disabled={!whirlpoolStage.id && !fermentStage.id}
                        >
                            <span
                                className="text-dark"
                                onClick={() => {
                                    dispatch(
                                        saveWhirlpoolStage({
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
                            disabled={!whirlpoolStage.id && !fermentStage.id}
                        >
                            <span
                                className="text-dark"
                                onClick={() => {
                                    dispatch(
                                        saveFermentStage({
                                            form: [
                                                {
                                                    brewId: batch.id,
                                                    taskId: 7,
                                                    statusId: 4,
                                                    startedAt:
                                                        new Date().toISOString(),
                                                },
                                            ],
                                        })
                                    );
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
            {stage.id && (
                <BatchStage {...stageProps}>
                    <div className="clearfix mb-3">
                        <Ingredients {...ingredientsProps} />
                    </div>
                </BatchStage>
            )}
        </React.Fragment>
    );
}
