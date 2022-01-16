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
    setFermentMaterialPortionDetails,
    setFermentMixtureDetails,
    setFermentMixtureRecords,
    setFermentStageDetails,
    setFermentFinishedGoodsDetails,
    saveFermentStage,
} from "../../../../store/actions";
import Ingredients from "../common/ingredients";
import Recordings from "../common/mixture-recordings";
import FinishedGoods from "../common/finished-goods";
import BatchStage from "../common/stage";

export default function BatchFerment(props) {
    const [isOpenMoreDropdown, setIsOpenMoreDropdown] = useState(false);
    const dispatch = useDispatch();

    const { editable } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const {
        data: stage,
        initial: initialStage,
        loading: stageLoading,
        error: stageError,
    } = useSelector((state) => {
        return state.Batch.FermentStage;
    });

    const batch = useSelector((state) => {
        return state.Batch.Batch.data;
    });

    const {
        data: mixture,
        initial: initialMixture,
        loading: mixtureLoading,
        error: mixtureError,
    } = useSelector((state) => {
        return state.Batch.FermentMixture;
    });

    const {
        content: materialPortions,
        initial: initialMaterialPortions,
        loading: materialPortionsLoading,
        error: materialPortionsError,
    } = useSelector((state) => {
        return state.Batch.FermentMaterialPortion;
    });

    const {
        content: mixtureRecordings,
        initial: initialMixtureRecordings,
        loading: mixtureRecordingsLoading,
        error: mixtureRecordingsError,
    } = useSelector((state) => {
        return state.Batch.FermentMixtureRecordings;
    });

    const {
        content: finishedGoods,
        initial: initialFinishedGoods,
        loading: finishedGoodsLoading,
        error: finishedGoodsError,
    } = useSelector((state) => {
        return state.Batch.FermentFinishedGoods;
    });

    useEffect(() => {
        dispatch(
            setFermentStageDetails({
                changed: isChanged(),
            })
        );
        // eslint-disable-next-line
    }, [stage, mixture, materialPortions, mixtureRecordings, finishedGoods]);

    function isChanged() {
        return (
            JSON.stringify(initialStage) !== JSON.stringify(stage) ||
            JSON.stringify(initialMixture) !== JSON.stringify(mixture) ||
            JSON.stringify(initialMaterialPortions) !==
                JSON.stringify(materialPortions) ||
            JSON.stringify(initialMixtureRecordings) !==
                JSON.stringify(mixtureRecordings) ||
            JSON.stringify(initialFinishedGoods) !==
                JSON.stringify(finishedGoods)
        );
    }

    function setStage(stage) {
        dispatch(
            setFermentStageDetails({
                data: {
                    ...stage,
                },
            })
        );
    }

    function setMixture(mixture) {
        dispatch(
            setFermentMixtureDetails({
                data: {
                    ...mixture,
                },
            })
        );
    }

    function setMaterialPortions(materialPortions) {
        dispatch(
            setFermentMaterialPortionDetails({
                content: [...materialPortions],
            })
        );
    }

    function setMixtureRecordings(mixtureRecordings) {
        dispatch(
            setFermentMixtureRecords({
                content: [...mixtureRecordings],
            })
        );
    }

    function setFinishedGoods(finishedGoods) {
        dispatch(
            setFermentFinishedGoodsDetails({
                content: [...finishedGoods],
            })
        );
    }

    const ingredientsProps = {
        mixture,
        editable,
        materialPortions,
        setMaterialPortions,
    };

    const recordingsProps = {
        mixture,
        editable,
        mixtureRecordings,
        setMixtureRecordings,
    };

    const finishedGoodsProps = {
        mixture,
        editable,
        finishedGoods,
        setFinishedGoods,
    };

    const stageProps = {
        title: "Ferment",
        initialStage,
        stage,
        setStage,
        stageLoading,
        mixture,
        setMixture,
        mixtureLoading,
        materialPortionsLoading,
        mixtureRecordingsLoading,
        finishedGoodsLoading,
        stageError,
        mixtureError,
        materialPortionsError,
        mixtureRecordingsError,
        finishedGoodsError,
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
                <Button
                    className="mr-2"
                    type="button"
                    color="secondary"
                    size="sm"
                    outline={true}
                    onClick={() => {}}
                >
                    Records
                </Button>
                <Button
                    className="mr-2"
                    type="button"
                    color="secondary"
                    size="sm"
                    outline={true}
                    onClick={() => {}}
                >
                    Packaged Goods
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
                        <DropdownItem>
                            <span
                                className="text-dark"
                                onClick={() => {
                                    dispatch(
                                        saveFermentStage({
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
                                Move to Conditioner
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
