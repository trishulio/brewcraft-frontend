import React, { useState } from "react";
import { useSelector } from "react-redux";
import Ferment from "./ferment";
import Condition from "./condition";
import BriteTank from "./brite-tank";

export default function Cellar({ fermentMixture }) {
    const [isFermentOpen, setIsFermentOpen] = useState(false);
    const [isConditionOpen, setIsConditionOpen] = useState(false);
    const [isBriteTankOpen, setIsBriteTankOpen] = useState(false);

    const transferMixture = useSelector((state) => {
        return state.Batch.BrewMixtures.content.find((s) =>
            fermentMixture.parentMixtureIds.includes(s.id)
        );
    });

    const transferStage = useSelector((state) => {
        return state.Batch.Stages.content.find(
            (s) => s.id === transferMixture.brewStage.id
        );
    });

    const fermentStage = useSelector((state) => {
        return state.Batch.Stages.content.find(
            (s) => s.id === fermentMixture.brewStage.id
        );
    });

    const conditionMixture = useSelector((state) => {
        return (
            fermentMixture &&
            state.Batch.BrewMixtures.content.find(
                (m) =>
                    m.parentMixtureIds &&
                    m.parentMixtureIds.includes(fermentMixture.id) &&
                    m.brewStage.task.id === 5
            )
        );
    });

    const conditionStage = useSelector((state) => {
        return (
            conditionMixture &&
            state.Batch.Stages.content.find(
                (s) => s.id === conditionMixture.brewStage.id
            )
        );
    });

    const briteTankMixture = useSelector((state) => {
        const mixture =
            fermentMixture &&
            state.Batch.BrewMixtures.content.find(
                (m) =>
                    m.parentMixtureIds &&
                    m.parentMixtureIds.includes(fermentMixture.id) &&
                    m.brewStage.task.id === 8
            );
        return (
            mixture ||
            (conditionMixture &&
                state.Batch.BrewMixtures.content.find(
                    (m) =>
                        m.parentMixtureIds &&
                        m.parentMixtureIds.includes(conditionMixture.id) &&
                        m.brewStage.task.id === 8
                ))
        );
    });

    const briteTankStage = useSelector((state) => {
        return (
            briteTankMixture &&
            state.Batch.Stages.content.find(
                (s) => s.id === briteTankMixture.brewStage.id
            )
        );
    });

    function toggleIsOpen(index, show) {
        switch (index) {
            case "ferment":
                setIsFermentOpen(show ? true : !isFermentOpen);
                setIsConditionOpen(false);
                setIsBriteTankOpen(false);
                break;
            case "condition":
                setIsFermentOpen(false);
                setIsConditionOpen(show ? true : !isConditionOpen);
                setIsBriteTankOpen(false);
                break;
            case "britetank":
                setIsFermentOpen(false);
                setIsConditionOpen(false);
                setIsBriteTankOpen(show ? true : !isBriteTankOpen);
                break;
            default:
                break;
        }
    }

    const props = {
        transferMixture,
        transferStage,
        fermentMixture,
        fermentStage,
        conditionMixture,
        conditionStage,
        briteTankMixture,
        briteTankStage,
        toggleIsOpen,
    };

    return (
        <React.Fragment>
            {fermentStage && <Ferment isOpen={isFermentOpen} {...props} />}
            {conditionStage && (
                <Condition isOpen={isConditionOpen} {...props} />
            )}
            {briteTankStage && (
                <BriteTank isOpen={isBriteTankOpen} {...props} />
            )}
        </React.Fragment>
    );
}
