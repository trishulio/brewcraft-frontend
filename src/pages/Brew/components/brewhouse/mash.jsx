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
    setBrewMixtureDetails,
    setBrewStageDetails,
    setMashMaterialPortionDetails,
    setMashMixtureDetails,
    setMashStageDetails,
} from "../../../../store/actions";
import Ingredients from "../common/ingredients";
import BatchStage from "../common/stage";

export default function BrewMash({
    mashMixture,
    mashStage,
    kettleMixture,
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
        return state.Batch.Mixtures.initial.filter(
            (m) => m.id === mashMixture.id
        );
    });

    const stages = useSelector((state) => {
        return state.Batch.Stages.content;
    });

    const initialStage = useSelector((state) => {
        return (
            mashStage &&
            state.Batch.Stages.initial.find((s) => s.id === mashStage.id)
        );
    });

    const { loading: mixtureLoading, error: mixtureError } = useSelector(
        (state) => {
            return state.Batch.MashMixture;
        }
    );

    const { loading: stageLoading, stageError } = useSelector((state) => {
        return state.Batch.MashStages;
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
    }, [mashStage, mashMixture, materialPortions]);

    function isChanged() {
        return (
            JSON.stringify(initialStage) !== JSON.stringify(mashStage) ||
            JSON.stringify(initialMixture) !== JSON.stringify(mashMixture) ||
            JSON.stringify(initialMaterialPortions) !==
                JSON.stringify(materialPortions)
        );
    }

    function setMixture(mixture) {
        // insert mixture back into array
        const data = [...stages];
        const index = mixtures.findIndex((s) => (s.id = mashMixture.id));
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
        const index = stages.findIndex((s) => (s.id = mashStage.id));
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
            setMashMaterialPortionDetails({
                content: materialPortions,
            })
        );
    }

    const ingredientsProps = {
        mixture: mashMixture,
        materialPortions,
        setMaterialPortions,
    };

    const stageProps = {
        title: "Mash Lauter",
        initialStage,
        stage: mashStage,
        setStage,
        stageLoading,
        mixture: mashMixture,
        setMixture,
        mixtureLoading,
        materialPortionsLoading,
        stageError,
        mixtureError,
        materialPortionsError,
        isOpen,
        toggleIsOpen: () => {
            toggleIsOpen("mash");
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
                        <DropdownItem disabled={!!kettleMixture?.id}>
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
            {mashStage?.id && (
                <BatchStage {...stageProps}>
                    <div className="mb-3">
                        <Ingredients {...ingredientsProps} />
                    </div>
                </BatchStage>
            )}
        </React.Fragment>
    );
}
