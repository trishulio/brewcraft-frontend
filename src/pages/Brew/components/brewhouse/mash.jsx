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
    saveKettleStage,
    setMashMaterialPortionDetails,
    setMashMixtureDetails,
    setMashStageDetails,
} from "../../../../store/actions";
import Ingredients from "../common/ingredients";
import BatchStage from "../common/stage";

export default function BrewMash(props) {
    const [isOpenMoreDropdown, setIsOpenMoreDropdown] = useState(false);
    const dispatch = useDispatch();

    const { data: batch, editable } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const {
        data: stage,
        initial: initialStage,
        loading: stageLoading,
        stageError,
    } = useSelector((state) => {
        return state.Batch.MashStage;
    });

    const { data: kettleStage } = useSelector((state) => {
        return state.Batch.KettleStage;
    });

    const {
        data: mixture,
        initial: initialMixture,
        loading: mixtureLoading,
        error: mixtureError,
    } = useSelector((state) => {
        return state.Batch.MashMixture;
    });

    const {
        content: materialPortions,
        initial: initialMaterialPortions,
        loading: materialPortionsLoading,
        error: materialPortionsError,
    } = useSelector((state) => {
        return state.Batch.MashMaterialPortion;
    });

    useEffect(() => {
        dispatch(
            setMashStageDetails({
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
            setMashStageDetails({
                data: stage,
            })
        );
    }

    function setMixture(mixture) {
        dispatch(
            setMashMixtureDetails({
                data: mixture,
            })
        );
    }

    function setMaterialPortions(materialPortions) {
        dispatch(
            setMashMaterialPortionDetails({
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
        title: "Mash Lauter",
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
            props.toggleIsOpen("mash");
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
                        <DropdownItem disabled={!!kettleStage.id}>
                            <span
                                className="text-dark"
                                onClick={() => {
                                    dispatch(
                                        saveKettleStage({
                                            form: [
                                                {
                                                    brewId: batch.id,
                                                    taskId: 2,
                                                    statusId: 4,
                                                    startedAt:
                                                        new Date().toISOString(),
                                                },
                                            ],
                                        })
                                    );
                                }}
                            >
                                Move to Kettle
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
                    <div className="mb-3">
                        <Ingredients {...ingredientsProps} />
                    </div>
                </BatchStage>
            )}
        </React.Fragment>
    );
}
