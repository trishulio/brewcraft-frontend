import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Mash from "./mash";
import Kettle from "./kettle";
import Whirlpool from "./whirlpool";
import Transfer from "./transfer";

export default function Brew({ mashMixture }) {
    const [isMashOpen, setIsMashOpen] = useState(true);
    const [isKettleOpen, setIsKettleOpen] = useState(false);
    const [isWhirlpoolOpen, setIsWhirlpoolOpen] = useState(false);
    const [isTransferOpen, setIsTransferOpen] = useState(false);

    const mashStage = useSelector((state) => {
        return state.Batch.Stages.content.find(
            (s) => s.id === mashMixture.brewStage.id
        );
    });

    const mashMaterialPortions = useSelector((state) => {
        return (
            mashMixture &&
            state.Batch.MaterialPortions.content.filter(
                (mp) => mp.mixture.id === mashMixture.id
            )
        );
    });

    const kettleMixture = useSelector((state) => {
        return state.Batch.BrewMixtures.content.find(
            (m) =>
                m.parentMixtureIds &&
                m.parentMixtureIds.includes(mashMixture.id)
        );
    });

    const kettleStage = useSelector((state) => {
        return (
            kettleMixture &&
            state.Batch.Stages.content.find(
                (s) => s.id === kettleMixture.brewStage.id
            )
        );
    });

    const kettleMaterialPortions = useSelector((state) => {
        return (
            kettleMixture &&
            state.Batch.MaterialPortions.content.filter(
                (mp) => mp.mixture.id === kettleMixture.id
            )
        );
    });

    const whirlpoolMixture = useSelector((state) => {
        return (
            kettleMixture &&
            state.Batch.BrewMixtures.content.find(
                (m) =>
                    m.parentMixtureIds &&
                    m.parentMixtureIds.includes(kettleMixture.id) &&
                    m.brewStage.task.id === 3
            )
        );
    });

    const whirlpoolStage = useSelector((state) => {
        return (
            whirlpoolMixture &&
            state.Batch.Stages.content.find(
                (s) => s.id === whirlpoolMixture.brewStage.id
            )
        );
    });

    const transferMixture = useSelector((state) => {
        if (kettleMixture && !whirlpoolMixture?.id) {
            return state.Batch.BrewMixtures.content.find(
                (m) =>
                    m.parentMixtureIds &&
                    m.parentMixtureIds.includes(kettleMixture.id)
            );
        } else if (whirlpoolMixture) {
            return state.Batch.BrewMixtures.content.find(
                (m) =>
                    m.parentMixtureIds &&
                    m.parentMixtureIds.includes(whirlpoolMixture.id)
            );
        }
    });

    const transferStage = useSelector((state) => {
        return (
            transferMixture &&
            state.Batch.Stages.content.find(
                (s) => s.id === transferMixture.brewStage.id
            )
        );
    });

    useEffect(() => {
        // Open the last stage that exists.
        if (transferStage) {
            toggleIsOpen("transfer", true);
        } else if (whirlpoolStage) {
            toggleIsOpen("whirlpool", true);
        } else if (kettleStage) {
            toggleIsOpen("kettle", true);
        } else {
            toggleIsOpen("mash", true);
        }
        // eslint-disable-next-line
    }, [mashStage, kettleStage, whirlpoolStage, transferStage]);

    function toggleIsOpen(index, show) {
        switch (index) {
            case "mash":
                setIsMashOpen(show ? true : !isMashOpen);
                setIsKettleOpen(false);
                setIsWhirlpoolOpen(false);
                setIsTransferOpen(false);
                break;
            case "kettle":
                setIsMashOpen(false);
                setIsKettleOpen(show ? true : !isKettleOpen);
                setIsWhirlpoolOpen(false);
                setIsTransferOpen(false);
                break;
            case "whirlpool":
                setIsMashOpen(false);
                setIsKettleOpen(false);
                setIsWhirlpoolOpen(show ? true : !isWhirlpoolOpen);
                setIsTransferOpen(false);
                break;
            case "transfer":
                setIsMashOpen(false);
                setIsKettleOpen(false);
                setIsWhirlpoolOpen(false);
                setIsTransferOpen(show ? true : !isTransferOpen);
                break;
            default:
                break;
        }
    }

    const props = {
        mashMixture,
        mashStage,
        mashMaterialPortions,
        kettleMixture,
        kettleStage,
        kettleMaterialPortions,
        whirlpoolMixture,
        whirlpoolStage,
        transferMixture,
        transferStage,
        toggleIsOpen,
    };

    return (
        <React.Fragment>
            <Mash isOpen={isMashOpen} {...props} />
            <Kettle isOpen={isKettleOpen} {...props} />
            <Whirlpool isOpen={isWhirlpoolOpen} {...props} />
            {transferMixture && <Transfer isOpen={isTransferOpen} {...props} />}
        </React.Fragment>
    );
}
