import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";
import { addBatchStage, deleteBrewStage } from "../../../../store/actions";
import Ingredients from "../common/ingredients";
import BatchStage from "../common/stage";
import Recordings from "../common/mixture-recordings";

export default function BrewMash({
    mashMixture,
    kettleMixture,
    isOpen,
    toggleIsOpen,
}) {
    const [isOpenMoreDropdown, setIsOpenMoreDropdown] = useState(false);
    const dispatch = useDispatch();

    const mashStage = useSelector((state) => {
        return state.Batch.Stages.content.find(
            (s) => s.id === mashMixture.brewStage.id
        );
    });

    const measures = useSelector((state) => {
        return state.Measures.data.filter((measure) =>
            [3, 4].includes(measure.id)
        );
    });

    const ingredientsProps = {
        mixture: mashMixture,
    };

    const recordingsProps = {
        measures,
        mixture: mashMixture,
    };

    const stageProps = {
        title: "Mash Lauter",
        stage: mashStage,
        mixture: mashMixture,
        isOpen,
        toggleIsOpen: () => {
            toggleIsOpen("mash");
        },
        toolbar: (
            <React.Fragment>
                {!kettleMixture?.id && (
                    <Dropdown
                        isOpen={isOpenMoreDropdown}
                        toggle={() =>
                            setIsOpenMoreDropdown(!isOpenMoreDropdown)
                        }
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
                            <DropdownItem disabled={!!kettleMixture?.id}>
                                <span
                                    className="text-dark"
                                    onClick={() => {
                                        dispatch(
                                            addBatchStage({
                                                parentMixtureIds: [
                                                    mashMixture.id,
                                                ],
                                                taskId: 2,
                                                statusId: 4,
                                            })
                                        );
                                    }}
                                >
                                    Move to Kettle
                                </span>
                            </DropdownItem>
                            {!kettleMixture?.id && (
                                <DropdownItem disabled={!!kettleMixture?.id}>
                                    <span
                                        className="text-dark"
                                        onClick={() => {
                                            dispatch(
                                                deleteBrewStage(mashStage)
                                            );
                                        }}
                                    >
                                        Delete
                                    </span>
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                )}
            </React.Fragment>
        ),
    };

    return (
        <React.Fragment>
            {mashStage && (
                <BatchStage {...stageProps}>
                    <div className="mb-3">
                        <Ingredients {...ingredientsProps} />
                    </div>
                    <div className="mb-3">
                        <Recordings {...recordingsProps} />
                    </div>
                </BatchStage>
            )}
        </React.Fragment>
    );
}
