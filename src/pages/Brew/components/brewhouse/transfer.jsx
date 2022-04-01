import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";
import { addBatchStage } from "../../../../store/actions";
import BatchStage from "../common/stage";

export default function BrewTransfer({
    isOpen,
    toggleIsOpen,
    transferMixture,
}) {
    // const [invalidOg, setInvalidOg] = useState(false);
    // const [invalidQuantity, setInvalidQuantity] = useState(false);
    const [isOpenMoreDropdown, setIsOpenMoreDropdown] = useState(false);
    const dispatch = useDispatch();

    const transferStage = useSelector((state) => {
        return (
            transferMixture &&
            state.Batch.Stages.content.find(
                (s) => s.id === transferMixture.brewStage.id
            )
        );
    });

    const stageProps = {
        title: "Transfer",
        stage: transferStage,
        mixture: transferMixture,
        isOpen,
        toggleIsOpen: () => {
            toggleIsOpen("transfer");
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
                        <DropdownItem>
                            <span
                                className="text-dark"
                                onClick={() => {
                                    dispatch(
                                        addBatchStage({
                                            parentMixtureIds: [
                                                transferMixture.id,
                                            ],
                                            taskId: 7, // ferment
                                            statusId: 4,
                                        })
                                    );
                                }}
                            >
                                Move to Cellar
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
            {transferStage && <BatchStage {...stageProps} />}
        </React.Fragment>
    );
}
