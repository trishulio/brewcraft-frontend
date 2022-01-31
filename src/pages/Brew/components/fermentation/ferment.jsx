import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";
import { addBrewStage } from "../../../../store/actions";
import Ingredients from "../common/ingredients";
import Recordings from "../common/mixture-recordings";
import FinishedGoods from "../common/finished-goods";
import BatchStage from "../common/stage";

export default function BatchFerment({ fermentMixture }) {
    const [isOpenMoreDropdown, setIsOpenMoreDropdown] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const dispatch = useDispatch();

    const batch = useSelector((state) => {
        return state.Batch.Batch.data;
    });

    const fermentStage = useSelector((state) => {
        return state.Batch.Stages.content.find(
            (s) => s.id === fermentMixture.brewStage.id
        );
    });

    const materialPortions = useSelector((state) => {
        return state.Batch.MaterialPortions.content.filter(
            (mp) => mp.mixture.id === fermentMixture.id
        );
    });

    const { content: mixtureRecordings } = useSelector((state) => {
        return state.Batch.FermentMixtureRecordings;
    });

    const { content: finishedGoods } = useSelector((state) => {
        return state.Batch.FermentFinishedGoods;
    });

    const ingredientsProps = {
        mixture: fermentMixture,
        materialPortions,
    };

    const recordingsProps = {
        mixture: fermentMixture,
        mixtureRecordings,
    };

    const finishedGoodsProps = {
        mixture: fermentMixture,
        finishedGoods,
    };

    const stageProps = {
        title: "Ferment",
        stage: fermentStage,
        mixture: fermentMixture,
        isOpen,
        toggleIsOpen: () => setIsOpen(!isOpen),
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
                        Mixture <i className="fa fa-caret-down"></i>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>
                            <span
                                className="text-dark"
                                onClick={() => {
                                    dispatch(
                                        addBrewStage({
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
            {fermentStage?.id && (
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
