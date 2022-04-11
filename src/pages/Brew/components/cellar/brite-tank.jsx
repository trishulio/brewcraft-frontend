import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";
import { deleteBrewStage } from "../../../../store/actions";
import Ingredients from "../common/ingredients";
import Recordings from "../common/mixture-recordings";
import FinishedGoods from "../common/finished-goods";
import BatchStage from "../common/stage";

export default function BatchBriteTank({
    briteTankMixture,
    isOpen,
    toggleIsOpen,
}) {
    const [isOpenMoreDropdown, setIsOpenMoreDropdown] = useState(false);
    const dispatch = useDispatch();

    const briteTankStage = useSelector((state) => {
        return state.Batch.Stages.content.find(
            (s) => s.id === briteTankMixture.brewStage.id
        );
    });

    const measures = useSelector((state) => {
        return state.Measures.data.filter((measure) => {
            return [3, 4, 5].includes(measure.id);
        });
    });

    const ingredientsProps = {
        mixture: briteTankMixture,
    };

    const recordingsProps = {
        measures,
        mixture: briteTankMixture,
    };

    const finishedGoodsProps = {
        mixture: briteTankMixture,
    };

    const stageProps = {
        title: "Brite Tank",
        stage: briteTankStage,
        mixture: briteTankMixture,
        isOpen,
        toggleIsOpen: () => {
            toggleIsOpen("britetank");
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
                                    dispatch(deleteBrewStage(briteTankStage));
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
            {briteTankStage?.id && (
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
