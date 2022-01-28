import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";
import {
    saveFermentStage,
    setWhirlpoolMixtureDetails,
    setWhirlpoolStageDetails,
} from "../../../../store/actions";
import BatchStage from "../common/stage";

export default function BrewWhirlpool(props) {
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
        return state.Batch.WhirlpoolStage;
    });

    const {
        data: mixture,
        initial: initialMixture,
        loading: mixtureLoading,
        error: mixtureError,
    } = useSelector((state) => {
        return state.Batch.WhirlpoolMixture;
    });

    const fermentStage = useSelector((state) => {
        return state.Batch.FermentStage.data;
    });

    useEffect(() => {
        dispatch(
            setWhirlpoolStageDetails({
                changed: isChanged(),
            })
        );
        // eslint-disable-next-line
    }, [stage, mixture]);

    function isChanged() {
        return (
            JSON.stringify(initialStage) !== JSON.stringify(stage) ||
            JSON.stringify(initialMixture) !== JSON.stringify(mixture)
        );
    }

    function setStage(stage) {
        dispatch(
            setWhirlpoolStageDetails({
                data: stage,
            })
        );
    }

    function setMixture(mixture) {
        dispatch(
            setWhirlpoolMixtureDetails({
                data: mixture,
            })
        );
    }

    const stageProps = {
        ...props,
        title: "Whirlpool",
        editable,
        setEditable: props.setEditable,
        initialStage,
        stage,
        setStage,
        stageLoading,
        mixture,
        setMixture,
        mixtureLoading,
        stageError,
        mixtureError,
        isOpen: props.isOpen,
        toggleIsOpen: () => {
            props.toggleIsOpen("whirlpool");
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
                        More <i className="fa fa-caret-down"></i>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem disabled={!!fermentStage.id}>
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
            {stage.id && <BatchStage {...stageProps}></BatchStage>}
        </React.Fragment>
    );
}
