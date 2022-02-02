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
    setBrewMixtureDetails,
    setBrewStageDetails,
    setWhirlpoolMixtureDetails,
    setWhirlpoolStageDetails,
} from "../../../../store/actions";
import BatchStage from "../common/stage";

export default function BrewWhirlpool({
    kettleMixture,
    kettleStage,
    whirlpoolMixture,
    whirlpoolStage,
    isOpen,
    toggleIsOpen,
}) {
    const [isOpenMoreDropdown, setIsOpenMoreDropdown] = useState(false);
    const dispatch = useDispatch();

    const { data: batch } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const { loading: stageLoading, error: stageError } = useSelector(
        (state) => {
            return state.Batch.WhirlpoolStage;
        }
    );

    const mixtures = useSelector((state) => {
        return state.Batch.Mixtures.content;
    });

    const initialMixture = useSelector((state) => {
        return (
            whirlpoolMixture &&
            state.Batch.Mixtures.initial.filter(
                (m) => m.id === whirlpoolMixture.id
            )
        );
    });

    const { loading: mixtureLoading, error: mixtureError } = useSelector(
        (state) => {
            return state.Batch.WhirlpoolMixture;
        }
    );

    const stages = useSelector((state) => {
        return state.Batch.Stages.content;
    });

    const initialStage = useSelector((state) => {
        return (
            whirlpoolStage &&
            state.Batch.Stages.initial.find((s) => s.id === whirlpoolStage.id)
        );
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
    }, [whirlpoolStage, whirlpoolMixture]);

    function isChanged() {
        return (
            JSON.stringify(initialStage) !== JSON.stringify(whirlpoolStage) ||
            JSON.stringify(initialMixture) !== JSON.stringify(whirlpoolMixture)
        );
    }

    function setMixture(mixture) {
        // insert mixture back into array
        const data = [...stages];
        const index = mixtures.findIndex((s) => (s.id = whirlpoolMixture.id));
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
        const index = stages.findIndex((s) => s.id === whirlpoolStage.id);
        data.splice(index, 1);
        data.splice(index, 0, { ...stage });
        dispatch(
            setBrewStageDetails({
                content: data,
            })
        );
    }

    const stageProps = {
        title: "Whirlpool",
        initialStage,
        stage: whirlpoolStage,
        setStage,
        stageLoading,
        mixture: whirlpoolMixture,
        setMixture,
        mixtureLoading,
        stageError,
        mixtureError,
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
            {whirlpoolStage?.id && <BatchStage {...stageProps}></BatchStage>}
        </React.Fragment>
    );
}
