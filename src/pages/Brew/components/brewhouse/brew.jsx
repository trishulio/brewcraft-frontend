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

    const kettleMixture = useSelector((state) => {
        return state.Batch.BrewMixtures.content.find(
            (m) =>
                m.parentMixtureIds &&
                m.parentMixtureIds.includes(mashMixture.id)
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

    useEffect(() => {
        // Open the last stage that exists.
        if (transferMixture) {
            toggleIsOpen("transfer", true);
        } else if (whirlpoolMixture) {
            toggleIsOpen("whirlpool", true);
        } else if (kettleMixture) {
            toggleIsOpen("kettle", true);
        } else {
            toggleIsOpen("mash", true);
        }
        // eslint-disable-next-line
    }, []);

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
        kettleMixture,
        whirlpoolMixture,
        transferMixture,
        toggleIsOpen,
    };

    return (
        <React.Fragment>
            {mashMixture && <Mash isOpen={isMashOpen} {...props} />}
            {kettleMixture && <Kettle isOpen={isKettleOpen} {...props} />}
            {whirlpoolMixture && (
                <Whirlpool isOpen={isWhirlpoolOpen} {...props} />
            )}
            {transferMixture && <Transfer isOpen={isTransferOpen} {...props} />}
        </React.Fragment>
    );
}
