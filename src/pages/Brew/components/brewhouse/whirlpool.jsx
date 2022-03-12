import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";
import { addBrewStage, deleteBrewStage } from "../../../../store/actions";
import BatchStage from "../common/stage";

export default function BrewWhirlpool({
    whirlpoolMixture,
    transferMixture,
    isOpen,
    toggleIsOpen,
}) {
    const [isOpenMoreDropdown, setIsOpenMoreDropdown] = useState(false);
    const dispatch = useDispatch();

    const batch = useSelector((state) => {
        return state.Batch.Batch.data;
    });

    const whirlpoolStage = useSelector((state) => {
        return (
            whirlpoolMixture &&
            state.Batch.Stages.content.find(
                (s) => s.id === whirlpoolMixture.brewStage.id
            )
        );
    });

    const transferStage = useSelector((state) => {
        return (
            transferMixture &&
            state.Batch.Stages.content.find(
                (s) => s.id === transferMixture.brewStage.id
            )
        );
    });

    const stageProps = {
        title: "Whirlpool",
        stage: whirlpoolStage,
        mixture: whirlpoolMixture,
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
                        Mixture <i className="fa fa-caret-down"></i>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem disabled={!!transferStage?.id}>
                            <span
                                className="text-dark"
                                onClick={() => {
                                    dispatch(
                                        addBrewStage({
                                            parentMixtureIds: [
                                                whirlpoolMixture.id,
                                            ],
                                            form: [
                                                {
                                                    brewId: batch.id,
                                                    taskId: 6, // transfer
                                                    statusId: 4,
                                                    startedAt:
                                                        new Date().toISOString(),
                                                },
                                            ],
                                        })
                                    );
                                }}
                            >
                                Complete Brew
                            </span>
                        </DropdownItem>
                        <DropdownItem>
                            <span
                                className="text-dark"
                                onClick={() => {
                                    dispatch(deleteBrewStage(whirlpoolStage));
                                }}
                            >
                                Delete Mixture
                            </span>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </React.Fragment>
        ),
    };

    return (
        <React.Fragment>
            {whirlpoolStage && <BatchStage {...stageProps}></BatchStage>}
        </React.Fragment>
    );
}
