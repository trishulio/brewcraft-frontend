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
    addBrewStage,
    setBrewMixtureDetails,
    setBrewStageDetails,
    setKettleMaterialPortionDetails,
    setKettleStageDetails,
} from "../../../../store/actions";
import Ingredients from "../common/ingredients";
import BatchStage from "../common/stage";

export default function BrewKettle({
    kettleMixture,
    kettleStage,
    whirlpoolStage,
    isOpen,
    toggleIsOpen,
}) {
    const [isOpenMoreDropdown, setIsOpenMoreDropdown] = useState(false);
    const dispatch = useDispatch();

    const { data: batch } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const mixtures = useSelector((state) => {
        return state.Batch.Mixtures.content;
    });

    const initialMixture = useSelector((state) => {
        return (
            kettleMixture &&
            state.Batch.Mixtures.initial.filter(
                (m) => m.id === kettleMixture.id
            )
        );
    });

    const { loading: mixtureLoading, error: mixtureError } = useSelector(
        (state) => {
            return state.Batch.KettleMixture;
        }
    );

    const stages = useSelector((state) => {
        return state.Batch.Stages.content;
    });

    const initialStage = useSelector((state) => {
        return (
            kettleStage &&
            state.Batch.Stages.initial.find((s) => s.id === kettleStage.id)
        );
    });

    const { loading: stageLoading, error: stageError } = useSelector(
        (state) => {
            return state.Batch.KettleStage;
        }
    );

    const fermentStage = useSelector((state) => {
        return state.Batch.FermentStage.data;
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
    }, [kettleStage, kettleMixture, materialPortions]);

    function isChanged() {
        return (
            JSON.stringify(initialStage) !== JSON.stringify(kettleStage) ||
            JSON.stringify(initialMixture) !== JSON.stringify(kettleMixture) ||
            JSON.stringify(initialMaterialPortions) !==
                JSON.stringify(materialPortions)
        );
    }

    function setMixture(mixture) {
        // insert mixture back into array
        const data = [...stages];
        const index = mixtures.findIndex((s) => (s.id = kettleMixture.id));
        data.splice(index, 1);
        data.splice(index, 0, { ...mixture });
        dispatch(
            setBrewMixtureDetails({
                content: data,
            })
        );
    }

    function setStage(stage) {
        // insert stage back into array
        const data = [...stages];
        const index = stages.findIndex((s) => s.id === kettleStage.id);
        data.splice(index, 1);
        data.splice(index, 0, { ...stage });
        dispatch(
            setBrewStageDetails({
                content: data,
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
        mixture: kettleMixture,
        materialPortions,
        setMaterialPortions,
    };

    const stageProps = {
        title: "Kettle",
        initialStage,
        stage: kettleStage,
        setStage,
        stageLoading,
        mixture: kettleMixture,
        setMixture,
        mixtureLoading,
        materialPortionsLoading,
        stageError,
        mixtureError,
        materialPortionsError,
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
                        More <i className="fa fa-caret-down"></i>
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
                                    // TODO
                                    // want to add to transfer stage before ..
                                    dispatch(
                                        addBrewStage({
                                            parentMixtureIds: [
                                                kettleMixture.id,
                                            ],
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
